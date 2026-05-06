import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { SceneProps } from "./types";

interface Props extends SceneProps {
  musicOn: boolean;
  toggleMusic: () => void;
}

const HeroScene = ({ onNext, musicOn, toggleMusic }: Props) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-10">

      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <FloatingHearts count={12} />

      {/* 🔊 music btn */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 glass rounded-full p-2 z-20"
      >
        {musicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <div className="relative z-10 text-center w-full max-w-md">

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-display gradient-text"
        >
          Happy Birthday
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl sm:text-6xl mt-2 font-script text-pink-500"
        >
          Surbhi 💖
        </motion.div>

        <p className="mt-4 text-sm sm:text-base text-gray-600">
          A little surprise made just for you ✨
        </p>

        <div className="mt-8">
          <Button
            onClick={onNext}
            className="rounded-full px-6 py-4 text-sm sm:text-base"
          >
            Begin ✨
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HeroScene;
