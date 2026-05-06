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
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <FloatingHearts count={24} />

      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 glass rounded-full p-3 hover:scale-110 transition-transform z-10"
        aria-label="Toggle music"
      >
        {musicOn ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary" />}
      </button>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="uppercase tracking-[0.4em] text-xs text-primary/80">A celebration of you</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight gradient-text text-glow"
        >
          Happy Birthday
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="font-script text-6xl md:text-8xl text-primary text-glow mt-2"
        >
          Surbhi <span className="inline-block animate-pulse">💖</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-6 text-foreground/70 max-w-md mx-auto font-light italic"
        >
          A little cinematic universe, made entirely for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-10"
        >
          <Button
            size="lg"
            onClick={onNext}
            className="rounded-full px-10 py-6 text-lg font-medium shadow-glow bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] hover:scale-105 transition-transform"
          >
            Begin the Magic ✨
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroScene;
