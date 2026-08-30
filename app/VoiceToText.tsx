// "use client";

// import { useState } from "react";
// import { Mic, MicOff, Bot, User, Sparkles, Loader2 } from "lucide-react";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// export default function VoiceToText() {
//   const [text, setText] = useState("");
//   const [status, setStatus] = useState("প্রস্তুত");
//   const [reply, setReply] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const startListening = () => {
//     if (isListening || loading) return;

//     setStatus("শুরু হচ্ছে...");
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setStatus("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "bn-BD";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onresult = async (event: any) => {
//       try {
//         const result = event.results[0][0].transcript;
//         setText(result);
//         setLoading(true);
//         setStatus("AI উত্তর তৈরি করছে...");

//         const response = await fetch("/api/aichat", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: result }),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           setStatus("দুঃখিত, AI উত্তর দিতে পারেনি");
//           return;
//         }

//         setReply(data.reply);
//         setStatus("উত্তর প্রস্তুত ✅");
//       } catch (error) {
//         setStatus("দুঃখিত, একটি সমস্যা হয়েছে");
//       } finally {
//         setLoading(false);
//       }
//     };

//     recognition.onstart = () => {
//       setIsListening(true);
//       setStatus("🎤 শুনছি...");
//     };

//     recognition.onerror = (event: any) => {
//       if (event.error === "not-allowed") setStatus("মাইক্রোফোন অনুমতি দিন");
//       else if (event.error === "no-speech") setStatus("কোনো কথা শোনা যায়নি");
//       else setStatus("ভয়েস শনাক্তে সমস্যা হয়েছে");
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       if (!loading) setStatus("আবার কথা বলতে বাটনে চাপ দিন");
//     };

//     try {
//       recognition.start();
//     } catch (error) {
//       setIsListening(false);
//       setStatus("মাইক্রোফোন চালু করা যায়নি");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
//       {/* Background Radial Gradient */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />

//       <div className="relative w-full max-w-xl">
//         {/* Main Card with Glassmorphism */}
//         <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
//           {/* Header */}
//           <div className="flex flex-col items-center text-center">
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
//               <Bot className="h-8 w-8 text-white" />
//             </div>
//             <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//               বাংলা <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI সহকারী</span>
//             </h1>
//             <p className="mt-1 text-sm text-slate-400">
//               কথা বলুন, AI আপনার উত্তর প্রস্তুত করবে
//             </p>
//           </div>

//           {/* Dynamic Voice Button */}
//           <div className="my-8 flex flex-col items-center justify-center">
//             <div className="relative flex items-center justify-center">
//               {/* Glowing Pulse Animation during Listening */}
//               {isListening && (
//                 <span className="absolute inline-flex h-36 w-36 animate-ping rounded-full bg-red-500/30 opacity-75" />
//               )}
              
//               <button
//                 onClick={startListening}
//                 disabled={isListening || loading}
//                 className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
//                   isListening
//                     ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/50 scale-105"
//                     : loading
//                     ? "bg-slate-800 border border-slate-700 opacity-80 cursor-not-allowed"
//                     : "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
//                 }`}
//               >
//                 {loading ? (
//                   <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
//                 ) : isListening ? (
//                   <MicOff className="h-10 w-10 text-white animate-bounce" />
//                 ) : (
//                   <Mic className="h-10 w-10 text-white" />
//                 )}
//               </button>
//             </div>

//             {/* Status Message */}
//             <div className="mt-4 flex items-center gap-2">
//               <span className={`h-2 w-2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : loading ? "bg-amber-400" : "bg-emerald-400"}`} />
//               <p className="text-sm font-medium text-slate-300">{status}</p>
//             </div>
//           </div>

//           {/* Conversation Area */}
//           <div className="space-y-4">
//             {/* User Input Block */}
//             {text && (
//               <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 backdrop-blur-sm">
//                 <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-indigo-400">
//                   <User className="h-4 w-4" />
//                   <span>আপনি বলেছেন</span>
//                 </div>
//                 <p className="text-sm leading-relaxed text-slate-200">{text}</p>
//               </div>
//             )}

//             {/* AI Response Block */}
//             {reply && (
//               <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 backdrop-blur-sm">
//                 <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-purple-400">
//                   <Sparkles className="h-4 w-4" />
//                   <span>AI উত্তর</span>
//                 </div>
//                 <p className="text-sm leading-relaxed text-slate-200">{reply}</p>
//               </div>
//             )}
//           </div>

//           {/* Footer Info */}
//           <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
//             <p className="text-xs text-slate-500">
//               আপনার কণ্ঠেই চলবে কথা • এআই দেবে বুদ্ধিমত্তা
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }











"use client";

import { useState } from "react";
import { Mic, MicOff, Bot, User, Sparkles, Loader2 } from "lucide-react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceToText() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("প্রস্তুত");
  const [reply, setReply] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  // ১. অডিও আনলক করার জন্য হেল্পার
  const unlockAudioContext = () => {
    if (typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") {
          ctx.resume();
        }
      }
    }
  };

  // ২. মোবাইলে ১০০% কাজ করার উপযোগী সাউন্ড প্লেয়ার (Google TTS + Native Fallback)
  const speakText = (speechText: string) => {
    if (!speechText) return;

    // Google Free TTS URL (Bengali)
    const encodedText = encodeURIComponent(speechText);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=bn&client=tw-ob`;

    const audio = new Audio(audioUrl);

    audio.play().catch(() => {
      // গুগল আটকে দিলে বা নেটওয়ার্ক ধীরগতির হলে ব্রাউজারের নেটিভ SpeechSynthesis ট্রাই করবে
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = "bn-BD";
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const startListening = () => {
    if (isListening || loading) return;

    // বাটনে ট্যাপ করা মাত্রই মোবাইলের অডিও লক আনলক করা
    unlockAudioContext();

    setStatus("শুরু হচ্ছে...");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      try {
        const result = event.results[0][0].transcript;
        setText(result);
        setLoading(true);
        setStatus("AI উত্তর তৈরি করছে...");

        const response = await fetch("/api/aichat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: result }),
        });

        const data = await response.json();
        if (!response.ok) {
          setStatus("দুঃখিত, AI উত্তর দিতে পারেনি");
          return;
        }

        const aiReply = data.reply;
        setReply(aiReply);
        setStatus("উত্তর প্রস্তুত ✅");

        // AI উত্তর পাওয়ার পর সাউন্ড প্লে করা
        speakText(aiReply);

      } catch (error) {
        setStatus("দুঃখিত, একটি সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("🎤 শুনছি...");
    };

    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") setStatus("মাইক্রোফোন অনুমতি দিন");
      else if (event.error === "no-speech") setStatus("কোনো কথা শোনা যায়নি");
      else setStatus("ভয়েস শনাক্তে সমস্যা হয়েছে");
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!loading) setStatus("আবার কথা বলতে বাটনে চাপ দিন");
    };

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      setStatus("মাইক্রোফোন চালু করা যায়নি");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />

      <div className="relative w-full max-w-xl">
        {/* Main Card with Glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              বাংলা <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI সহকারী</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              কথা বলুন, AI আপনার উত্তর প্রস্তুত করবে
            </p>
          </div>

          {/* Dynamic Voice Button */}
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Glowing Pulse Animation during Listening */}
              {isListening && (
                <span className="absolute inline-flex h-36 w-36 animate-ping rounded-full bg-red-500/30 opacity-75" />
              )}
              
              <button
                onClick={startListening}
                disabled={isListening || loading}
                className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
                  isListening
                    ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/50 scale-105"
                    : loading
                    ? "bg-slate-800 border border-slate-700 opacity-80 cursor-not-allowed"
                    : "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
                }`}
              >
                {loading ? (
                  <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
                ) : isListening ? (
                  <MicOff className="h-10 w-10 text-white animate-bounce" />
                ) : (
                  <Mic className="h-10 w-10 text-white" />
                )}
              </button>
            </div>

            {/* Status Message */}
            <div className="mt-4 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : loading ? "bg-amber-400" : "bg-emerald-400"}`} />
              <p className="text-sm font-medium text-slate-300">{status}</p>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="space-y-4">
            {/* User Input Block */}
            {text && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 backdrop-blur-sm">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <User className="h-4 w-4" />
                  <span>আপনি বলেছেন</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{text}</p>
              </div>
            )}

            {/* AI Response Block */}
            {reply && (
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 backdrop-blur-sm">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-purple-400">
                  <Sparkles className="h-4 w-4" />
                  <span>AI উত্তর</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{reply}</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-500">
              আপনার কণ্ঠেই চলবে কথা • এআই দেবে বুদ্ধিমত্তা
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}