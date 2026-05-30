import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Check, AlertCircle, Mail, School, PlusCircle } from 'lucide-react';

interface RequestMetadataModalProps {
  showRequestModal: boolean;
  setShowRequestModal: (v: boolean) => void;
  requestStatus: 'idle' | 'submitting' | 'success' | 'error';
  setRequestStatus: (s: 'idle' | 'submitting' | 'success' | 'error') => void;
  requestError: string;
  requestEmail: string;
  setRequestEmail: (e: string) => void;
  requestType: 'institution' | 'major' | 'session' | 'role';
  setRequestType: (t: 'institution' | 'major' | 'session' | 'role') => void;
  actionType: 'add' | 'rename';
  setActionType: (a: 'add' | 'rename') => void;
  associatedUni: string;
  setAssociatedUni: (u: string) => void;
  oldValue: string;
  setOldValue: (v: string) => void;
  newValue: string;
  setNewValue: (v: string) => void;
  handleRequestSubmit: (e: React.FormEvent) => void;
}

export const RequestMetadataModal = ({
  showRequestModal,
  setShowRequestModal,
  requestStatus,
  setRequestStatus,
  requestError,
  requestEmail,
  setRequestEmail,
  requestType,
  setRequestType,
  actionType,
  setActionType,
  associatedUni,
  setAssociatedUni,
  oldValue,
  setOldValue,
  newValue,
  setNewValue,
  handleRequestSubmit
}: RequestMetadataModalProps) => {
  return (
    <AnimatePresence>
      {showRequestModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden glass-panel border border-white/10 rounded-3xl bg-slate-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-all cursor-pointer animate-duration-150"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary-glow">
                <HelpCircle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-outfit">Suggest Metadata Change</h3>
                <p className="text-xs text-slate-400 font-poppins font-light leading-relaxed">
                  Request new university additions or report typos in majors and sessions.
                </p>
              </div>
            </div>

            {requestStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-bold text-white font-poppins">Request Submitted!</h4>
                <p className="text-xs text-slate-400 font-poppins font-light max-w-xs mt-2 leading-relaxed">
                  Thank you! The UniMind Academic Registry board will review your request shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRequestStatus('idle');
                    setShowRequestModal(false);
                  }}
                  className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 font-poppins">
                {requestError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{requestError}</span>
                  </div>
                )}

                {/* Requester Email */}
                <div className="group flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Requester Email</label>
                  <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
                    <input
                      type="email"
                      required
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      placeholder="your.email@university.edu"
                      className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Request Type */}
                  <div className="group flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Change Category</label>
                    <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value as any)}
                        className="w-full h-11 bg-transparent text-xs text-slate-200 outline-none pl-4 pr-10 cursor-pointer appearance-none font-poppins"
                      >
                        <option value="institution" className="bg-[#0b1121] text-slate-200">University / Inst.</option>
                        <option value="major" className="bg-[#0b1121] text-slate-200">Field / Major (Subject)</option>
                        <option value="session" className="bg-[#0b1121] text-slate-200">Session / Batch</option>
                        <option value="role" className="bg-[#0b1121] text-slate-200">Academic Role</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Action Type */}
                  <div className="group flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Action Requested</label>
                    <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                      <select
                        value={actionType}
                        onChange={(e) => setActionType(e.target.value as any)}
                        className="w-full h-11 bg-transparent text-xs text-slate-200 outline-none pl-4 pr-10 cursor-pointer appearance-none font-poppins"
                      >
                        <option value="add" className="bg-[#0b1121] text-slate-200">Add Unlisted</option>
                        <option value="rename" className="bg-[#0b1121] text-slate-200">Rename / Fix Typo</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
                    </div>
                  </div>
                </div>

                {/* Associated University linkage */}
                {requestType !== 'institution' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-bold text-slate-400 font-poppins uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">
                        Associate Under University
                      </label>
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-medium uppercase font-poppins">Required Linkage</span>
                    </div>
                    <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                      <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
                      <input
                        type="text"
                        required
                        value={associatedUni}
                        onChange={(e) => setAssociatedUni(e.target.value)}
                        placeholder="e.g. Example University"
                        className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                      />
                    </div>
                    <p className="text-[9px] text-slate-500 font-light mt-1 font-poppins">This subject, session or role will be uniquely associated under this university.</p>
                  </motion.div>
                )}

                {/* Existing name field if rename selected */}
                {actionType === 'rename' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col"
                  >
                    <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Current Listed Name (with typo)</label>
                    <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                      <input
                        type="text"
                        required
                        value={oldValue}
                        onChange={(e) => setOldValue(e.target.value)}
                        placeholder="e.g. Exampel University"
                        className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none px-4 font-poppins"
                      />
                    </div>
                  </motion.div>
                )}

                {/* New value field */}
                <div className="group flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">
                    {actionType === 'add' ? 'Proposed New Entry Name' : 'Corrected Name'}
                  </label>
                  <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                    <input
                      type="text"
                      required
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder={
                        requestType === 'institution' ? 'e.g. Example University' :
                        requestType === 'major' ? 'e.g. Software Engineering' :
                        requestType === 'session' ? 'e.g. 2025-2026' : 'e.g. Professor / Mentor'
                      }
                      className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none px-4 font-poppins"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.015, translateY: -2 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={requestStatus === 'submitting'}
                  className="w-full h-12 bg-gradient-to-r from-[#2563eb] via-[#8b5cf6] to-[#06b6d4] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 mt-6 cursor-pointer relative overflow-hidden group/btn disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-marquee pointer-events-none" style={{ animationDuration: '1.5s' }} />
                  {requestStatus === 'submitting' ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <PlusCircle className="w-4 h-4" />
                  )}
                  <span>Submit Suggestion</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
