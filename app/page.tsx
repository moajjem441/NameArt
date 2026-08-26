"use client";

import { useEffect, useRef, useState } from "react";
import PixelLetter from "./PixelLetter";
import { letters } from "./letters";

const ORBIT_SPIN_TIME = 3;
const ORBIT_HOLD_MS = 3000;
const WAIT_AFTER_SHOW_MS = 1500;
const DEBOUNCE_MS = 500;

export default function Home() {
  const [name, setName] = useState("");
  const [committedName, setCommittedName] = useState("");
  const [phase, setPhase] = useState<"idle" | "orbiting">("idle");
  const [replayKey, setReplayKey] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(110);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Screen size onujayi orbit radius adjust
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
      const stopOrbit = setTimeout(() => setPhase("idle"), ORBIT_HOLD_MS);
      timers.current.push(stopOrbit);
    }, maxFinishTime + WAIT_AFTER_SHOW_MS);

    timers.current.push(startOrbit);
    return () => timers.current.forEach(clearTimeout);
  }, [committedName, replayKey]);

  const handleReplay = () => setReplayKey((k) => k + 1);

  const chars = committedName.toUpperCase().split("");
  const visibleChars = chars.filter(
    (c) => c !== " " && letters[c as keyof typeof letters]
  );
  const total = visibleChars.length;
  let visibleIndex = -1;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 sm:gap-8 px-3 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-center">
        NameArt
      </h1>

      <div className="flex items-center gap-2 sm:gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-black bg-orange-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow text-sm sm:text-base"
        />

        {committedName.trim() && (
          <button
            onClick={handleReplay}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            ↻ Replay
          </button>
        )}
      </div>

      <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center items-center min-h-[100px] sm:min-h-[130px] md:min-h-[150px] max-w-full">
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
    </main>
  );
}