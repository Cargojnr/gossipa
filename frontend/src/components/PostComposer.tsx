"use client";

import { useState, useRef, useEffect } from "react";
import PostSubmitModal from "./PostSubmitModal";
import type { User } from "@/types/feed";
import {
  FaMicrophone,
  FaCirclePlus,
  FaPenToSquare,
} from "react-icons/fa6";

export default function PostComposer({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"text" | "audio">("text");
  const [prefillText, setPrefillText] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openModal = (prefillMode: "text" | "audio", content = "") => {
    setMode(prefillMode);
    setPrefillText(content);
    setIsOpen(true);
    setTextareaVal(""); // Clear mini composer
  };

  // Animate textarea growth and trigger modal at threshold
  useEffect(() => {
    const el = textareaRef.current;
    if (!el || textareaVal.trim() === "") return; // 🔒 Don't trigger on empty
  
    // Reset and auto-grow
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  
    const heightThreshold = 100; // px
    const charThreshold = 50; // characters
  
    if (el.scrollHeight > heightThreshold || textareaVal.length > charThreshold) {
      openModal("text", textareaVal);
    }
  }, [textareaVal]);
  

  return (
    <>
      <div id="textForm" className="relative space-y-4">
        <textarea
          ref={textareaRef}
          className="w-full p-3 rounded-lg bg-gray-100 text-black resize-none overflow-hidden transition-all duration-200 ease-in-out"
          rows={1}
          placeholder={`Hey, what's on your mind today?`}
          value={textareaVal}
          onChange={(e) => setTextareaVal(e.target.value)}
        />
        <button
          className="submit text-4xl text-violet-600"
          onClick={() => openModal("text", textareaVal)}
        >
          <FaCirclePlus className="absolute right-5 bottom-3" />
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => openModal("text")}>
          <FaPenToSquare /> Text
        </button>
        <button onClick={() => openModal("audio")}>
          <FaMicrophone /> Audio
        </button>
      </div>

      <PostSubmitModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        username={user.username}
        profilePicture={user.profilePicture}
        prefillText={prefillText}
      />
    </>
  );
}
