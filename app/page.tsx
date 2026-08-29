"use client";

import { useEffect, useRef, useState } from "react";
import PixelLetter from "./PixelLetter";
import Character from "./Character";
import { letters } from "./letters";
import VoiceToText from "./VoiceToText";
import { RotateCcw, Sparkles } from "lucide-react";

const ORBIT_SPIN_TIME = 3;
const ORBIT_HOLD_MS = 3000;
const WAIT_AFTER_SHOW_MS = 500;
const DEBOUNCE_MS = 500;

export default function Home() {
  const [name, setName] = useState("");
  const [committedName, setCommittedName] = useState("");
  const [phase, setPhase] = useState<"idle" | "orbiting" | "greeting">("idle");
  const [isTalking, setIsTalking] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(110);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showVoice, setShowVoice] = useState(false);

  useEffect(() => {
    if (phase === "greeting") {
      const timer = setTimeout(() => {
        setShowVoice(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowVoice(false);
    }
  }, [phase]);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 400) setOrbitRadius(55);
      else if (width < 640) setOrbitRadius(70);
      else if (width < 1024) setOrbitRadius(90);
      else setOrbitRadius(110);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setCommittedName(name);
      setReplayKey((k) => k + 1);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [name]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
    setIsTalking(false);

    if (!committedName.trim()) return;

    const chars = committedName.toUpperCase().split("");
    let maxFinishTime = 0;
    chars.forEach((char, index) => {
      const pattern = letters[char as keyof typeof letters];
      if (!pattern) return;
      const pixelsPerLetter = pattern.length * pattern[0].length;
      const letterStartDelay = index * pixelsPerLetter * 60;
      const finishTime = letterStartDelay + pixelsPerLetter * 60 + 300;
      if (finishTime > maxFinishTime) maxFinishTime = finishTime;
    });

    const startOrbit = setTimeout(() => {
      setPhase("orbiting");

      const stopOrbit = setTimeout(() => {
        setPhase("greeting");
        speakName(committedName);
      }, ORBIT_HOLD_MS);

      timers.current.push(stopOrbit);
    }, maxFinishTime + WAIT_AFTER_SHOW_MS);

    timers.current.push(startOrbit);
    return () => timers.current.forEach(clearTimeout);
  }, [committedName, replayKey]);

  const speakName = (nameToSpeak: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(`Hello, ${nameToSpeak}! kemon achen`);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsTalking(true);
    utterance.onend = () => setIsTalking(false);
    utterance.onerror = () => setIsTalking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleReplay = () => setReplayKey((k) => k + 1);

  const chars = committedName.toUpperCase().split("");
  const visibleChars = chars.filter(
    (c) => c !== " " && letters[c as keyof typeof letters]
  );
  const total = visibleChars.length;
  let visibleIndex = -1;

  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start gap-8 px-4 py-10 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title Header */}
      <div className="flex items-center gap-2 z-10">
        <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 drop-shadow-sm">
          NameArt AI
        </h1>
      </div>

      {/* Input Control Box */}
      <div className="z-10 flex items-center gap-3 w-full max-w-md p-2 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-xl">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন ইংরেজিতে..."
          className="flex-1 px-4 py-3 rounded-xl text-white bg-slate-950/60 border border-slate-800 outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500 text-sm sm:text-base font-medium"
        />

        {committedName.trim() && (
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 text-xs sm:text-sm whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>
        )}
      </div>

      {/* Pixel Art Rendering Area */}
      <div className="z-10 flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center items-center min-h-[140px] sm:min-h-[160px] max-w-full my-4">
        {chars.map((char, index) => {
          if (char === " ") {
            return <div key={`space-${index}`} className="w-3 sm:w-4 md:w-6" />;
          }

          const pattern = letters[char as keyof typeof letters];
          if (!pattern) return null;

          visibleIndex++;
          const angle = total > 0 ? (360 / total) * visibleIndex : 0;
          const pixelsPerLetter = pattern.length * pattern[0].length;
          const letterDelay = index * pixelsPerLetter * 60;

          return (
            <div
              key={`${char}-${index}-${replayKey}`}
              className={
                phase === "orbiting"
                  ? "animate-orbit"
                  : "transition-transform duration-700 ease-in-out"
              }
              style={
                phase === "orbiting"
                  ? ({
                    "--start-angle": `${angle}deg`,
                    "--orbit-radius": `${orbitRadius}px`,
                    animationDuration: `${ORBIT_SPIN_TIME}s`,
                  } as React.CSSProperties)
                  : { transform: "none" }
              }
            >
              <PixelLetter pattern={pattern} baseDelay={letterDelay} />
            </div>
          );
        })}
      </div>

      {/* Greeting Character Box */}
      {phase === "greeting" && (
        <div className="z-10 flex flex-col items-center gap-3 animate-character-in my-2">
          <div className="relative bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 px-5 py-2.5 rounded-2xl rounded-bl-none text-sm sm:text-base font-bold shadow-xl border border-white/20">
            Hello, {committedName}! 👋
          </div>
          <Character isTalking={isTalking} />
        </div>
      )}

      {/* Voice Assistant Area */}
      {showVoice && (
        <div className="z-10 w-full max-w-2xl transition-all duration-700 ease-out transform translate-y-0 opacity-100">
          <VoiceToText />
        </div>
      )}
    </main>
  );
}