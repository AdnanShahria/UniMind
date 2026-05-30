import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, ZoomIn, ZoomOut, RotateCcw, X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import mermaid from 'mermaid';

export const MermaidViewer = ({ code }: { code: string }) => {
  const [svg, setSvg] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark', suppressErrorRendering: true });
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (isMounted) setSvg(renderedSvg);
      } catch (e) {
        console.error("Mermaid error:", e);
        const elementsToRemove = [id, `d${id}`, `bind-${id}`];
        elementsToRemove.forEach(elId => {
          const el = document.getElementById(elId);
          if (el) el.remove();
        });
        if (isMounted) setSvg(`<div class="text-red-400 p-4 border border-red-500/30 rounded-lg bg-red-500/10">Failed to render diagram</div>`);
      }
    };
    renderChart();
    return () => { isMounted = false; };
  }, [code]);

  return (
    <>
      <div className="w-full relative flex justify-center bg-white/5 rounded-xl p-6 my-6 overflow-auto border border-white/10 group">
        <button 
          onClick={() => setIsFullscreen(true)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
        {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <Loader2 className="w-6 h-6 animate-spin text-primary" />}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFullscreen && (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-8 bg-black/95 backdrop-blur-xl">
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md z-20 border border-white/10">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 rounded-xl hover:bg-white/20 text-slate-300 transition-colors" title="Zoom Out">
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="w-16 text-center text-sm font-semibold text-white font-poppins">{Math.round(zoom * 100)}%</div>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 rounded-xl hover:bg-white/20 text-slate-300 transition-colors" title="Zoom In">
                  <ZoomIn className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-white/20 mx-1" />
                <button onClick={() => setZoom(1)} className="p-2 rounded-xl hover:bg-white/20 text-slate-300 transition-colors" title="Reset Zoom">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => { setIsFullscreen(false); setZoom(1); }}
                className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors z-20 border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full h-full flex justify-center items-center overflow-auto p-4"
              >
                {svg ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: svg }} 
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
                    className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[90vw]" 
                  />
                ) : <Loader2 className="w-8 h-8 animate-spin text-primary" />}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
