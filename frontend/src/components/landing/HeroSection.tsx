// components/landing/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Lock, EarIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[95vh]  py-20 gap-12 px-6 overflow-hidden">
    {/* Blurred glows */}
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-20 dark:opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl opacity-15" />
    </div>

    {/* Overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none z-0 bg-radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.7) 80%" />

      {/* Text Content */}
      <div className="flex-1 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
        >
          <Sparkles className="h-5 w-5" />
          <span>Anonymous Conversations</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
        >
          <span className="text-gradient bg-gradient-to-r from-primary to-secondary">
            Share Secrets,
          </span>
          <br />
          <>
            {/* Light mode text with gradient */}
            <span className="dark:hidden bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Spark Conversations
            </span>

            {/* Dark mode text with glow */}
            <span className="hidden dark:inline text-glow">
              Spark Conversations
            </span>
          </>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Gossipa is your <span className="text-primary font-semibold">anonymous space</span> to express, connect, and be heard — no judgment, just real talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Button size="lg" className="btn-playful text-lg font-medium group">
           Join Us
            <Sparkles className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg font-medium group">
            <MessageSquare className="mr-2 h-5 w-5" />
            See How It Works
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span>End-to-end encrypted</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-secondary" />
            <span>100% anonymous</span>
          </div>
        </motion.div>
      </div>

      {/* Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex justify-center relative z-10"
      >
        <div className="relative w-full max-w-xl aspect-square">
          <div className="absolute inset-0 glass rounded-3xl shadow-2xl overflow-hidden border border-border/50">
            {/* Avatar bubbles */}
            <img src="img/avatars/thumbs/lioness.jpg" alt="user1" className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full bg-accent-1/20 backdrop-blur-sm z-10 avatar-glow" />
            <img src="img/avatars/thumbs/sheep.jpg" alt="user2" className="absolute top-[30%] right-[20%] w-20 h-20 rounded-full bg-accent-2/20 backdrop-blur-sm z-10 avatar-glow" />
            <img src="img/avatars/thumbs/dog.jpg" alt="user3" className="absolute bottom-[15%] left-[25%] w-24 h-24 rounded-full bg-accent-3/20 backdrop-blur-sm z-10 avatar-glow" />

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="25" y1="20" x2="80" y2="35" stroke="url(#grad1)" strokeWidth="0.4" />
              <line x1="80" y1="35" x2="30" y2="80" stroke="url(#grad2)" strokeWidth="0.4" />
              <line x1="30" y1="80" x2="25" y2="20" stroke="url(#grad3)" strokeWidth="0.4" />

              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7f5af0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d13d87" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d13d87" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7f5af0" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7f5af0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d13d87" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Meaningful icons */}
            <EarIcon className="absolute top-[40%] left-[45%] w-6 h-6 text-foreground/50 animate-pulse" />
            {/* <HeartIcon className="absolute bottom-[30%] right-[45%] w-6 h-6 text-primary/40 animate-bounce" /> */}
            {/* <MessageSquare className="absolute bottom-[45%] left-[55%] w-6 h-6 text-secondary/50 animate-wiggle" /> */}
            {/* <Lock className="absolute top-[60%] left-[40%] w-6 h-6 text-muted-foreground/50 animate-fadeInSlow" /> */}
          </div>

          {/* Floating decoration elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-10 left-10 text-primary/30"
          >
            <Lock className="h-8 w-8" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 right-10 text-secondary/30"
          >
            <MessageSquare className="h-8 w-8" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}