"use client";

import { useEffect, useRef, useState } from "react";
import { useWaveformVisualizer } from "./hooks/useWaveformVisualizer"; // Adjust path
import {
    FaMicrophone,
    FaCirclePlus,
    FaPenToSquare,
    FaEarthAfrica,
    FaCheck,
  } from "react-icons/fa6"; // Using Font Awesome 6 icons
  



type Visibility = "public" | "exclusive" | "private";
type Mode = "text" | "audio";

interface SubmitFormProps {
  username: string;
  profilePicture: string;
  mode: Mode;
  onClose?: () => void;
  prefillText?: string;
}

export default function SubmitForm({
  username,
  profilePicture,
  mode,
  onClose,
  prefillText = "",
}: SubmitFormProps) {
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [secret, setSecret] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode>(mode);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const waveformRef = useWaveformVisualizer(micStream, isRecording);

  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

// Auto-focus on mount
useEffect(() => {
  if (activeMode === "text" && textAreaRef.current) {
    textAreaRef.current.focus();
    // Move cursor to end of prefilled text
    const val = textAreaRef.current.value;
    textAreaRef.current.setSelectionRange(val.length, val.length);
  }
}, [activeMode]);


  const visibilityMap: Record<Visibility, string> = {
    public: "For All",
    exclusive: "For Chiefs",
    private: "For Myself Only",
  };

  // Restore prefilled text or local draft
  
  useEffect(() => {
    const saved = localStorage.getItem("gossipa_draft");
    if (prefillText) {
      setSecret(prefillText);
    } else if (saved) {
      setSecret(saved);
    }
  }, [prefillText]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("gossipa_draft", secret);
  }, [secret]);

  const handleDropdownClick = (val: Visibility) => {
    setVisibility(val);
    setDropdownOpen(false);
  };

  const startRecording = async () => {
    if (isRecording) return;
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream); // 👈 Needed for waveform visualizer
  
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
  
      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
  
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
  
        // 🚫 Cleanup microphone stream after stopping
        stream.getTracks().forEach((track) => track.stop());
        setMicStream(null);
      };
  
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied or error:", err);
      alert("Please allow microphone access.");
    }
  };
  

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const submitText = async () => {
    if (!secret.trim()) return alert("Say something first!");

    const res = await fetch("/api//share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        category: visibility,
        contentType: "text",
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Secret shared successfully!");
      setSecret("");
      localStorage.removeItem("gossipa_draft");
      onClose?.();
    } else {
      alert("Failed to share.");
    }
  };

  const submitAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "voice-note.wav");
    formData.append("category", visibility);
    formData.append("contentType", "audio");

    const res = await fetch("/api/share", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Audio shared!");
      setAudioBlob(null);
      setAudioUrl(null);
      onClose?.();
    } else {
      alert("Failed to share audio.");
    }
  };

  return (
    <div className="form-wrapper p-4 max-w-xl mx-auto">
      <div className="form-wrap space-y-6">
        <div className="user-details flex items-center justify-between">
          <div className="avatar-profile">
            <img
              src={profilePicture}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2"
            >
             <FaEarthAfrica />

              <span>{visibilityMap[visibility]}</span>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-options absolute bg-white dark:bg-zinc-800 mt-2 rounded-md shadow-md p-2 z-10">
                {(["public", "exclusive", "private"] as Visibility[]).map(
                  (val) => (
                    <li
                      key={val}
                      onClick={() => handleDropdownClick(val)}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                        val === visibility ? "font-bold" : ""
                      }`}
                    >
                      <FaCheck className={`mr-2 ${val === visibility ? "" : "invisible"}`} />

                      {visibilityMap[val]}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        {activeMode === "text" ? (
          <div id="textForm" className="space-y-4">
            {prefillText && activeMode === "text" && (
  <p className="text-sm font-medium bg-gradient-to-r from-violet-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent mb-2 text-center">
    Continue where you left off ✍️
  </p>
)}

            <textarea
            ref={textAreaRef}
              className="w-full p-3 rounded-lg bg-gray-100 text-black"
              rows={4}
              placeholder={`Hey ${username}, what's on your mind today?`}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
           <button onClick={submitText} className="submit text-xl text-violet-600">
  <FaCirclePlus />
</button>

          </div>
        ) : (
          <div id="audioForm">
            <div
              id="recordContainer"
              className="rounded-xl p-6 text-center mt-6"
            >
              <h1 className="text-lg mb-3">Record a Voice Note</h1>
              <button
                className={`mic-button ${isRecording ? "recording" : ""}`}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
              >
                <FaMicrophone />

              </button>

              <canvas
  ref={waveformRef}
  width={400}
  height={100}
  className="mt-4 w-full bg-zinc-100 rounded-lg"
/>


              {audioUrl && (
                <>
                  <audio
                    ref={audioRef}
                    controls
                    src={audioUrl}
                    className="mt-4 w-full"
                  />
                  <div id="actionButtons" className="mt-4 flex gap-4 justify-end">
                    <button
                      onClick={() => {
                        setAudioBlob(null);
                        setAudioUrl(null);
                      }}
                      className="text-sm text-red-500"
                    >
                      Discard
                    </button>
                    <button
                      onClick={submitAudio}
                      className="text-sm text-green-600"
                    >
                      Share
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="actions flex justify-between pt-4">
          <button onClick={() => setActiveMode("text")}>
          <FaPenToSquare />
          </button>
          <button onClick={() => setActiveMode("audio")}>
          <FaMicrophone />
          </button>
        </div>
      </div>
    </div>
  );
}
