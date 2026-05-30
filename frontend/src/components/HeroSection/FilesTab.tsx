import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Database, Sparkles, Brain, Users } from 'lucide-react';

export const FilesTab = ({ isSynthesized, setIsSynthesized }: { isSynthesized: boolean, setIsSynthesized: (v: boolean) => void }) => {
  return (
    <motion.div
      key="files-tab"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <div className="w-24 h-4 rounded bg-slate-800/50"></div>
        <button 
          onClick={() => setIsSynthesized(!isSynthesized)}
          className="relative group overflow-hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] cursor-pointer active:scale-95 z-20"
        >
          <Sparkles className={`w-3.5 h-3.5 text-violet-200 transition-transform duration-700 ${isSynthesized ? 'rotate-180 text-teal-300 font-bold' : 'animate-pulse'}`} />
          <span>{isSynthesized ? 'Reset Workspace' : 'Synthesize AI'}</span>
          <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></span>
        </button>
      </div>
      
      <div className="space-y-2 mt-2 relative">
        <div className={`w-full h-11 rounded-xl bg-[#0F1423] border border-white/5 flex items-center px-4 gap-4 transition-all duration-500 ${isSynthesized ? 'border-blue-500/30 bg-blue-950/10 shadow-[0_0_15px_rgba(59,130,246,0.05)]' : ''}`}>
           <div className={`w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 transition-colors duration-500 ${isSynthesized ? 'bg-blue-500/30 text-blue-300' : ''}`}><FileText className="w-3.5 h-3.5" /></div>
           <div className="flex-1 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-200">Quantum Computing Research</span>
              <span className="text-[10px] text-slate-500">Just now</span>
           </div>
        </div>

        <AnimatePresence>
          {isSynthesized && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 16, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex justify-center items-center overflow-hidden my-0.5"
            >
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500/50 via-violet-500 to-purple-500/50 relative">
                <motion.div 
                  animate={{ y: [0, 16], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-full h-11 rounded-xl bg-[#0F1423] border border-white/5 flex items-center px-4 gap-4 transition-all duration-500 ${isSynthesized ? 'border-purple-500/30 bg-purple-950/10 shadow-[0_0_15px_rgba(139,92,246,0.05)]' : ''}`}>
           <div className={`w-7 h-7 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 transition-colors duration-500 ${isSynthesized ? 'bg-purple-500/30 text-purple-300' : ''}`}><Database className="w-3.5 h-3.5" /></div>
           <div className="flex-1 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-200">Neural Network Datasets</span>
              <span className="text-[10px] text-slate-500">2h ago</span>
            </div>
        </div>

        <AnimatePresence>
          {isSynthesized && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 16, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex justify-center items-center overflow-hidden my-0.5"
            >
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-violet-500 to-indigo-500/50 relative">
                <motion.div 
                  animate={{ y: [0, 16], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isSynthesized ? (
            <motion.div
              key="synthesis-card"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative p-3.5 rounded-xl bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-slate-950/50 border border-violet-500/40 shadow-[0_8px_24px_rgba(139,92,246,0.15)] flex flex-col gap-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                    <Brain className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-bold tracking-widest text-violet-400 uppercase font-poppins">UniMind AI • Synthesis</h4>
                    <h3 className="text-[11px] font-semibold text-slate-100 font-poppins">Quantum Neural Networks</h3>
                  </div>
                </div>
                <span className="text-[8px] bg-violet-500/20 text-violet-300 border border-violet-500/30 px-1.5 py-0.5 rounded-full font-medium font-poppins">98% Match</span>
              </div>
              
              <p className="text-[10px] text-slate-300 leading-relaxed font-poppins font-light">
                Discovered structural similarities between <span className="text-blue-300 font-normal">quantum state vectors</span> and <span className="text-purple-300 font-normal">neural network attention weights</span>.
              </p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[8px] text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-poppins">#Physics</span>
                <span className="text-[8px] text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-poppins">#MachineLearning</span>
                <span className="text-[8px] text-violet-300 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5 font-poppins">
                  <Sparkles className="w-2.5 h-2.5 text-violet-300" /> New Connection
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="normal-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="w-full h-11 rounded-xl bg-[#0F1423] border border-white/5 flex items-center px-4 gap-4 hover:opacity-100 transition-opacity cursor-pointer animate-fade-in"
            >
               <div className="w-7 h-7 rounded bg-slate-700/50 flex items-center justify-center text-slate-400"><Users className="w-3.5 h-3.5" /></div>
               <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400">Study Group Alpha</span>
                  <span className="text-[10px] text-slate-600">Yesterday</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
