import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "@/components/Loader";

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
  const [loading, setLoading] = useState(true);
  const [scene, setScene] = useState<SceneId>("hero");
  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ⏳ Loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // 🎵 FIRST USER CLICK MUSIC START (IMPORTANT FIX)
  useEffect(() => {
    const startMusicOnFirstClick = () => {
      const audio = audioRef.current;
      if (!audio || musicOn) return;

      audio.volume = 0.45;
      audio.play().then(() => {
        setMusicOn(true);
      }).catch(() => {});

      window.removeEventListener("click", startMusicOnFirstClick);
    };

    window.addEventListener("click", startMusicOnFirstClick);

    return () => {
      window.removeEventListener("click", startMusicOnFirstClick);
    };
  }, [musicOn]);

  // 🎬 Next Scene
  const next = () => {
    const i = ORDER.indexOf(scene);
    setScene(ORDER[(i + 1) % ORDER.length]);
  };

  // 🎵 Toggle Music (from UI button)
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.play().then(() => setMusicOn(true)).catch(() => {});
    }
  };

  const variants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <>
      {/* 🎵 GLOBAL AUDIO (ONLY ONE AUDIO) */}
      <audio
        ref={audioRef}
        src="/assets/TumhoToh.mp3"
        loop
        preload="auto"
      />

      {loading && <Loader />}

      <main className="fixed inset-0 w-screen h-screen overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.section
            key={scene}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            {scene === "hero" && (
              <HeroScene
                onNext={next}
                musicOn={musicOn}
                toggleMusic={toggleMusic}
              />
            )}

            {scene === "cake" && <CakeScene onNext={next} />}
            {scene === "album" && <AlbumScene onNext={next} />}
            {scene === "balloons" && <BalloonScene onNext={next} />}
            {scene === "gifts" && <GiftsScene onNext={next} />}
            {scene === "message" && <MessageScene onNext={next} />}
            {scene === "final" && (
              <FinalScene onNext={() => setScene("hero")} />
            )}
          </motion.section>
        </AnimatePresence>

        {/* 🎯 Scene dots */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setScene(s)}
              className={`h-1.5 rounded-full transition-all ${
                scene === s ? "w-8 bg-pink-500" : "w-2 bg-pink-300/40"
              }`}
            />
          ))}
        </div>

      </main>
    </>
  );
};

export default Index;