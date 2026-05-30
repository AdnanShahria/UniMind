import { useState, useEffect } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { turso } from '../../../../utils/tursoClient';

export const FlashcardsTab = ({ noteId }: { noteId: string | number }) => {
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlashcards = async () => {
      const { data } = await turso.from('flashcards').select('*').eq('note_id', noteId).order('created_at', { ascending: true });
      if (data) setFlashcards(data);
      setLoading(false);
    };
    loadFlashcards();
  }, [noteId]);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (flashcards.length === 0) return <div className="text-center text-slate-400 py-12">No flashcards found. Create them from the Studio.</div>;

  const nextCard = () => { setIsFlipped(false); setCurrentCard(p => Math.min(p + 1, flashcards.length - 1)); };
  const prevCard = () => { setIsFlipped(false); setCurrentCard(p => Math.max(p - 1, 0)); };

  return (
    <div className="w-full flex flex-col items-center max-w-4xl mx-auto space-y-6 my-4">
      <div className="text-sm font-semibold text-slate-400">Card {currentCard + 1} of {flashcards.length}</div>
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] aspect-[16/9] bg-[#1a1d24] hover:bg-[#1f2229] border border-white/10 hover:border-primary/50 transition-all cursor-pointer rounded-2xl p-8 sm:p-12 shadow-2xl relative flex flex-col items-center justify-center text-center group"
      >
        <div className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-4 absolute top-6">
          {isFlipped ? 'Answer' : 'Question'}
        </div>
        <div className="text-xl sm:text-2xl font-poppins text-slate-200">
          {isFlipped ? flashcards[currentCard].answer : flashcards[currentCard].question}
        </div>
        <div className="absolute bottom-6 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Click to flip</div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prevCard} disabled={currentCard === 0} className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
          {flashcards.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentCard ? 'bg-primary' : 'bg-white/20'}`} />
          ))}
        </div>
        <button onClick={nextCard} disabled={currentCard === flashcards.length - 1} className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
