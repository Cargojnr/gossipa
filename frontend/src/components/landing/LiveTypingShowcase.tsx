import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const mockStreams = [
  { user: "Didi", avatar: "/thumbs/dog.jpg", messages: ["omg you guys 😭", "he actually said that?!", "I'm streaming this live"] },
  { user: "Kiki", avatar: "/thumbs/girrafe.jpg", messages: ["tea is hot 🔥", "stay tuned babes", "y'all ain't ready"] },
  { user: "Remy", avatar: "/thumbs/monkey.jpg", messages: ["I just heard something crazy 😳", "catch this gist live"] },
  { user: "Tola", avatar: "/thumbs/bird.jpg", messages: ["tap in gossipa 🐦", "live gist dropping in 3... 2..."] },
];

type FloatingStreamCardProps = {
  user: string;
  avatar: string;
  messages: string[];
  delay: number;
};

const FloatingStreamCard = ({ user, avatar, messages, delay }: FloatingStreamCardProps) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2 }}
      className="floating-card relative p-4 w-60 h-36 text-sm text-white flex flex-col gap-2 bg-background/70 backdrop-blur-sm rounded-lg border border-white/10 shadow-md"
    >
      <div className="flex items-center gap-3">
        <img src={avatar} alt={user} className="w-8 h-8 rounded-full object-cover border border-white/20" />
        <span className="font-semibold">{user}</span>
      </div>
      <div className="text-muted-foreground mt-2 text-xs">
        <TypeAnimation
          key={messages[index]}
          sequence={[messages[index], 2500]}
          wrapper="span"
          cursor={true}
          speed={40}
        />
      </div>
    </motion.div>
  );
};

export default function LiveTypingShowcase() {
  return (
    <section
      className="relative isolate min-h-screen  flex items-center justify-center overflow-hidden bg-center bg-cover bg-no-repeat text-white"
      style={{ backgroundImage: `')` }}
    >
      {/* Radial dark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.7) 80%)"
        }}
      />

      

      {/* Floating cards */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float-slow">
          <FloatingStreamCard {...mockStreams[0]} delay={0.2} />
        </div>
        <div className="absolute bottom-20 right-12 animate-float-medium">
          <FloatingStreamCard {...mockStreams[1]} delay={0.4} />
        </div>
        <div className="absolute top-32 right-1/4 animate-float-fast">
          <FloatingStreamCard {...mockStreams[2]} delay={0.6} />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-float-slow">
          <FloatingStreamCard {...mockStreams[3]} delay={0.8} />
        </div>
      </div>

      {/* Center text */}
      <div className="relative z-30 max-w-xl w-full text-center px-6 py-10 sm:px-10 rounded-xl border border-white/10 bg-black/40 shadow-xl ring-1 ring-white/10 shadow-2xl shadow-primary/20 backdrop-blur-md"
      >
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-4xl sm:text-5xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-primary to-secondary drop-shadow-lg"
  >
    Stream Gossip. 
    <br className="hidden sm:block" />
    <span className="inline-block">Live. Typing.</span>
  </motion.h2>
  <motion.div
  className="mt-4 mx-auto w-32 h-[4px] rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary/60"
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 1, delay: 0.5 }}
  style={{ transformOrigin: "left" }}
/>


  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed"
  >
    The juice doesn’t wait. Go live instantly with nothing but your fingers and vibes. 
    <br className="hidden sm:block" />
    <span className="text-primary font-semibold">No mic. No camera. Just Gossipa.</span>
  </motion.p>
</div>

    </section>
  );
}
