import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

const avatarImages = [
  "dog.jpg",
  "carmel.jpg",
  "monkey.jpg",
  "elephant.jpg",
  "bird.jpg",
  "lioness.jpg",
  "cute dog.jpg",
  "girrafe.jpg",
  "sheep.jpg",
];

const AvatarCarousel = ({
  selectedAvatar,
  setSelectedAvatar,
}: {
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (img: string, index: number) => {
    setSelectedAvatar(img);
    scrollToAvatar(index);
  };

  const scrollToAvatar = (index: number) => {
    const el = containerRef.current?.children[index + 1] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  };

  useEffect(() => {
    const index = avatarImages.findIndex((img) => img === selectedAvatar);
    if (index >= 0) scrollToAvatar(index);

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAvatar]);

  const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

  const handleTouchStart = () => {
    if (isTouchDevice()) document.body.style.overflow = "hidden";
  };

  const handleTouchEnd = () => {
    document.body.style.overflow = "";
  };

  return (
    <div className="avatar-selector-wrapper text-center space-y-3">
      <h3 className="text-lg font-medium text-foreground">Choose Your Vibe</h3>
      <div className="relative w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-accent-3 z-10 pointer-events-none avatar-glow" />

        <div
          ref={containerRef}
          className="flex items-center gap-4 overflow-x-auto px-2 py-1 snap-x scroll-smooth no-scrollbar"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div className="shrink-0 w-[calc(50%-40px)]" />

          {avatarImages.map((img, index) => {
            const isActive = selectedAvatar === img;
            return (
              <motion.div
                key={index}
                onClick={() => handleSelect(img, index)}
                whileTap={{ scale: 0.9 }}
                className={classNames(
                  "w-16 h-16 rounded-full overflow-hidden snap-center shrink-0 cursor-pointer border-2 transition-all duration-300 relative",
                  {
                    "border-primary scale-110 z-20 shadow-lg": isActive,
                    "border-zinc-300 opacity-70": !isActive,
                  }
                )}
              >
                <img
                  src={`img/avatars/thumbs/${img}`}
                  alt={`Avatar ${index}`}
                  className={classNames(
                    "w-full h-full object-cover",
                    !isActive && "brightness-75"
                  )}
                />
              </motion.div>
            );
          })}

          <div className="shrink-0 w-[calc(50%-40px)]" />
        </div>
      </div>
    </div>
  );
};

export default AvatarCarousel;
