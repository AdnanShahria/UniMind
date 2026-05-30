
import { Brain, Database, Layout, Activity } from 'lucide-react';

export const BrandingPanel = () => {
  const brandingFeatures = [
    {
      icon: <Brain className="w-5 h-5 text-primary-glow" />,
      title: "AI-Powered Notes Synthesis",
      desc: "Connect papers, lectures, and datasets. Watch AI generate real-time multi-dimensional knowledge maps."
    },
    {
      icon: <Database className="w-5 h-5 text-secondary-glow" />,
      title: "Semantic Database Sync",
      desc: "Instant search across all your uploaded publications, files, and annotations with vector precision."
    },
    {
      icon: <Layout className="w-5 h-5 text-accent-glow" />,
      title: "Clutter-Free Workspace",
      desc: "A premium environment focused entirely on deep research, peer editing, and layout synthesis."
    }
  ];

  return (
    <div className="hidden lg:flex lg:col-span-5 relative p-8 sm:p-10 md:p-12 bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#040813] border-b lg:border-b-0 lg:border-r border-white/10 flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 blur-3xl rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center gap-3 mb-10 lg:mb-0">
        <div className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center bg-slate-950 shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden">
          <img src="/logo.png" className="w-full h-full object-cover" alt="UniMind" />
        </div>
        <div>
          <span className="text-2xl font-bold font-poppins tracking-wider text-slate-100">
            Uni<span className="text-gradient">Mind</span>
          </span>
        </div>
      </div>

      {/* Benefits Bullet points */}
      <div className="relative z-10 my-8 lg:my-auto space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-outfit">
            Unlock Your <br />
            <span className="text-gradient font-bold">Infinite Workspace</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light font-poppins leading-relaxed">
            Join a selected group of pioneering academics and research groups building the future of educational collaboration.
          </p>
        </div>

        <div className="space-y-5">
          {brandingFeatures.map((item, index) => (
            <div key={index} className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/10 group-hover:border-white/20 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-primary-glow transition-colors font-poppins">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed mt-0.5 font-poppins">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Beta Member Counter */}
      <div className="relative z-10 mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          <Activity className="w-3.5 h-3.5 text-primary-glow animate-pulse" />
          <span className="text-[10px] text-slate-300 font-poppins font-medium">UniMind Beta Node v2.1</span>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-500 uppercase font-semibold font-poppins tracking-wider">Active Cohorts</p>
          <p className="text-xs font-bold text-emerald-400 font-poppins flex items-center gap-1.5 justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            1,482 Pioneers
          </p>
        </div>
      </div>
    </div>
  );
};
