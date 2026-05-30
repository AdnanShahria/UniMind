import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, School, GraduationCap, CheckCircle2, Lock, Eye, EyeOff, Check, Sparkles
} from 'lucide-react';
import { CustomSelect, Option } from '../CustomSelect';

interface RegisterFormProps {
  regForm: any;
  errors: Record<string, string>;
  handleRegChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRegCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegSubmit: (e: React.FormEvent) => void;
  institutionOptions: Option[];
  majorOptions: Option[];
  sessionOptions: Option[];
  roleOptions: Option[];
  handleInstitutionSelect: (val: string) => void;
  handleMajorSelect: (val: string) => void;
  handleSessionSelect: (val: string) => void;
  handleRoleSelect: (val: string) => void;
  saveCustomInstitution: () => void;
  saveCustomMajor: () => void;
  saveCustomSession: () => void;
  saveCustomRole: () => void;
  isSavingUni: boolean;
  isSavingMajor: boolean;
  isSavingSession: boolean;
  isSavingRole: boolean;
  setRegForm: React.Dispatch<React.SetStateAction<any>>;
  openMetadataModal: (type: 'institution' | 'major' | 'session' | 'role', action: 'add' | 'rename', oldValue?: string) => void;
}

export const RegisterForm = ({
  regForm,
  errors,
  handleRegChange,
  handleRegCheckbox,
  handleRegSubmit,
  institutionOptions,
  majorOptions,
  sessionOptions,
  roleOptions,
  handleInstitutionSelect,
  handleMajorSelect,
  handleSessionSelect,
  handleRoleSelect,
  saveCustomInstitution,
  saveCustomMajor,
  saveCustomSession,
  saveCustomRole,
  isSavingUni,
  isSavingMajor,
  isSavingSession,
  isSavingRole,
  setRegForm,
  openMetadataModal
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleRegSubmit} className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Name */}
        <div className="group flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Full Name</label>
          <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
            <input
              type="text"
              name="name"
              value={regForm.name}
              onChange={handleRegChange}
              placeholder="Adnan Shahria"
              className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
            />
          </div>
          {errors.name && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.name}</p>}
        </div>

        {/* Academic Email */}
        <div className="group flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Academic Email</label>
          <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
            <input
              type="email"
              name="email"
              value={regForm.email}
              onChange={handleRegChange}
              placeholder="adnan@university.edu"
              className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
            />
          </div>
          {errors.email && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Institution & Major / Custom Uni Fields Layout */}
        {regForm.isUnlistedInstitution ? (
          <>
            {/* Custom Institution Column 1 (Left) */}
            <div className="group flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">University / Institution</label>
              <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6]" />
                <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-glow" />
                <input
                  type="text"
                  name="institution"
                  value={regForm.institution}
                  onChange={handleRegChange}
                  placeholder="Enter Custom Institution Name"
                  className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <button 
                  type="button" 
                  onClick={() => setRegForm((prev: any) => ({...prev, isUnlistedInstitution: false, institution: ''}))} 
                  className="text-[10px] text-primary-glow hover:underline font-poppins font-medium mt-1.5"
                >
                  ← Back to list
                </button>
              </div>
              {errors.institution && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.institution}</p>}
            </div>

            {/* Custom Institution Column 2 (Right - Required Fields) */}
            <div className="group flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Required Fields</label>
              <div className="flex flex-col gap-2">
                {/* Row 1: Abbrev */}
                <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 overflow-hidden">
                  <input 
                    type="text" 
                    name="abbreviation" 
                    value={regForm.abbreviation} 
                    onChange={handleRegChange} 
                    placeholder="Abbrev (e.g. GAU)" 
                    className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none px-3 font-poppins" 
                  />
                </div>
                {/* Row 2: District & Country */}
                <div className="flex gap-2">
                  <div className="w-1/2 relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 overflow-hidden">
                    <input 
                      type="text" 
                      name="district" 
                      value={regForm.district} 
                      onChange={handleRegChange} 
                      placeholder="District" 
                      className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none px-3 font-poppins" 
                    />
                  </div>
                  <div className="w-1/2 relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 overflow-hidden">
                    <input 
                      type="text" 
                      name="country" 
                      value={regForm.country} 
                      onChange={handleRegChange} 
                      placeholder="Country" 
                      className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none px-3 font-poppins" 
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mt-1">
                <button
                  type="button"
                  onClick={saveCustomInstitution}
                  disabled={isSavingUni}
                  className={`relative px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-[10px] transition-all cursor-pointer overflow-hidden mt-1.5 ${
                    isSavingUni ? 'opacity-80 pointer-events-none' : 'animate-glow-pulse'
                  }`}
                >
                  {isSavingUni && <span className="absolute inset-0 animate-shimmer rounded-xl" />}
                  {isSavingUni ? 'Saving…' : 'Save University'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Standard Institution Column 1 (Left) */}
            <div className="group flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">University / Institution</label>
              <div className="relative">
                <CustomSelect
                  value={regForm.institution}
                  onChange={handleInstitutionSelect}
                  options={institutionOptions}
                  placeholder="Select Institution"
                />
                {regForm.institution && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const rawVal = regForm.institution;
                        const cleanName = rawVal.includes(' | Location: ') ? rawVal.split(' | Location: ')[0] : rawVal;
                        openMetadataModal('institution', 'rename', cleanName);
                      }}
                      className="text-[10px] text-slate-400 hover:text-primary-glow hover:underline transition-colors font-poppins cursor-pointer bg-transparent border-none outline-none"
                    >
                      Report spelling typo in this name
                    </button>
                  </div>
                )}
              </div>
              {errors.institution && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.institution}</p>}
            </div>

            {/* Standard Major Column 2 (Right) */}
            <div className="group flex flex-col transition-all duration-500">
              <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Field of Study / Major</label>
              {!regForm.isCustomMajor ? (
                <CustomSelect
                  value={regForm.major}
                  onChange={handleMajorSelect}
                  options={majorOptions}
                  placeholder="Select Field / Major"
                  disabled={!regForm.institution.trim() || regForm.isUnlistedInstitution}
                />
              ) : (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="relative flex flex-col gap-2"
                >
                  <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6]" />
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-glow" />
                    <input
                      type="text"
                      name="major"
                      value={regForm.major}
                      onChange={handleRegChange}
                      placeholder="Enter Custom Field / Major"
                      className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <button 
                      type="button" 
                      onClick={() => setRegForm((prev: any) => ({...prev, isCustomMajor: false, major: ''}))} 
                      className="text-[10px] text-primary-glow hover:underline font-poppins font-medium"
                    >
                      ← Back to list
                    </button>
                    <button
                      type="button"
                      onClick={saveCustomMajor}
                      disabled={isSavingMajor}
                      className={`relative px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-[10px] transition-all shadow-[0_2px_10px_rgba(16,185,129,0.2)] hover:shadow-[0_2px_15px_rgba(16,185,129,0.4)] cursor-pointer overflow-hidden ${isSavingMajor ? 'opacity-80 pointer-events-none' : ''}`}
                    >
                      {isSavingMajor && <span className="absolute inset-0 animate-shimmer rounded-xl" />}
                      {isSavingMajor ? 'Saving…' : 'Save Major'}
                    </button>
                  </div>
                </motion.div>
              )}
              {errors.major && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.major}</p>}
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Session / Batch */}
        <div className="group flex flex-col transition-all duration-500">
          <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Session / Batch</label>
          {!regForm.isCustomSession ? (
            <CustomSelect
              value={regForm.session}
              onChange={handleSessionSelect}
              options={sessionOptions}
              placeholder="Select Session / Batch"
              disabled={!regForm.institution.trim() || regForm.isUnlistedInstitution}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="relative flex flex-col gap-2"
            >
              <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6]" />
                <CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-glow" />
                <input
                  type="text"
                  name="session"
                  value={regForm.session}
                  onChange={handleRegChange}
                  placeholder="Enter Custom Session (e.g. 2025-2026)"
                  className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <button 
                  type="button" 
                  onClick={() => setRegForm((prev: any) => ({...prev, isCustomSession: false, session: ''}))} 
                  className="text-[10px] text-primary-glow hover:underline font-poppins font-medium"
                >
                  ← Back to list
                </button>
                <button
                  type="button"
                  onClick={saveCustomSession}
                  disabled={isSavingSession}
                  className={`relative px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-[10px] transition-all shadow-[0_2px_10px_rgba(16,185,129,0.2)] hover:shadow-[0_2px_15px_rgba(16,185,129,0.4)] cursor-pointer overflow-hidden ${isSavingSession ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  {isSavingSession && <span className="absolute inset-0 animate-shimmer rounded-xl" />}
                  {isSavingSession ? 'Saving…' : 'Save Session'}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Academic Role */}
        <div className="group flex flex-col transition-all duration-500">
          <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Academic Role</label>
          {!regForm.isCustomRole ? (
            <CustomSelect
              value={regForm.role}
              onChange={handleRoleSelect}
              options={roleOptions}
              placeholder="Select Academic Role"
              disabled={!regForm.institution.trim() || regForm.isUnlistedInstitution}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="relative flex flex-col gap-2"
            >
              <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 focus-within:border-primary-glow/30 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6]" />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-glow" />
                <input
                  type="text"
                  name="role"
                  value={regForm.role}
                  onChange={handleRegChange}
                  placeholder="Enter Custom Academic Role"
                  className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <button 
                  type="button" 
                  onClick={() => setRegForm((prev: any) => ({...prev, isCustomRole: false, role: 'Undergraduate'}))} 
                  className="text-[10px] text-primary-glow hover:underline font-poppins font-medium"
                >
                  ← Back to list
                </button>
                <button
                  type="button"
                  onClick={saveCustomRole}
                  disabled={isSavingRole}
                  className={`relative px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-[10px] transition-all shadow-[0_2px_10px_rgba(16,185,129,0.2)] hover:shadow-[0_2px_15px_rgba(16,185,129,0.4)] cursor-pointer overflow-hidden ${isSavingRole ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  {isSavingRole && <span className="absolute inset-0 animate-shimmer rounded-xl" />}
                  {isSavingRole ? 'Saving…' : 'Save Role'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Password */}
        <div className="group flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Secure Password</label>
          <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={regForm.password}
              onChange={handleRegChange}
              placeholder="••••••••"
              className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-10 font-poppins"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.password}</p>}
        </div>
      </div>

      {/* Agree checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3.5 cursor-pointer group select-none">
          <input
            type="checkbox"
            checked={regForm.agree}
            onChange={handleRegCheckbox}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
            regForm.agree 
              ? 'bg-gradient-to-r from-[#2563eb] to-[#8b5cf6] border-transparent text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]' 
              : 'border-white/10 bg-slate-950/50 group-hover:border-white/20'
          }`}>
            {regForm.agree && <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />}
          </div>
          <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors font-poppins font-light leading-relaxed">
            I agree to the <span className="text-primary-glow hover:underline font-normal">UniMind Beta Onboarding Terms</span> and data isolation protocol.
          </span>
        </label>
        {errors.agree && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.agree}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.015, translateY: -2 }}
        whileTap={{ scale: 0.985 }}
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-[#2563eb] via-[#8b5cf6] to-[#06b6d4] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 mt-4 cursor-pointer relative overflow-hidden group/btn"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-marquee pointer-events-none" style={{ animationDuration: '1.5s' }} />
        <Sparkles className="w-4 h-4 text-blue-100 animate-pulse" />
        <span>Request Beta Access</span>
      </motion.button>

      {/* Metadata Suggestion / Request Link */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => openMetadataModal('institution', 'add')}
          className="text-[11px] text-slate-400 hover:text-primary-glow transition-colors font-poppins underline bg-transparent border-none cursor-pointer"
        >
          Missing your university, major, or session? Suggest a change
        </button>
      </div>
    </form>
  );
};
