import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneProps } from "./types";

const CakeScene = ({ onNext }: SceneProps) => {
  const [cut, setCut] = useState(false);

  const handleCut = () => {
    if (cut) return;

    setCut(true);

    setTimeout(() => {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff8fab", "#ffc2d4", "#ffe5ec", "#ffffff"],
      });
    }, 600);

    setTimeout(() => onNext(), 2500);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">

      {/* BG */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl sm:text-3xl md:text-5xl gradient-text mb-6 text-center z-10"
      >
        Make a wish 🎂
      </motion.h2>

      {/* CAKE AREA */}
      <div className="relative w-[220px] sm:w-[260px] md:w-[320px] h-[260px] sm:h-[300px] md:h-[340px] z-10">

        {/* 🔪 KNIFE */}
        <motion.div
          initial={{ x: 120, y: -80, rotate: 30, opacity: 0 }}
          animate={cut ? { x: 0, y: 0, rotate: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 -translate-x-1/2 top-0 z-30"
        >
          <div className="w-1.5 h-28 sm:h-36 bg-gradient-to-b from-gray-200 to-gray-400 rounded shadow-lg" />
          <div className="w-5 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded mx-auto -mt-1" />
        </motion.div>

        {/* 🕯️ CANDLE */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20 flex flex-col items-center">
          <AnimatePresence>
            {!cut && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-2 h-4 rounded-full bg-gradient-to-t from-yellow-400 to-orange-200"
                style={{ filter: "drop-shadow(0 0 10px #ffd166)" }}
              />
            )}
          </AnimatePresence>
          <div className="w-1 h-6 bg-pink-200 rounded-full mt-1" />
        </div>

        {/* 🎂 CAKE (3D STYLE) */}
        <motion.div
          animate={cut ? { scale: 0.95 } : { scale: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center"
        >
          <div className="relative">

            {/* TOP LAYER */}
            <div className="w-40 sm:w-48 md:w-56 h-16 sm:h-20 rounded-t-full bg-gradient-to-b from-pink-200 to-pink-300 shadow-inner" />

            {/* CREAM DRIP */}
            <div className="w-40 sm:w-48 md:w-56 h-4 bg-pink-400 relative">
              <div className="absolute w-full h-full"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 60%, 90% 100%, 75% 60%, 60% 100%, 45% 60%, 30% 100%, 15% 60%, 0 100%)",
                }}
              />
            </div>

            {/* MAIN BODY */}
            <div className="w-48 sm:w-56 md:w-64 h-28 sm:h-32 md:h-36 bg-gradient-to-b from-rose-200 to-pink-400 rounded-b-2xl shadow-xl relative">

              {/* decoration dots */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2.5 h-2.5 bg-white rounded-full"
                  style={{
                    top: 20 + i * 20,
                    left: i % 2 === 0 ? 20 : "auto",
                    right: i % 2 !== 0 ? 20 : "auto",
                  }}
                />
              ))}
            </div>

            {/* BASE SHADOW */}
            <div className="w-56 sm:w-64 md:w-72 h-4 bg-black/10 blur-xl rounded-full mx-auto mt-2" />

          </div>
        </motion.div>
      </div>

      {/* BUTTON */}
      {!cut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 z-10"
        >
          <Button
            size="lg"
            onClick={handleCut}
            className="rounded-full px-6 sm:px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:scale-105 transition"
          >
            🔪 Cut the Cake
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CakeScene;
