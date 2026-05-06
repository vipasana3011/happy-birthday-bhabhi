import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { useState } from "react";
import { SceneProps } from "./types";

const MESSAGE = `🎉💗 Happy Birthday to the cutest girl ever 💗🎉

You’re honestly one of the most special people in my life. Being around you just makes everything feel lighter, happier, and way more fun.

Your smile, your vibe, your little silly moments… everything about you is just so adorable 😌💕

I hope your day is filled with love, cake, laughter, and all the happiness you deserve ✨

Happy Birthday again, Surbhi 🎂💞`;

const MessageScene = ({ onNext }: SceneProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-pink-50/40 to-rose-100/30 overflow-hidden">

      <FloatingHearts count={8} variant="hearts" />

      {/* glow */}
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-pink-300/25 blur-3xl rounded-full animate-pulse" />

      {/* card */}
      <div
        className="relative z-10 w-full max-w-lg"
        onClick={() => setOpened(true)}
      >

        <div className="rounded-2xl p-[2px] bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 shadow-xl">

          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-5 sm:p-8 overflow-hidden">

            <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-pink-500 mb-5">
              A letter for you 💌
            </h2>

            {/* message */}
            <div className="text-left">
              {MESSAGE.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 mb-3"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* BUTTON (100% WORKING) */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("🔥 NEXT CLICKED");
                  onNext();
                }}
                className="rounded-full px-6 sm:px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:scale-105"
              >
                Continue 💖
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageScene;
