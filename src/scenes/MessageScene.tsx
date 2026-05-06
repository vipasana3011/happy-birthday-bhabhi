import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { useState } from "react";
import { SceneProps } from "./types";

const MESSAGE = `🎉💗 Happy Birthday to the cutest girl ever 💗🎉

You’re honestly one of the most special people in my life. Being around you just makes everything feel lighter, happier, and way more fun. Your smile, your vibe, your little silly moments… everything about you is just so adorable 😌💕

I don’t think you even realize how important you are to me. You’re not just my best friend — you’re my favourite person to talk to, tease, and randomly think about and smile like an idiot 🙈💖

I hope your day is filled with love, cake, laughter, and all the happiness you deserve ✨

And just so you know… you’re kinda my favourite person, don’t get too proud about it 😏💘 And You are "TUM HO TOH SAB ACCHA HAI" Person in my life.

Happy Birthday again, Surbhi 🎂💞`;

const MessageScene = ({ onNext }: SceneProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-8 bg-gradient-to-b from-pink-50/40 to-rose-100/30">

      {/* 💖 floating hearts */}
      <FloatingHearts count={8} variant="hearts" />

      {/* ✨ background glow */}
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-pink-300/25 blur-3xl rounded-full animate-pulse" />

      {/* 💌 LETTER CARD */}
      <motion.div
        initial={{ rotateX: 20, scale: 0.9, opacity: 0 }}
        animate={
          opened
            ? { rotateX: 0, scale: 1, opacity: 1 }
            : { rotateX: 10, scale: 0.95, opacity: 1 }
        }
        transition={{ duration: 0.8 }}
        onClick={() => setOpened(true)}
        className="relative z-10 w-full max-w-lg cursor-pointer"
      >

        <div className="rounded-2xl p-[2px] bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 shadow-xl">

          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-5 sm:p-8 overflow-hidden">

            {/* shine */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent)] opacity-40" />

            {/* title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-center text-pink-500 mb-5"
            >
              A letter for you 💌
            </motion.h2>

            {/* message */}
            <motion.div
              initial="hidden"
              animate={opened ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="text-left"
            >
              {MESSAGE.split("\n").map((line, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 mb-3"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* ✅ FIXED BUTTON (ALWAYS VISIBLE) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 flex justify-center"
            >
              <Button
                size="lg"
                onClick={onNext}
                className="rounded-full px-6 sm:px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg"
              >
                Continue 💖
              </Button>
            </motion.div>

          </div>
        </div>

        {/* shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-full" />
      </motion.div>
    </div>
  );
};

export default MessageScene;
