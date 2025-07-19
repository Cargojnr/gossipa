// components/FloatingLottie.tsx
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface FloatingLottieProps {
  animationData: object;
  trigger: boolean;
  onComplete: () => void;
}

export default function FloatingLottie({
  animationData,
  trigger,
  onComplete,
}: FloatingLottieProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1800); // Total visible duration
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <div
      className={`floating-lottie ${visible ? "active" : ""}`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: visible
          ? "translate(-50%, -50%) scale(1)"
          : "translate(-50%, -50%) scale(0)",
        opacity: visible ? 1 : 0,
        zIndex: 9,
        pointerEvents: "none",
        width: 120,
        height: 120,
        transition: "all 0.6s ease-in-out",
      }}
    >
      {visible && <Lottie animationData={animationData} loop={false} />}
    </div>
  );
}
