import { motion } from "framer-motion";
import HeroSection from "./landing/HeroSection";
import WhyGossipa from "./landing/WhyGossipa";
import LiveTypingShowcase from "./landing/LiveTypingShowcase"; 
import LandingFooter from "./landing/LandingFooter"

export default function HomePage() {
  return (
    <div className="flex flex-col  bg-background text-foreground">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
            <HeroSection />
          </div>
        </section>

        {/* Why Gossipa */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <WhyGossipa />
          </div>
        </motion.section>

        {/* Live typing showcase */}
        <LiveTypingShowcase />
      </main>

      {/* 👇 This makes the footer sit flush at bottom */}
      <LandingFooter />
    </div>
  );
}
