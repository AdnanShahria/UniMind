
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoadingSuccessStatesProps {
  status: 'idle' | 'loading' | 'success';
  loadingStep: number;
  loadingSteps: string[];
  dbUser: any;
  onEnterWorkspace?: () => void;
  onBackToHome: () => void;
}

export const LoadingSuccessStates = ({
  status,
  loadingStep,
  loadingSteps,
  dbUser,
  onEnterWorkspace,
  onBackToHome
}: LoadingSuccessStatesProps) => {
  return (
    <AnimatePresence mode="wait">
      {/* DYNAMIC PROGRESS / LOADING STATE */}
      {status === 'loading' && (
        <motion.div
          key="loading-state"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center py-10"
        >
          {/* Immersive circular loading animation */}
          <div className="w-20 h-20 rounded-full border border-white/5 bg-[#050810]/50 relative flex items-center justify-center mb-8">
            {/* Glowing spinning indicator */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary-glow animate-spin" />
            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-secondary-glow animate-spin-reverse" />
            <Brain className="w-8 h-8 text-primary-glow animate-pulse" />
          </div>

          <div className="h-14 overflow-hidden relative w-full max-w-sm mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base sm:text-lg font-semibold text-slate-100 font-poppins"
              >
                {loadingSteps[loadingStep]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar percentage indicator */}
          <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            />
          </div>
          
          <p className="text-[10px] text-slate-500 font-poppins font-light mt-3 tracking-wider uppercase">
            Secure Academic Encryption Active
          </p>
        </motion.div>
      )}

      {/* REGISTER SUCCESS / WORKSPACE CONGRATULATIONS FLOW */}
      {status === 'success' && (
        <motion.div
          key="success-state"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="w-full flex flex-col items-center justify-center text-center py-4"
        >
          {/* Glowing Success Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 relative">
            <div className="absolute -inset-1 rounded-2xl bg-emerald-500/10 blur-md animate-pulse pointer-events-none" />
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white tracking-tight leading-tight">
            Academic Node Authorized!
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-poppins font-light max-w-sm mt-2 leading-relaxed">
            Congratulations <span className="text-white font-medium">{dbUser?.name || 'Scholar'}</span>, your profile at <span className="text-primary-glow font-medium">{dbUser?.institution || 'UniMind Cloud'}</span> is now fully provisioned.
          </p>

          {/* Simulated Workspace Specifications Card */}
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-5 mt-6 mb-8 text-left relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent blur-xl pointer-events-none" />
            
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-poppins border-b border-white/5 pb-2 mb-3 flex items-center justify-between">
              <span>Provisioning Record</span>
              <span className="text-emerald-400 lowercase">online</span>
            </h4>

            <div className="space-y-2.5 font-poppins text-xs font-light text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Email:</span>
                <span className="font-medium text-slate-200 truncate max-w-[180px]">{dbUser?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Major:</span>
                <span className="font-medium text-slate-200 truncate max-w-[180px]">{dbUser?.major || 'Deep Work'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Role:</span>
                <span className="font-medium text-slate-200 truncate max-w-[180px]">{dbUser?.role || 'Researcher'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session / Batch:</span>
                <span className="font-medium text-slate-200 truncate max-w-[180px]">{dbUser?.session || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
            <button
              onClick={onEnterWorkspace || onBackToHome}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-primary hover:from-emerald-500 hover:to-primary-glow text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
