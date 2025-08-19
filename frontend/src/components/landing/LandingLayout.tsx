import { motion } from "framer-motion";
import LandingHeader from "@/components/landing/LandingHeader";
import HomePage from "@/components/HomePage";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--body-bg)] text-[var(--text-color)] transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient Gradient Blobs */}
      {/* <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[var(--primary-faded)] rounded-full blur-[120px] opacity-30 animate-pulse z-0" /> */}
      {/* <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[var(--secondary-color)] rounded-full blur-[120px] opacity-20 animate-pulse z-0" /> */}

      {/* Main Content Layer */}
      <div className="relative z-10">
        <LandingHeader />
        <HomePage />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=" max-w-6xl mx-auto text-[var(--text-muted)]"
        />
      </div>
    </div>
  );
};

export default LandingLayout;
