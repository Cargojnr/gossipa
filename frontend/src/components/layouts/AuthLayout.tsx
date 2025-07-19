// src/components/layouts/AuthLayout.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col min-h-screen w-full pt-24 sm:pt-20 bg-[var(--body-bg)] text-[var(--text-color)] relative overflow-hidden transition-colors duration-300">
        {/* Ambient Blobs */}
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[var(--primary-faded)] rounded-full blur-[120px] opacity-30 animate-pulse z-0" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[var(--secondary-color)] rounded-full blur-[120px] opacity-20 animate-pulse z-0" />

        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-3xl sm:max-w-4xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 border border-border"
          >
            {children}
          </motion.div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
