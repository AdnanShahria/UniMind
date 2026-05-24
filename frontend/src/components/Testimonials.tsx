
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "UniMind’s AI Tutor completely changed how I study for exams. It generates personalized flashcards and quizzes based on my actual lecture notes.",
    author: "Sarah J.",
    role: "Computer Science Student",
    avatar: "bg-gradient-to-tr from-blue-500 to-cyan-400"
  },
  {
    quote: "The semantic search is a lifesaver. Finding exact paragraphs from hundreds of research papers saves me hours of manual reading every week.",
    author: "Dr. Alan T.",
    role: "AI Researcher",
    avatar: "bg-gradient-to-tr from-purple-500 to-pink-500"
  },
  {
    quote: "Managing my batch communities and assigning smart-summarized reading materials has never been more intuitive. It’s the ultimate academic OS.",
    author: "Prof. Elena M.",
    role: "University Lecturer",
    avatar: "bg-gradient-to-tr from-orange-400 to-red-500"
  }
];

export const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <style>{`
        @keyframes marquee-testimonials {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee-testimonials {
          display: flex;
          width: max-content;
          animation: marquee-testimonials 30s linear infinite;
        }
        .animate-marquee-testimonials:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
          Trusted by the <span className="text-gradient">Academic World</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-poppins font-light">
          See how UniMind is revolutionizing the learning and research experience across the globe.
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden py-4 z-10">
        {/* Left and Right Gradient Blurs for smooth premium masking */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-testimonials flex gap-6">
          {duplicatedTestimonials.map((test, index) => (
            <div
              key={index}
              className="glass-card w-[300px] sm:w-[360px] p-6 rounded-2xl relative group flex-shrink-0 flex flex-col justify-between hover:border-primary-glow/65 hover:bg-slate-900/60 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Quote className="absolute top-5 right-5 w-7 h-7 text-white/5 group-hover:text-primary/20 transition-colors duration-500 pointer-events-none" />
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10 font-poppins font-light">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4 mt-auto">
                <div className={`w-10 h-10 rounded-full ${test.avatar} shadow-md flex-shrink-0`} />
                <div>
                  <h4 className="text-white font-semibold font-poppins text-sm">{test.author}</h4>
                  <span className="text-xs text-slate-400">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
