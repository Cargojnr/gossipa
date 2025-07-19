import { useState, useMemo } from "react";
import FloatingLottie from "./FloatingLottie";
import love from "@/assets/love.json"; // adjust path as needed


type ReactionType = "like" | "laugh" | "hot" | "gasp";

interface ReactionHandlerProps {
  secretId: number;
  reactions: Partial<Record<ReactionType, { count: number }>>;
}

const ReactionHandler = ({ secretId, reactions }: ReactionHandlerProps) => {
  const [open, setOpen] = useState(false);
  const [localReactions, setLocalReactions] = useState(reactions);
  const [particles, setParticles] = useState<
    { id: number; emoji: string; style: React.CSSProperties }[]
  >([]);
  const [showLottie, setShowLottie] = useState(false);




  const emojiMap = useMemo(() => ({
    like: "👍",
    laugh: "😂",
    hot: <img src="/img/gossipa3.png" alt="🔥" className="verified-badge" />,
    gasp: "😱",
  }), []);

  const generateRandomOffset = () => ({
    "--x": `${Math.floor(Math.random() * 100 - 50)}px`,
    "--y": `${Math.floor(Math.random() * -100)}px`,
  } as React.CSSProperties);

  const handleReact = (type: ReactionType) => {
    // Optimistic UI update
    setLocalReactions((prev) => ({
      ...prev,
      [type]: {
        count: (prev[type]?.count || 0) + 1,
      },
    }));

    // Inside handleReact()
if (!showLottie) {
  setShowLottie(true);
}

    // Emoji burst 🎉
    if (typeof emojiMap[type] === "string") {
      const newParticle = {
        id: Date.now(),
        emoji: emojiMap[type] as string,
        style: generateRandomOffset(),
      };

    
      setParticles((prev) => [...prev, newParticle]);


      // Cleanup after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 700);
    }

    // Backend call
    fetch(`/api/secret/${secretId}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    }).catch((err) => {
      console.error("Reaction failed:", err);
    });

    setOpen(false);
  };

  return (
    <div className={`reaction-pocket ${open ? "active" : ""}`} style={{ position: "relative" }}>
      <button
  className="reactions-btn heart-toggle"
  onClick={() => setOpen((prev) => !prev)}
  aria-label="Toggle reaction menu"
>
  ❤️
</button>


      <FloatingLottie
    animationData={love}
    trigger={showLottie}
    onComplete={() => setShowLottie(false)}
  />

      <div className="reaction-wheel reaction">
        {(Object.keys(emojiMap) as ReactionType[]).map((type, idx) => (
          <button
            key={type}
            className="reaction-btn reaction-option"
            style={{ zIndex: 5 - idx }}
            onClick={() => handleReact(type)}
          >
            {emojiMap[type]}{" "}
            <span className="reaction-count">
              {localReactions[type]?.count || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Emoji Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="emoji-particle"
          style={p.style}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default ReactionHandler;
