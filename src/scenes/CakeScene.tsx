import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { SceneProps } from "./types";

const CakeScene = ({ onNext }: SceneProps) => {
  const [cut, setCut] = useState(false);

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff6fa8", "#ffc0e0", "#ffd700", "#c39bff", "#ffffff"],
      });
    }, 800);
    setTimeout(() => onNext(), 2800);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl gradient-text mb-8 z-10"
      >
        Make a wish, beautiful
      </motion.h2>

      <div className="relative w-[320px] h-[340px] z-10">
        {/* Knife */}
        <motion.div
          initial={{ x: 200, y: -120, rotate: 35, opacity: 0 }}
          animate={cut ? { x: 0, y: 0, rotate: 0, opacity: 1 } : { x: 200, y: -120, rotate: 35, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 z-30"
        >
          <div className="w-2 h-40 bg-gradient-to-b from-gray-200 to-gray-400 rounded shadow-lg" />
          <div className="w-6 h-10 bg-gradient-to-b from-amber-700 to-amber-900 rounded mx-auto -mt-1" />
        </motion.div>

        {/* Candle + flame */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20 flex flex-col items-center">
          <AnimatePresence>
            {!cut && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-400 to-yellow-200"
                style={{ filter: "drop-shadow(0 0 16px hsl(45 100% 70%))" }}
              />
            )}
          </AnimatePresence>
          <div className="w-1.5 h-8 bg-pink-200 rounded-full mt-1" />
        </div>

        {/* Cake left half */}
        <motion.div
          animate={cut ? { x: -60, rotate: -8 } : { x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="absolute left-0 top-12 w-1/2 h-[270px] origin-right z-10"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <CakeHalf side="left" />
        </motion.div>
        <motion.div
          animate={cut ? { x: 60, rotate: 8 } : { x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="absolute right-0 top-12 w-1/2 h-[270px] origin-left z-10"
        >
          <CakeHalf side="right" />
        </motion.div>

        {/* Plate */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[360px] h-6 rounded-full bg-white/60 blur-sm" />
      </div>

      {!cut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 z-10"
        >
          <Button
            size="lg"
            onClick={handleCut}
            className="rounded-full px-10 py-6 text-lg shadow-glow bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] hover:scale-105 transition-transform"
          >
            🔪 Cut the Cake
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const CakeHalf = ({ side }: { side: "left" | "right" }) => (
  <div className="relative w-full h-full">
    {/* Top tier */}
    <div className={`absolute top-0 ${side === "left" ? "right-0" : "left-0"} w-[140px] h-[80px]`} style={{
      background: "linear-gradient(180deg, hsl(340 80% 92%), hsl(340 70% 80%))",
      borderTopLeftRadius: side === "left" ? 70 : 0,
      borderTopRightRadius: side === "right" ? 70 : 0,
      boxShadow: "inset 0 -8px 0 hsl(340 60% 70%)",
    }} />
    {/* Middle drip */}
    <div className={`absolute top-[78px] ${side === "left" ? "right-0" : "left-0"} w-[140px] h-3`} style={{
      background: "hsl(340 90% 75%)",
      clipPath: side === "left"
        ? "polygon(0 0, 100% 0, 100% 100%, 90% 60%, 75% 100%, 60% 50%, 45% 100%, 30% 60%, 15% 100%, 0 50%)"
        : "polygon(0 0, 100% 0, 100% 50%, 85% 100%, 70% 60%, 55% 100%, 40% 50%, 25% 100%, 10% 60%, 0 100%)",
    }} />
    {/* Bottom tier */}
    <div className={`absolute top-[88px] ${side === "left" ? "right-0" : "left-0"} w-[170px] h-[180px]`} style={{
      background: "linear-gradient(180deg, hsl(30 80% 90%), hsl(20 60% 75%))",
      borderBottomLeftRadius: side === "left" ? 16 : 0,
      borderBottomRightRadius: side === "right" ? 16 : 0,
    }} />
    {/* Decoration dots */}
    {[0, 1, 2].map((i) => (
      <div key={i} className={`absolute w-3 h-3 rounded-full bg-white/90`} style={{
        top: 110 + i * 40,
        [side === "left" ? "right" : "left"]: 20 + (i % 2) * 30,
        boxShadow: "0 0 8px hsl(340 100% 80%)",
      }} />
    ))}
  </div>
);

export default CakeScene;
