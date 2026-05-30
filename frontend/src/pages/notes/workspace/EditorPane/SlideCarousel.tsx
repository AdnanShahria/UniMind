import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const SlideCarousel = ({ slidesText, renderers }: { slidesText: string, renderers: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slidesText.split('---').map(s => s.trim()).filter(s => s.length > 0);

  const nextSlide = () => setCurrentSlide(p => Math.min(p + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(p => Math.max(p - 1, 0));

  const handleDownload = () => {
    const blob = new Blob([slidesText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slides.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (slides.length === 0) return <div className="text-slate-400">No slides generated.</div>;

  return (
    <div className="w-full flex flex-col items-center max-w-4xl mx-auto space-y-6 my-4">
      <div className="w-full flex justify-end">
        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary-glow hover:bg-primary/30 transition-colors text-sm font-semibold border border-primary/20">
          <Download className="w-4 h-4" /> Download Slides
        </button>
      </div>
      <div className="w-full min-h-[400px] aspect-[16/9] bg-[#1a1d24] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-y-auto custom-scrollbar flex flex-col justify-start">
        <div className="prose prose-invert max-w-none text-base sm:text-lg font-poppins text-slate-200">
          <ReactMarkdown components={renderers}>{slides[currentSlide]}</ReactMarkdown>
        </div>
        <div className="absolute bottom-4 right-6 text-xs font-semibold text-slate-500">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
          {slides.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-primary' : 'bg-white/20'}`} />
          ))}
        </div>
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
