import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";
import { useRef, useState } from "react";

// DATA
const photos = [
  { caption: "the prettiest soul 💕", img: "/assets/pic1.jpg" },
  { caption: "my favorite person", img: "/assets/pic2.jpg" },
  { caption: "my sunshine ☀️", img: "/assets/pic3.jpg" },
  { caption: "pure happiness", img: "/assets/pic4.jpg" },
  { caption: "my comfort place", img: "/assets/pic5.jpg" },
  { caption: "my forever girl 💖", img: "/assets/pic6.jpg" },
];

// 💎 PREMIUM POLAROID
const Polaroid = ({ photo, index }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ scale: 1.08, zIndex: 20 }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
      className="relative bg-white p-2 pb-6 rounded-xl shadow-xl transition-all duration-300
                 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px]"
    >
      {/* ✨ glow */}
      <div className="absolute inset-0 rounded-xl bg-pink-300/20 blur-xl opacity-0 hover:opacity-100 transition" />

      {/* IMAGE */}
      <div className="w-full aspect-[3/4] rounded-md overflow-hidden">
        <img
          src={photo.img}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* CAPTION */}
      <p className="text-center mt-2 text-sm sm:text-base text-pink-500 font-script">
        {photo.caption}
      </p>
    </motion.div>
  );
};

// MAIN
const AlbumScene = ({ onNext }: SceneProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10 overflow-y-auto bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">

      {/* 💖 HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-5xl text-center mb-8 text-pink-600 font-display"
      >
        💖 My Girl 💖
      </motion.h2>

      {/* 🌸 GRID */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl place-items-center mb-12"
      >
        {photos.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} />
        ))}
      </motion.div>

      {/* 🚀 BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="rounded-full px-8 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xl hover:scale-105 transition"
        >
          Continue 💌
        </Button>
      </motion.div>
    </div>
  );
};

export default AlbumScene;
