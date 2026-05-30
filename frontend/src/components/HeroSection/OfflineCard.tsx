import { motion } from 'framer-motion';
import { Activity, Sparkles } from 'lucide-react';

export const OfflineCard = ({ setIsClosed }: { setIsClosed: (v: boolean) => void }) => {
  return (
    <motion.div
      key="offline-card"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full max-w-[450px] min-h-[300px] rounded-2xl bg-[#0B0F19]/95 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.15)] overflow-hidden backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-[10%] w-[50%] h-[50%] rounded-full bg-red-500/10 blur-[60px] pointer-events-none" />
      
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-6 relative group cursor-pointer" onClick={() => setIsClosed(false)}>
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md animate-pulse" />
        <Activity className="w-7 h-7 text-red-500 relative animate-pulse" />
      </div>

      <h3 className="text-lg font-bold font-poppins text-red-400 tracking-wider mb-2 uppercase">System Standby / Offline</h3>
      <p className="text-xs text-slate-400 max-w-xs mb-6 font-poppins leading-relaxed">
        The active workspace session has been terminated. Core processes are in sleep mode.
      </p>

      <button 
        onClick={() => setIsClosed(false)}
        className="group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-violet-600 hover:from-red-500 hover:to-violet-500 text-white text-xs font-semibold rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.45)] transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Restore Workspace
      </button>
    </motion.div>
  );
};
