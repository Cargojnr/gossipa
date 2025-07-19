"use client";

import { useEffect, useState, useRef } from "react";
import SubmitForm from "./SubmitForm";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "text" | "audio";

interface PostSubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: Mode;
    username: string;
    profilePicture: string;
    prefillText?: string;
  }

export default function PostSubmitModal({
    isOpen,
    onClose,
    mode = "text",
    username,
    profilePicture,
    prefillText = "",
} :  PostSubmitModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode>(mode);

  useEffect(() => {
    if (isOpen) setActiveMode(mode);
  }, [mode, isOpen]);

  useEffect(() => {
    setMounted(isOpen);
    setActiveMode(mode);
  }, [isOpen, mode]);

  // Click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Mobile fallback
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    window.location.href = "/submit";
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <AnimatePresence>
        {mounted && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-4 max-w-2xl w-full shadow-lg relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>

            <SubmitForm
              username={username}
              mode={activeMode}
              profilePicture={profilePicture}
              prefillText={prefillText}
              onClose={onClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
