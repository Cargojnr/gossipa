// components/landing/WhyGossipa.tsx
import { motion } from "framer-motion";
import { Mic2 as Mic, MessageSquare, Clock, Lock, Sparkles } from "lucide-react";

const WhyGossipa = () => {
  const features = [
    {
      title: "Real-Time Secrets",
      desc: "Share or listen to anonymous whispers in real-time. No judgments. Just voices.",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-accent-1"
    },
    {
      title: "Voice or Text",
      desc: "Choose how you want to express. Let your voice carry emotions or type it out silently.",
      icon: <Mic className="h-5 w-5" />,
      color: "text-accent-2"
    },
    {
      title: "Tap In, Don’t Follow",
      desc: "No followers. Just quiet curiosity. Tap into profiles, catch the gist, then vanish.",
      icon: <Clock className="h-5 w-5" />,
      color: "text-accent-3"
      
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Why choose us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Why <span className="text-gradient bg-gradient-to-r from-primary to-secondary">Gossipa</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-8 border border-border/50 hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`p-3 rounded-full ${feature.color}/20 ${feature.color} w-fit mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              <div className="mt-6 pt-6 border-t border-border/20 flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>End-to-end encrypted</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGossipa;