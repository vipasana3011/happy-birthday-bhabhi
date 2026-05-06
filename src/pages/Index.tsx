import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroScene from "@/scenes/HeroScene";
import CakeScene from "@/scenes/CakeScene";
import AlbumScene from "@/scenes/AlbumScene";
import BalloonScene from "@/scenes/BalloonScene";
import GiftsScene from "@/scenes/GiftsScene";
import MessageScene from "@/scenes/MessageScene";
import FinalScene from "@/scenes/FinalScene";

import { SceneId } from "@/scenes/types";

const ORDER: SceneId[] = [
  "hero",
  "cake",
  "album",
  "balloons",
  "gifts",
  "message",
  "final",
];

const Index = () => {
  const [scene, setScene] = useState<SceneId>("hero");

  // 🎬 NEXT SCENE
  const next = () => {
    const index = ORDER.indexOf(scene);
    const nextScene = ORDER[index + 1] || "final";
    console.log("➡️ SCENE CHANGED:", nextScene);
    setScene(nextScene);
  };

  // 🔁 RESET TO START
  const reset = () => {
    setScene("hero");
  };

  const variants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.section
          key={scene}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >

          {scene === "hero" && (
            <HeroScene onNext={next} />
          )}

          {scene === "cake" && (
            <CakeScene onNext={next} />
          )}

          {scene === "album" && (
            <AlbumScene onNext={next} />
          )}

          {scene === "balloons" && (
            <BalloonScene onNext={next} />
          )}

          {scene === "gifts" && (
            <GiftsScene onNext={next} />
          )}

          {scene === "message" && (
            <MessageScene onNext={next} />
          )}

          {scene === "final" && (
            <FinalScene onNext={reset} />
          )}

        </motion.section>
      </AnimatePresence>

    </main>
  );
};

export default Index;
