"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="hero">
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-eye mb-4"
        >
          50 WEEK CHALLENGE PLATFORM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hero-h1 mb-4"
        >
          SaaS{" "}
          <em>Motion</em>
          <br />
          Graphics
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hero-sub max-w-lg"
        >
          Platform สำหรับการเรียนรู้และสร้างสรรค์ SaaS Motion Graphics & Interactive UI <br />
          ร่วมท้าทาย Challenge 50 สัปดาห์ เพื่อพัฒนาทักษะระดับ Senior
        </motion.p>
      </div>

      {/* Right - Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="ring-wrap"
      >
        <svg className="ring-svg" viewBox="0 0 140 140">
          <circle className="ring-track" cx="70" cy="70" r="56" />
          <motion.circle
            className="ring-fill"
            cx="70" cy="70" r="56"
            strokeDasharray="351.86"
            initial={{ strokeDashoffset: 351.86 }}
            animate={{ strokeDashoffset: 351.86 * 0.85 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          />
          <text
            x="70" y="64"
            textAnchor="middle"
            fill="var(--text)"
            style={{ fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700 }}
          >
            15%
          </text>
          <text
            x="70" y="84"
            textAnchor="middle"
            className="ring-lbl"
          >
            PROGRESS
          </text>
        </svg>
      </motion.div>
    </section>
  );
}
