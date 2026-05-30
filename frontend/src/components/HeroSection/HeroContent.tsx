import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const HeroContent = ({ onOpenAuth }: { onOpenAuth: (tab: 'login' | 'register') => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-start"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-medium font-garamond leading-[1.15] mb-4 sm:mb-6 text-white tracking-tight">
        The Platform For <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 italic font-semibold">
          DeepWork
        </span>
      </h1>
      
      <p className="text-lg lg:text-xl text-slate-400 mb-6 sm:mb-10 max-w-xl leading-relaxed font-poppins font-light">
        A meticulously crafted environment where research, writing, and knowledge organization happen seamlessly. Designed for clarity, built for speed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => onOpenAuth('register')}
          className="group relative px-6 py-3.5 bg-white text-black font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          Start building free
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="group px-6 py-3.5 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
        >
          Explore features
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    </motion.div>
  );
};
