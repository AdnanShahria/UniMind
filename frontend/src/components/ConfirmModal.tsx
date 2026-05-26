import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'info';
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = 'info'
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const iconColor = isDanger ? 'text-red-400' : 'text-primary-400';
  const gradientBorder = isDanger 
    ? 'bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50' 
    : 'bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50';
  const bgGlow = isDanger ? 'bg-red-500/10' : 'bg-primary/10';
  const buttonBg = isDanger 
    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]'
    : 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary-400 hover:to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#030712]/70 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="w-full max-w-md relative group pointer-events-auto"
        >
          {/* Glowing border */}
          <div className={`absolute -inset-[1px] ${gradientBorder} rounded-2xl opacity-40 blur-[1px] group-hover:opacity-80 transition-opacity duration-300`} />
          
          <div className="relative bg-[#0f172a]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Body */}
            <div className="p-6 flex gap-4 items-start relative">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${bgGlow} rounded-full blur-[40px] pointer-events-none`} />
              
              <div className={`p-3 rounded-xl border shrink-0 relative z-10 ${isDanger ? 'bg-red-500/10 border-red-500/20' : 'bg-primary/10 border-primary/20'}`}>
                {isDanger ? (
                  <AlertCircle className={`w-6 h-6 ${iconColor}`} />
                ) : (
                  <HelpCircle className={`w-6 h-6 ${iconColor}`} />
                )}
              </div>
              
              <div className="flex-1 space-y-2 relative z-10">
                <h3 className="text-lg font-bold text-white font-outfit leading-none">{title}</h3>
                <p className="text-xs text-slate-400 font-poppins leading-relaxed">{message}</p>
              </div>
              
              <button 
                onClick={onCancel}
                className="absolute right-4 top-4 p-1 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/[0.06] bg-black/30 flex items-center justify-end gap-3 relative z-10">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-white text-xs font-semibold font-poppins transition-all duration-200 hover:scale-105 active:scale-95 ${buttonBg}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
