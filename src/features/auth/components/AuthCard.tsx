"use client";

import { motion } from "framer-motion";

export function AuthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 15 }}
      className="glass-card max-w-md w-full p-8 lg:p-10"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 
            className="text-4xl font-black uppercase italic tracking-tighter"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Login to{" "}
            <span className="text-accent underline decoration-4 underline-offset-4">
              Studio
            </span>
          </h1>
          <p className="text-xs font-bold tracking-tight text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
            // เข้าสู่ระบบเพื่อจัดการ Assets ของคุณ
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="senior@architect.dev" 
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="glass-input"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-4">
          <button className="btn-accent w-full justify-center">
            Let&apos;s Go!
          </button>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-border-subtle" />
            <span className="text-[9px] font-black uppercase tracking-widest text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
              Or Connect with
            </span>
            <div className="h-[1px] flex-1 bg-border-subtle" />
          </div>

          <button className="btn-ghost w-full justify-center text-sm font-bold bg-[#FFFFFF] !text-[#000000] !border-none hover:!bg-[#f1f1f1]">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.25.81-.59z"
                fill="#FBBC04"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google Account
          </button>
        </div>

        <p className="text-center text-[10px] font-black uppercase text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
          Don&apos;t have an account?{" "}
          <a href="#" className="underline text-accent">
            Sign Up Free
          </a>
        </p>
      </div>
    </motion.div>
  );
}
