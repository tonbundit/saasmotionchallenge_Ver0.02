import { AuthCard } from "@/features/auth/components/AuthCard";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-white selection:bg-accent selection:text-black">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Brutalist shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent border-[6px] border-black -rotate-12 z-0 shadow-[10px_10px_0px_0px_#000]" />
      <div className="absolute top-[60%] -right-20 w-80 h-80 bg-black rotate-12 z-0 hidden lg:block" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 lg:py-0">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-black text-accent font-black uppercase tracking-tighter text-sm">
              SaaS Boilerplate v1.0 // Minimal Brutalism
            </div>

            <h1 className="text-7xl xl:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-black">
              SOLO
              <br />
              STUDIO
              <br />
              <span className="text-white drop-shadow-[-3px_-3px_0px_#000] drop-shadow-[3px_3px_0px_#000] drop-shadow-[3px_-3px_0px_#000] drop-shadow-[-3px_3px_0px_#000]">
                BOILER
              </span>
              <br />
              PLATE
            </h1>

            <p className="max-w-lg text-xl font-bold tracking-tight text-zinc-900 border-l-[6px] border-black pl-8 leading-relaxed">
              A high-performance codebase for architects who build serious
              motion graphics platforms. Featuring Clean Architecture,
              Feature-based Modular Structure, and Next.js 16+ power.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <div className="px-6 py-3 border-4 border-black font-black uppercase bg-white">
                Next.js 16+ App Router
              </div>
              <div className="px-6 py-3 border-4 border-black font-black uppercase bg-white">
                Prisma + Postgres
              </div>
              <div className="px-6 py-3 border-4 border-black font-black uppercase bg-white">
                Strict TypeScript
              </div>
            </div>
          </div>

          {/* Right Column - Auth Card Demo */}
          <div className="flex justify-center order-1 lg:order-2">
            <AuthCard />
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#E8FF47] border-t-[4px] border-black px-8 py-3 flex justify-between items-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          <span className="text-sm font-black uppercase tracking-widest italic">
            BUILD SCALE MOTION // ZERO SECRET LEAKS // OPTIMIZED FOR FRAME-RATE
            // TYPE-SAFE ARCHITECTURE // STUDIO SAAS PLATFORM //{" "}
          </span>
          <span className="text-sm font-black uppercase tracking-widest italic">
            BUILD SCALE MOTION // ZERO SECRET LEAKS // OPTIMIZED FOR FRAME-RATE
            // TYPE-SAFE ARCHITECTURE // STUDIO SAAS PLATFORM //{" "}
          </span>
        </div>
        <div className="hidden lg:flex bg-black text-white px-4 py-1 text-xs font-black uppercase">
          Status: Operational
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
