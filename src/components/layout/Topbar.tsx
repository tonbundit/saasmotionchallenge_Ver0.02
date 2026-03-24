"use client";

import { motion } from "framer-motion";

export function Topbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="topbar"
    >
      <div className="logo">
        <div className="logo-icon">
          <div
            className="w-full h-full flex items-center justify-center text-[11px] font-black"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            SM
          </div>
        </div>
        <span>
          SaaS<span style={{ color: "var(--accent)" }}>Motion</span>
        </span>
      </div>

      <div className="tb-sp" />

      <div className="pill pill-s hidden md:inline-flex">
        <span style={{ fontSize: 7 }}>—</span> v2.0 LIVE
      </div>
      <div className="pill pill-w hidden lg:inline-flex">
        <strong>50</strong> Week Challenge
      </div>
    </motion.nav>
  );
}
