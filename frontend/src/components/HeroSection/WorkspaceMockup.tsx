import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layout, Database } from 'lucide-react';
import { FilesTab } from './FilesTab';
import { DatabaseTab } from './DatabaseTab';
import { OfflineCard } from './OfflineCard';

export const WorkspaceMockup = () => {
  const [isSynthesized, setIsSynthesized] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'database'>('files');
  const [isClosed, setIsClosed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="relative lg:h-[650px] flex justify-center items-center w-full overflow-hidden lg:overflow-visible lg:[perspective:1000px]"
    >
      <AnimatePresence mode="wait">
        {!isClosed ? (
          <motion.div
            key="workspace-dashboard"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] lg:max-w-[600px] rounded-2xl bg-[#0B0F19]/90 border transition-all duration-700 ease-out flex flex-col overflow-hidden backdrop-blur-2xl transform ${
              isMaximized 
                ? 'scale-105 border-purple-500/40 shadow-[0_0_50px_rgba(139,92,246,0.35)] z-30' 
                : 'lg:rotate-y-[-5deg] lg:rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* macOS style header */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#0B0F19]">
              <div className="flex gap-2 group/dots">
                <button 
                  onClick={() => setIsClosed(true)}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#E0443E] flex items-center justify-center text-black/60 font-bold transition-all duration-200 cursor-pointer select-none active:scale-90"
                  title="Close Session"
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 text-[7px] leading-none mb-[0.5px]">×</span>
                </button>
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#DEA123] flex items-center justify-center text-black/60 font-bold transition-all duration-200 cursor-pointer select-none active:scale-90"
                  title="Minimize Session"
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 text-[7px] leading-none mb-[2px]">−</span>
                </button>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#1AAB2E] flex items-center justify-center text-black/60 font-bold transition-all duration-200 cursor-pointer select-none active:scale-90"
                  title={isMaximized ? "Restore Window" : "Maximize Window"}
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 text-[7px] leading-none mb-[0.5px]">+</span>
                </button>
              </div>
              <div className="mx-auto h-6 w-64 bg-[#151B2B] rounded flex items-center px-3 justify-between border border-white/5">
                 <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <Search className="w-3 h-3" />
                    <span>Search projects...</span>
                 </div>
                 <span className="text-[9px] text-slate-600 border border-slate-700/50 rounded px-1">⌘K</span>
              </div>
            </div>
            
            {/* Minimalist Dashboard Body */}
            <div className="flex-1 flex bg-[#050810] relative">
              {/* Thin Sidebar */}
              <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-[#080C16]">
                <button 
                  onClick={() => {
                    setActiveTab('files');
                    setIsSynthesized(false);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    activeTab === 'files' 
                      ? 'bg-primary/20 text-primary border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.25)]' 
                      : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5'
                  }`}
                  title="Files Explorer"
                >
                  <Layout className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('database');
                    setIsSynthesized(false);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    activeTab === 'database' 
                      ? 'bg-secondary/20 text-secondary border-secondary/20 shadow-[0_0_10px_rgba(139,92,246,0.25)]' 
                      : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5'
                  }`}
                  title="Semantic Databases"
                >
                  <Database className="w-4 h-4" />
                </button>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 'files' ? (
                    <FilesTab isSynthesized={isSynthesized} setIsSynthesized={setIsSynthesized} />
                  ) : (
                    <DatabaseTab isSynthesized={isSynthesized} setIsSynthesized={setIsSynthesized} />
                  )}
                </AnimatePresence>

                {/* Elegant graph or visualization placeholder */}
                <div className="mt-auto h-16 sm:h-24 rounded-xl border border-white/5 bg-gradient-to-b from-[#0F1423] to-transparent relative overflow-hidden transition-all duration-700">
                   <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-700 ${isSynthesized ? (activeTab === 'database' ? 'from-cyan-500/15' : 'from-violet-500/15') : 'from-primary/10'} to-transparent`}></div>
                   <svg className={`absolute bottom-0 w-full h-full transition-colors duration-700 ${isSynthesized ? (activeTab === 'database' ? 'text-cyan-500/40' : 'text-violet-500/40') : 'text-primary/30'}`} preserveAspectRatio="none" viewBox="0 0 100 100">
                     {isSynthesized ? (
                       <>
                         <path d="M0,100 L0,40 Q25,80 50,30 T100,50 L100,100 Z" fill="currentColor" opacity="0.3"></path>
                         <path d="M0,100 L0,60 Q30,20 60,80 T100,20 L100,100 Z" fill="currentColor" opacity="0.5"></path>
                       </>
                     ) : (
                       <>
                         <path d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z" fill="currentColor" opacity="0.3"></path>
                         <path d="M0,100 L0,70 Q30,40 60,70 T100,40 L100,100 Z" fill="currentColor" opacity="0.5"></path>
                       </>
                     )}
                   </svg>
                </div>
              </div>

              {/* Frost-glass Minimization Pane */}
              <AnimatePresence>
                {isMinimized && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMinimized(false)}
                    className="absolute inset-0 z-50 bg-[#050810]/70 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer group hover:bg-[#050810]/60 transition-colors"
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                      className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg flex items-center gap-3 group-hover:border-amber-500/30 group-hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-semibold font-poppins text-slate-300 tracking-wide">
                        Workspace Minimized • Click to Expand
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <OfflineCard setIsClosed={setIsClosed} />
        )}
      </AnimatePresence>
      
      {/* Subtle backdrop elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 blur-3xl -z-10 rounded-full" />
    </motion.div>
  );
};
