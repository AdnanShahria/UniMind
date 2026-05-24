import { motion } from 'framer-motion';
import { Network, Cpu, Lightbulb, Workflow, Sparkles } from 'lucide-react';

export const AIShowcase = () => {
  return (
    <section id="ai-system" className="py-24 relative z-10 bg-slate-950/50">
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="#06b6d4" />
            <path d="M50 50 L100 100 M50 50 L0 100 M50 50 L100 0 M50 50 L0 0" stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.3"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-pattern)"></rect>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
          >
            <Cpu className="w-5 h-5 text-accent-glow animate-pulse-slow" />
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-glow">Cognitive Core</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Intelligence at <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glow to-primary-glow">Every Layer</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { icon: Network, title: 'AI Research Assistant', desc: 'Synthesizes papers, generates citations, and maps research landscapes in real-time.' },
            { icon: Lightbulb, title: 'Topic Explanation', desc: 'Breaks down complex subjects dynamically to match your current understanding level.' },
            { icon: Workflow, title: 'Adaptive Roadmaps', desc: 'AI-generated study plans that evolve based on your performance and deadlines.' },
            { icon: Sparkles, title: 'Exam Prep Engine', desc: 'Predicts high-yield topics, builds adaptive practice tests, and analyzes revision readiness.' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-[1px] rounded-2xl overflow-hidden group h-full"
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-glow to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite]" />
              
              <div className="relative h-full bg-slate-900 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 border border-accent/20">
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent-glow" />
                </div>
                <h3 className="text-xs sm:text-lg md:text-xl font-semibold text-white mb-1 md:mb-3 font-poppins">{item.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 leading-tight sm:leading-normal md:leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
