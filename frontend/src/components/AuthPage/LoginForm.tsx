import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Check, Brain } from 'lucide-react';

interface LoginFormProps {
  loginForm: { email: string; password: string };
  errors: Record<string, string>;
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  loginForm,
  errors,
  handleLoginChange,
  handleLoginSubmit
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleLoginSubmit} className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 pb-2">
      {/* Academic Email */}
      <div className="group flex flex-col">
        <label className="text-[10px] font-bold text-slate-400 font-poppins mb-1.5 uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Academic Email</label>
        <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
            placeholder="adnan@university.edu"
            className="w-full h-11 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none pl-11 pr-4 font-poppins"
          />
        </div>
        {errors.email && <p className="text-[10px] text-red-400 mt-1.5 font-poppins font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="group flex flex-col">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-[10px] font-bold text-slate-400 font-poppins uppercase tracking-widest block transition-colors group-focus-within:text-primary-glow">Password</label>
          <a href="#" className="text-[10px] text-primary-glow hover:underline font-poppins font-semibold">Forgot password?</a>
        </div>
        <div className="relative rounded-xl transition-all duration-300 bg-slate-950/40 border border-white/5 group-focus-within:border-primary-glow/30 group-focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary-glow transition-colors duration-300" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginForm.password}
            onChange={handleLoginChange}
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

      {/* Keep Signed In */}
      <div className="pt-2 flex justify-between items-center select-none">
        <label className="flex items-center gap-3.5 cursor-pointer group">
          <input type="checkbox" className="sr-only" defaultChecked />
          <div className="w-5 h-5 rounded-lg border border-white/10 bg-slate-950/50 flex items-center justify-center transition-all group-hover:border-white/20 group-has-[:checked]:bg-gradient-to-r group-has-[:checked]:from-[#2563eb] group-has-[:checked]:to-[#8b5cf6] group-has-[:checked]:border-transparent group-has-[:checked]:shadow-[0_0_12px_rgba(59,130,246,0.4)] shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
          </div>
          <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors font-poppins font-light">
            Keep academic node authorized
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.015, translateY: -2 }}
        whileTap={{ scale: 0.985 }}
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-[#2563eb] via-[#8b5cf6] to-[#06b6d4] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 mt-8 cursor-pointer relative overflow-hidden group/btn"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-marquee pointer-events-none" style={{ animationDuration: '1.5s' }} />
        <Brain className="w-4 h-4 text-blue-100" />
        <span>Authorize & Enter</span>
      </motion.button>
    </form>
  );
};
