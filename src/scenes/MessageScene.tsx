import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { useState } from "react";
import { SceneProps } from "./types";

const MESSAGE = `🎉💗 Happy Birthday to the cutest girl ever 💗🎉

You’re honestly one of the most special people in my life.
Being around you makes everything softer, happier & magical ✨

Your smile, your vibe, your silly moments…
everything feels like a warm dream 💕🌸

I hope your day is full of love, cake, laughter & endless happiness.

And just so you know…
you’re my favorite person 😏💘

Happy Birthday again, Surbhi 🎂💞`;

const MessageScene = ({ onNext }: SceneProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200">

      {/* 💖 floating hearts */}
      <FloatingHearts count={14} variant="hearts" />

      {/* ✨ glowing orbs */}
      <div className="absolute w-80 h-80 bg-pink-300/30 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-80 h-80 bg-rose-300/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* ✨ shimmer overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.4),transparent_70%)] animate-pulse opacity-40" />

      {/* card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: 25 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        onClick={() => setOpened(true)}
        className="relative z-10 w-full max-w-lg cursor-pointer"
      >

        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 shadow-[0_0_40px_rgba(255,105,180,0.4)]">

          <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 overflow-hidden">

            {/* ✨ shimmer top highlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent)] opacity-60" />

            {/* title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center text-2xl sm:text-3xl font-semibold text-pink-500 mb-5 tracking-wide"
              style={{ fontFamily: "cursive" }}
            >
              💌 A Letter For You
            </motion.h2>

            {/* message */}
            <motion.div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {MESSAGE.split("\n").map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={opened ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="text-sm sm:text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: "ui-serif, Georgia" }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* tap hint */}
            {!opened && (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-center text-xs text-gray-400 mt-4"
              >
                ✨ Tap to open the letter
              </motion.p>
            )}

            {/* button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={opened ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 flex justify-center"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="rounded-full px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 text-white shadow-[0_0_25px_rgba(255,105,180,0.5)] hover:scale-110 transition-transform"
              >
                Continue 💖
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageScene;
