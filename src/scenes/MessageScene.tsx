import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { useState } from "react";
import { SceneProps } from "./types";

const MESSAGE = `🎉💗 Happy Birthday to the cutest girl ever 💗🎉

You’re honestly one of the most special people in my life. Being around you just makes everything feel lighter, happier, and way more fun. Your smile, your vibe, your little silly moments… everything about you is just so adorable 😌💕

I don’t think you even realize how important you are to me. You’re not just my best friend — you’re my favourite person to talk to, tease, and randomly think about and smile like an idiot 🙈💖

I hope your day is filled with love, cake, laughter, and all the happiness you deserve ✨

And just so you know… you’re kinda my favourite person, don’t get too proud about it 😏💘

Happy Birthday again, Surbhi 🎂💞`;

const MessageScene = ({ onNext }: SceneProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 bg-gradient-to-b from-pink-50/40 to-rose-100/30">

      {/* 💖 floating hearts */}
      <FloatingHearts count={10} variant="hearts" />

      {/* ✨ background glow */}
      <div className="absolute w-[550px] h-[550px] bg-pink-300/25 blur-3xl rounded-full animate-pulse" />

      {/* 💌 LETTER CARD */}
      <motion.div
        initial={{ rotateX: 35, scale: 0.85, opacity: 0 }}
        animate={
          opened
            ? { rotateX: 0, scale: 1, opacity: 1 }
            : { rotateX: 20, scale: 0.92, opacity: 1 }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
        onClick={() => setOpened(true)}
        className="relative z-10 w-full max-w-2xl cursor-pointer perspective"
      >

        {/* ✨ glow border */}
        <div className="rounded-3xl p-[2px] bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 shadow-2xl">

          {/* 📜 paper feel */}
          <div className="relative bg-white/75 backdrop-blur-xl rounded-3xl p-10 md:p-14 overflow-hidden text-center">

            {/* soft shine overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent)] opacity-40" />

            {/* 🎀 title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-serif text-pink-500 mb-8 tracking-wide"
            >
              A letter for you 💌
            </motion.h2>

            {/* 💖 LINE BY LINE ANIMATION */}
            <motion.div
              initial="hidden"
              animate={opened ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="relative z-10 text-left"
            >
              {MESSAGE.split("\n").map((line, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
                    show: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  className="text-base md:text-lg leading-loose text-gray-700 mb-3"
                  style={{
                    fontFamily:
                      "ui-serif, Georgia, 'Times New Roman', serif",
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* 🎀 NEXT BUTTON + GLOW */}
            {opened && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-10 relative flex justify-center"
              >
                {/* 🌟 glowing aura behind button */}
                <div className="absolute w-40 h-40 bg-pink-400/30 blur-3xl rounded-full animate-pulse" />

                <Button
                  size="lg"
                  onClick={onNext}
                  className="relative z-10 rounded-full px-10 py-6 shadow-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:scale-105 transition-transform"
                >
                  Forever & Always 💖
                </Button>
              </motion.div>
            )}

          </div>
        </div>

        {/* bottom shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/10 blur-2xl rounded-full" />
      </motion.div>
    </div>
  );
};

export default MessageScene;