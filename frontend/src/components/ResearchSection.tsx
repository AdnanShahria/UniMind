import { motion } from 'framer-motion';
import { GraduationCap, Library, TestTube, Activity, Users, Database } from 'lucide-react';

export const ResearchSection = () => {
  return (
    <section id="research" className="py-16 relative z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        {/* Curved Card Container */}
        <div className="relative rounded-[32px] overflow-hidden glass-panel border-white/10 p-8 md:p-12 lg:p-16 bg-slate-950/20 backdrop-blur-2xl shadow-2xl hover:border-primary/25 transition-colors duration-500">
          {/* Ambient background glows inside the card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left: Futuristic Institution Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[500px] mx-auto relative"
            >
              {/* Main Console Box */}
              <div className="relative w-full rounded-3xl glass-panel border-white/20 p-5 flex flex-col gap-4 shadow-2xl bg-slate-950/40 overflow-hidden backdrop-blur-xl group hover:border-primary/40 transition-all duration-500">
                {/* Corner Decorative Lights */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-accent/20 rounded-full blur-xl pointer-events-none" />

                {/* Top Bar / Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-poppins">Institution Console</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-medium text-primary-glow font-poppins">
                    SYSTEM ACTIVE
                  </div>
                </div>

                {/* University Identity Info */}
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center border border-white/10 shadow-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none font-poppins">Stanford University</h4>
                      <span className="text-[10px] text-slate-400 font-light mt-1 block">Preservation Hub ID: #STF-7281</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-poppins">Rank #1</span>
                    <span className="text-[9px] text-emerald-400 block font-medium mt-0.5">99.8% Sync</span>
                  </div>
                </div>

                {/* 2x2 Metric Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Research Nodes', val: '8,412', icon: Library, change: '+12% Active', color: 'text-primary-glow', bg: 'bg-primary/10 border-primary/20' },
                    { label: 'AI Synergy Index', val: '98.7%', icon: Activity, change: 'Optimal Rate', color: 'text-accent-glow', bg: 'bg-accent/10 border-accent/20' },
                    { label: 'Knowledge Base', val: '4.8 TB', icon: Database, change: 'Secure Encrypted', color: 'text-secondary-glow', bg: 'bg-secondary/10 border-secondary/20' },
                    { label: 'Active Collabs', val: '230+', icon: Users, change: 'Global Peer-Link', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
                  ].map((m, i) => (
                    <div key={i} className="bg-slate-900/60 border border-white/5 rounded-xl p-3 hover:border-white/15 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-slate-400 font-poppins">{m.label}</span>
                        <div className={`w-6 h-6 rounded-md ${m.bg} flex items-center justify-center border`}>
                          <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
                        </div>
                      </div>
                      <div className="text-base font-bold text-white font-poppins">{m.val}</div>
                      <div className="text-[8.5px] text-slate-400 mt-0.5 flex items-center gap-1 font-poppins">
                        <span className={m.color}>{m.change.split(' ')[0]}</span>
                        <span>{m.change.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Research Streams Panel */}
                <div className="bg-[#070b16]/70 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-poppins mb-0.5">Active Preservation Streams</h5>
                  
                  <div className="flex flex-col gap-2.5">
                    {[
                      { name: 'Quantum Coherence Synthesizer', progress: 92, val: '862 Nodes Indexed', color: 'bg-primary' },
                      { name: 'Neuro-Cognitive Modeling', progress: 74, val: '540 Nodes Indexed', color: 'bg-accent' }
                    ].map((s, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] font-poppins">
                          <span className="text-slate-300 font-medium">{s.name}</span>
                          <span className="text-slate-400 font-semibold">{s.progress}%</span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className={`h-full ${s.color} rounded-full`}
                          />
                        </div>
                        <span className="text-[8px] text-slate-500 font-light mt-0.5 leading-none">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
                <span className="text-gradient">Institution</span> Dashboards & <br/>
                Knowledge Preservation
              </h2>
              <p className="text-lg text-slate-400 mb-8 font-light">
                Empower universities with smart dashboards. Preserve institutional knowledge across generations of students and researchers.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Library className="w-6 h-6 text-primary-glow" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2 font-poppins">Centralized Academic Hub</h4>
                    <p className="text-slate-400 font-light">A unified repository for thesis papers, course materials, and departmental announcements.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                    <TestTube className="w-6 h-6 text-accent-glow" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2 font-poppins">Research Collaboration</h4>
                    <p className="text-slate-400 font-light">Cross-disciplinary tools enabling researchers to share data securely and discover synergistic projects.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
