import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
  subtitle?: string; // Optional subtitle for secondary info like locations
  isCustom?: boolean;
  isAction?: boolean;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
}

export const CustomSelect = ({ value, onChange, options, placeholder, disabled = false }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find(o => o.value === value);

  // Filter options based on query (excluding action items which are shown separately)
  const filteredOptions = options.filter(opt => {
    if (opt.isAction) return false;
    return opt.label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const actionOptions = options.filter(opt => opt.isAction);

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen) {
      setSearchQuery('');
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${disabled ? 'pointer-events-none opacity-60' : 'opacity-100'} transition-all duration-300`}>
      {/* Click trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        className={`w-full h-11 bg-slate-950/40 border border-white/5 rounded-xl px-4 flex items-center justify-between text-left text-xs sm:text-sm outline-none transition-all duration-300 select-none ${
          disabled 
            ? 'text-slate-500 border-white/5 cursor-not-allowed' 
            : 'text-slate-200 hover:border-primary-glow/30 focus:border-primary-glow/30 cursor-pointer'
        }`}
      >
        <span className={value ? "text-slate-100 truncate" : "text-slate-500 truncate"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-glow' : ''}`} />
      </button>

      {/* Floating Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-outside listener overlay */}
            <div className="fixed inset-0 z-40 cursor-default animate-fade-in" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-2 max-h-[380px] flex flex-col bg-[#0b1121]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Premium Glassmorphic Searchbar */}
              <div className="p-2 border-b border-white/[0.04] bg-slate-950/20 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full flex items-center">
                  <Search className="absolute left-3 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder={`Search ${placeholder.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-lg bg-slate-950/60 border border-white/5 outline-none text-xs text-slate-100 placeholder-slate-500 focus:border-primary-glow/30 focus:shadow-[0_0_10px_rgba(59,130,246,0.15)] transition-all font-poppins"
                    onClick={(e) => e.stopPropagation()} // Prevent closing dropdown on input click
                  />
                </div>
              </div>

              {/* Scrollable Options List */}
              <div className="overflow-y-auto flex-1 max-h-[252px] custom-scrollbar py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-center text-xs text-slate-500 font-poppins">
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((opt, idx) => {
                    const isSelected = opt.value === value;
                    let textClass = "text-slate-300 hover:text-white";
                    if (opt.isCustom) {
                      textClass = "text-emerald-400 hover:text-emerald-300 font-medium";
                    } else if (isSelected) {
                      textClass = "text-white font-semibold bg-white/5";
                    }

                    return (
                      <button
                        key={`${opt.value}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={`w-full text-left px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors duration-150 ease-out hover:bg-white/[0.04] flex items-center justify-between cursor-pointer ${textClass}`}
                      >
                        <div className="flex flex-col text-left truncate">
                          <span className="truncate">{opt.label}</span>
                          {opt.subtitle && (
                            <span className="text-[10px] text-slate-500 font-light truncate mt-0.5">{opt.subtitle}</span>
                          )}
                        </div>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Fixed Footer for Action Buttons */}
              {actionOptions.length > 0 && (
                <div className="border-t border-white/[0.06] bg-slate-950/40 shrink-0">
                  {actionOptions.map((opt, idx) => (
                    <button
                      key={`action-${opt.value}-${idx}`}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-all duration-200 hover:bg-white/[0.04] text-primary-glow hover:text-primary-glow/85 font-bold cursor-pointer"
                    >
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};


