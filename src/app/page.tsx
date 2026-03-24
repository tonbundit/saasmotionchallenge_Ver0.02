"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/layout/Topbar";
import { Hero } from "@/components/features/Hero";
import { StatsRow } from "@/components/features/StatsRow";
import { WeekCard } from "@/components/features/WeekCard";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useChallengeStore } from "@/store/useChallengeStore";
import { ChallengeWeek } from "@/types";

const INITIAL_CHALLENGES: ChallengeWeek[] = [
  {
    id: "1",
    week_number: 1,
    title: "SaaS Glassmorphism Core",
    description: "Building the foundation of modern SaaS UI",
    status: "active",
    assets: {},
    unlocks_at: new Date().toISOString()
  },
  {
    id: "2",
    week_number: 2,
    title: "Dynamic Sidebar Motion",
    description: "Interactive navigation patterns",
    status: "locked",
    assets: {},
    unlocks_at: new Date().toISOString()
  },
  {
    id: "3",
    week_number: 3,
    title: "Data Visualization Anim",
    description: "Bringing charts to life",
    status: "locked",
    assets: {},
    unlocks_at: new Date().toISOString()
  }
];

const techStack = [
  { label: "Next.js 16+", color: "var(--accent)" },
  { label: "TypeScript", color: "var(--accent3)" },
  { label: "Prisma ORM", color: "var(--accent4)" },
  { label: "Framer Motion", color: "var(--accent2)" },
  { label: "Lottie / Rive", color: "var(--accent)" },
  { label: "Supabase Auth", color: "var(--accent3)" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeInOut" as const },
  }),
};

export default function Home() {
  useSupabaseAuth();
  const { weeks, setWeeks } = useChallengeStore();

  useEffect(() => {
    if (weeks.length === 0) {
      setWeeks(INITIAL_CHALLENGES);
    }
  }, [weeks.length, setWeeks]);

  return (
    <main className="min-h-screen relative">
      <Topbar />
      <Hero />
      <StatsRow />

      <section className="max-w-[1120px] mx-auto px-8 pb-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left Column */}
          <div>
            <div className="hero-eye mb-4">TECH STACK</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="wcard p-4 group cursor-pointer"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${tech.color}, transparent)` }}
                  />
                  <div className="wc-num mb-2" style={{ color: tech.color }}>MODULE</div>
                  <div className="text-[14px] font-semibold">{tech.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="divider mb-8" />
            <div className="hero-eye mb-4">WEEKLY CHALLENGES</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {weeks.map((week, i) => (
                <WeekCard key={week.id} week={week} index={i} />
              ))}
            </div>

            <div className="divider mb-8" />
            <div className="hero-eye mb-4">ARCHITECTURE</div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="ac p-6 mb-6"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent3))" }} />
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded text-[10px] tracking-[0.18em] uppercase font-bold" style={{ fontFamily: "var(--mono)", background: "var(--accent)", color: "var(--bg)" }}>CLEAN ARCH</span>
                <span className="text-[24px] italic flex-1 leading-tight" style={{ fontFamily: "var(--serif)" }}>Feature-based Modular Structure</span>
              </div>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--text2)" }}>
                โครงสร้างระบบที่เน้นความยืดหยุ่นและการขยายตัว รองรับทั้ง Web และ Desktop Application ด้วย Next.js 16 และ Zod Validation
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="wcard p-8 text-center">
              <div className="wc-num text-accent mb-4" style={{ color: "var(--accent)" }}>// ACCESS_RESTRICTED</div>
              <h3 className="wc-tt text-2xl mb-6">Auth Fusion Active</h3>
              <p className="text-xs text-muted font-mono leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Legacy V1 authentication layer has been merged. System re-calibration in progress.
              </p>
              <div className="divider mb-8" />
              <div className="auth-btn w-full justify-center opacity-50 cursor-not-allowed">Initializing...</div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="wcard p-5"
            >
              <div className="wc-num mb-3" style={{ color: "var(--accent3)" }}>// SYSTEM STATUS</div>
              {[
                { label: "Build", status: "Operational", color: "#34A853" },
                { label: "Database", status: "Connected", color: "#34A853" },
                { label: "Auth", status: "Ready", color: "var(--accent)" },
                { label: "Motion Engine", status: "Active", color: "var(--accent3)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-[11px]" style={{ fontFamily: "var(--mono)", color: "var(--muted)" }}>{item.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-[6px] h-[6px] rounded-full" style={{ background: item.color, animation: "blink 2s infinite" }} />
                    <span className="text-[10px] font-bold" style={{ fontFamily: "var(--mono)", color: item.color }}>{item.status}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Marquee */}
        <footer className="fixed bottom-0 left-0 right-0 z-[300] bg-[rgba(7,7,15,0.95)] backdrop-blur-lg border-t border-[var(--border2)] py-3 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[1, 2].map((i) => (
              <span key={i} className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--accent)] uppercase italic">
                SAAS MOTION // 50 WEEK CHALLENGE // LOTTIE & RIVE READY // CLEAN ARCHITECTURE // SUPABASE AUTH //  
              </span>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}
