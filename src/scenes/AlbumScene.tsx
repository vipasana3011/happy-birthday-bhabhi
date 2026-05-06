import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  const baseRot = ((index * 13) % 10) - 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: baseRot }}
      animate={{ opacity: 1, y: 0, rotate: baseRot }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-2 pb-6 rounded-xl shadow-lg w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px]"
    >
      {/* IMAGE */}
      <div className="w-full aspect-[3/4] rounded-md overflow-hidden">
        <img
          src={photo.img}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CAPTION */}
      <p className="text-center mt-2 text-sm sm:text-base text-pink-500">
        {photo.caption}
      </p>
    </motion.div>
  );
};

// 💎 MAIN SCENE
const AlbumScene = ({ onNext }: SceneProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">

      {/* 💖 HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-5xl text-center mb-6 text-pink-600"
      >
        💖 My Girl 💖
      </motion.h2>

      {/* 🌸 GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl place-items-center">
        {photos.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* 🚀 BUTTON */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10"
      >
        <Button
          size="lg"
          onClick={onNext}
          className="rounded-full px-8 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:scale-105 transition-transform"
        >
          Continue 💌
        </Button>
      </motion.div>
    </div>
  );
};

export default AlbumScene;
