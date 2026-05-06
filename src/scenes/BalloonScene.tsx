import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";

// 🎨 COLORS
const COLORS = [
  "#e00d42",
  "#e3fb7a",
  "#e644bb",
  "#fb6f92",
  "#ab5c6f",
  "#7d3ea1",
  "#9dbcd7",
  "#4b7543",
];

// 🔊 POP SOUND
const playPop = () => {
  try {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.frequency.setValueAtTime(900, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);

    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    o.connect(g);
    g.connect(ctx.destination);

    o.start();
    o.stop(ctx.currentTime + 0.2);
  } catch {}
};

const BalloonScene = ({ onNext }: SceneProps) => {
  // 🎈 BALLOONS
  const initial = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: 5 + (i * 90) / 10 + (Math.random() * 6 - 3),
        delay: Math.random() * 1.5, // faster spawn
      })),
    []
  );

  const [balloons, setBalloons] = useState(initial);
  const [popping, setPopping] = useState<number[]>([]);

  const allPopped = balloons.length === 0;

  // 🎉 ALL POPPED CONFETTI
  useEffect(() => {
    if (allPopped) {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
      });
    }
  }, [allPopped]);

  // 💥 POP
  const pop = (id: number) => {
    if (popping.includes(id)) return;

    playPop();

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors: ["#ff8fab", "#ffc2d4", "#ffe5ec", "#fb6f92"],
    });

    setPopping((p) => [...p, id]);

    setTimeout(() => {
      setBalloons((b) => b.filter((x) => x.id !== id));
      setPopping((p) => p.filter((x) => x !== id));
    }, 300);
  };

  // 🔁 RESET
  const reset = () => {
    setBalloons(initial);
    setPopping([]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* 💖 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-white to-pink-50" />

      {/* 💬 TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 w-full text-center font-display text-3xl md:text-4xl text-pink-500 z-10"
      >
        Pop the balloons 🎈
      </motion.h2>

      {/* 🎈 BALLOONS */}
      {balloons.map((b) => {
        const isPopping = popping.includes(b.id);

        return (
          <motion.div
            key={b.id}
            initial={{ y: "110%", opacity: 1 }}
            animate={{ y: "-110%", opacity: 1 }}
            transition={{
              duration: 6 + Math.random() * 2,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${b.left}%` }}
            className="absolute bottom-0 cursor-pointer opacity-100"
            onClick={() => pop(b.id)}
          >

            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={
                isPopping
                  ? { scale: 1.8, opacity: 0, rotate: 20 }
                  : {}
              }
              transition={{ duration: 0.25 }}
            >
              <Balloon color={b.color} />
            </motion.div>

          </motion.div>
        );
      })}

      {/* 🎉 ALL POPPED */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20"
        >
          <div className="backdrop-blur-lg bg-white/40 border border-white/50 p-10 rounded-3xl text-center shadow-xl">

            <p className="text-3xl font-script text-pink-500 mb-4">
              You popped them all 💖
            </p>

            <Button
              onClick={reset}
              className="rounded-full px-8 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white mb-4"
            >
              Send More Balloons 💌
            </Button>

            <Button
              onClick={onNext}
              variant="outline"
              className="rounded-full px-8 py-5"
            >
              Continue →
            </Button>

          </div>
        </motion.div>
      )}

      {/* 📝 HINT */}
      <p className="absolute top-4 left-1/2 -translate-x-1/2 text-pink-400 font-script">
        tap them 💕
      </p>
    </div>
  );
};

// 🎈 BALLOON UI
const Balloon = ({ color }: { color: string }) => (
  <div className="relative">

    {/* balloon */}
    <div
      className="w-14 h-16 md:w-16 md:h-20 rounded-full"
      style={{
        background: `radial-gradient(circle at 30% 30%, white, ${color})`,
        boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      }}
    />

    {/* knot */}
    <div
      className="w-0 h-0 mx-auto"
      style={{
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: `8px solid ${color}`,
      }}
    />

    {/* string */}
    <div className="w-px h-16 bg-pink-200 mx-auto" />
  </div>
);

export default BalloonScene;