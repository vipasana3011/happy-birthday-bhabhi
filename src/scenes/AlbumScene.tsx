import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { SceneProps } from "./types";

// ✅ DATA
const photos = [
  { caption: "the prettiest soul 💕", img: "/assets/pic1.jpg" },
  { caption: "my favorite person", img: "/assets/pic2.jpg" },
  { caption: "my sunshine ☀️", img: "/assets/pic3.jpg" },
  { caption: "pure happiness", img: "/assets/pic4.jpg" },
  { caption: "my comfort place", img: "/assets/pic5.jpg" },
  { caption: "my forever girl 💖", img: "/assets/pic6.jpg" },
];

// 💎 POLAROID CARD
const Polaroid = ({ photo, index }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const baseRot = ((index * 13) % 16) - 8;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;

    const r = ref.current?.getBoundingClientRect();
    if (!r) return;

    const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -20;

    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 60, rotate: baseRot }}
      animate={{ opacity: 1, y: 0, rotate: baseRot }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
      whileHover={!isMobile ? { scale: 1.08, zIndex: 30 } : {}}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(${baseRot}deg)`
      }}
      className="bg-white p-2 sm:p-3 pb-8 sm:pb-10 rounded-md shadow-lg sm:shadow-xl cursor-pointer relative transition-all duration-200"
    >
      {/* IMAGE */}
      <div className="w-28 h-36 sm:w-36 sm:h-44 md:w-48 md:h-56 rounded-sm overflow-hidden">
        <img
          src={photo.img}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CAPTION */}
      <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 text-center text-sm sm:text-base md:text-lg text-pink-500">
        {photo.caption}
      </div>
    </motion.div>
  );
};

// 💎 MAIN SCENE
const AlbumScene = ({ onNext }: SceneProps) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10">

      {/* 💖 HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-5xl gradient-text mb-6 md:mb-10 text-center"
      >
        💖 My Girl 💖
      </motion.h2>

      {/* 🌸 POLAROID GRID */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-5xl">
        {photos.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* 🚀 NEXT BUTTON */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 md:mt-12"
      >
        <Button
          size="lg"
          onClick={onNext}
          className="rounded-full px-6 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:scale-105 transition-transform"
        >
          Continue 🎈
        </Button>
      </motion.div>
    </div>
  );
};

export default AlbumScene;
