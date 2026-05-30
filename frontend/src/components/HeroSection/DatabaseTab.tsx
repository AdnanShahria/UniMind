import { motion, AnimatePresence } from 'framer-motion';
import { Server, HardDrive, Sparkles, Brain, Activity } from 'lucide-react';

export const DatabaseTab = ({ isSynthesized, setIsSynthesized }: { isSynthesized: boolean, setIsSynthesized: (v: boolean) => void }) => {
  return (
    <motion.div
      key="database-tab"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-poppins">Live Schema Explorer</span>
        </div>
        
        <button 
          onClick={() => setIsSynthesized(!isSynthesized)}
          className="relative group overflow-hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 via-violet-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer active:scale-95 z-20"
        >
          <Sparkles className={`w-3.5 h-3.5 text-cyan-200 transition-transform duration-700 ${isSynthesized ? 'rotate-180 text-teal-300 font-bold' : 'animate-pulse'}`} />
          <span>{isSynthesized ? 'Reset Registry' : 'Synthesize AI'}</span>
          <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></span>
        </button>
      </div>
      
      <div className="space-y-2 mt-2 relative">
        <div className={`w-full h-11 rounded-xl bg-[#0F1423] border border-white/5 flex items-center px-4 gap-4 transition-all duration-500 ${isSynthesized ? 'border-cyan-500/30 bg-cyan-950/10 shadow-[0_0_15px_rgba(6,182,212,0.05)]' : ''}`}>
           <div className={`w-7 h-7 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-colors duration-500 ${isSynthesized ? 'bg-cyan-500/30 text-cyan-300' : ''}`}><Server className="w-3.5 h-3.5" /></div>
           <div className="flex-1 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-200">Knowledge Graph DB</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 1.2M Nodes
              </span>
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
              <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 via-violet-500 to-purple-500/50 relative">
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
           <div className={`w-7 h-7 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 transition-colors duration-500 ${isSynthesized ? 'bg-purple-500/30 text-purple-300' : ''}`}><HardDrive className="w-3.5 h-3.5" /></div>
           <div className="flex-1 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-200">Vector Space Index</span>
              <span className="text-[10px] text-purple-400 flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> 450K Dim
              </span>
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
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-violet-500 to-cyan-500/50 relative">
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
              key="schema-synthesis"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-violet-950/30 to-purple-950/40 border border-cyan-500/40 shadow-[0_8px_24px_rgba(6,182,212,0.2)] flex flex-col gap-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                    <Brain className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-bold tracking-widest text-cyan-400 uppercase font-poppins">UniMind AI • Vector Bridge</h4>
                    <h3 className="text-[11px] font-semibold text-slate-100 font-poppins">Dimensional Vector Alignment</h3>
                  </div>
                </div>
                <span className="text-[8px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-medium font-poppins">99.1% Align</span>
              </div>
              
              <p className="text-[10px] text-slate-300 leading-relaxed font-poppins font-light">
                Aligned structural nodes inside <span className="text-cyan-300 font-normal">academic_knowledge_graph</span> to dense embeddings in <span className="text-purple-300 font-normal">dense_vector_space_128d</span>.
              </p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[8px] text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-poppins">#VectorDB</span>
                <span className="text-[8px] text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-poppins">#SemanticSearch</span>
                <span className="text-[8px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5 font-poppins">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-300" /> +4,200 Bridges
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="normal-db-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="w-full h-11 rounded-xl bg-[#0F1423] border border-white/5 flex items-center px-4 gap-4 hover:opacity-100 transition-opacity cursor-pointer animate-fade-in"
            >
               <div className="w-7 h-7 rounded bg-slate-700/50 flex items-center justify-center text-slate-400"><Activity className="w-3.5 h-3.5" /></div>
               <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400">Cognitive Cache Index</span>
                  <span className="text-[10px] text-slate-600">98.2K entries</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
