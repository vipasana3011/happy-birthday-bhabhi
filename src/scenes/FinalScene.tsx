import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";

const FinalScene = ({ onNext }: SceneProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <FloatingHearts count={32} />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-7xl md:text-9xl gradient-text text-glow"
        >
          Forever & Always
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="text-6xl mt-6"
        >
          💖
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-foreground/70 italic"
        >
          Made by Gautam with all the love, just for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            onClick={onNext}
            className="rounded-full px-8 glass border-white/50"
          >
            Replay the magic ✨
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalScene;
