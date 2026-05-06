import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const gifts = [
  { id: 1, word: "you", img: "/assets/gifts/bouquet.png" },
  { id: 2, word: "are", img: "/assets/gifts/chocolate.png" },
  { id: 3, word: "my", img: "/assets/gifts/teddy.png" },
  { id: 4, word: "gift", img: "/assets/gifts/cards.png" },
];

export default function GiftsScene({ onNext }: any) {
  const [opened, setOpened] = useState<number[]>([]);

  const openGift = (id: number) => {
    if (opened.includes(id)) return;
    setOpened([...opened, id]);
  };

  const allOpened = opened.length === gifts.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-10 overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">

      {/* 💖 FLOATING PARTICLES BG */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute text-pink-300 text-xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-pink-500 font-bold text-center z-10"
      >
        Open Your Gifts 🎁
      </motion.h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 z-10">

        {gifts.map((g, i) => {
          const isOpen = opened.includes(g.id);

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 60, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openGift(g.id)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 cursor-pointer perspective"
            >

              <div className="relative w-full h-full [transform-style:preserve-3d]">

                {/* 🎁 BOX BASE (3D LOOK) */}
                <motion.div
                  animate={isOpen ? { scale: 0.95 } : { scale: 1 }}
                  className="absolute bottom-0 w-full h-3/4 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500 shadow-2xl flex items-center justify-center"
                >
                  {/* glow */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10 blur-md" />

                  <div className="px-3 py-1 bg-white text-pink-500 text-xs sm:text-sm rounded-full shadow font-semibold z-10">
                    {g.word}
                  </div>
                </motion.div>

                {/* 🎁 LID */}
                <motion.div
                  animate={
                    isOpen
                      ? { rotateX: -140, y: -25 }
                      : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute top-0 w-full h-1/3 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 origin-top shadow-xl"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-2xl">
                    🎀
                  </div>
                </motion.div>

                {/* 🎁 ITEM POP */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.img
                      src={g.img}
                      initial={{ y: 40, scale: 0, opacity: 0 }}
                      animate={{ y: -90, scale: 1.2, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="absolute left-1/2 -translate-x-1/2 top-6 w-20 sm:w-24 z-20 drop-shadow-2xl"
                    />
                  )}
                </AnimatePresence>

                {/* ✨ SPARK BURST */}
                {isOpen &&
                  [...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1.5,
                        x: Math.random() * 120 - 60,
                        y: Math.random() * -120,
                      }}
                      transition={{ duration: 1 }}
                      className="absolute left-1/2 top-1/2 text-yellow-300 text-lg"
                    >
                      ✨
                    </motion.div>
                  ))}

                {/* 💖 HEART BURST */}
                {isOpen &&
                  [...Array(6)].map((_, i) => (
                    <motion.div
                      key={"h" + i}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1.2,
                        x: Math.random() * 80 - 40,
                        y: Math.random() * -100,
                      }}
                      transition={{ duration: 1.2 }}
                      className="absolute left-1/2 top-1/2 text-pink-400 text-lg"
                    >
                      💖
                    </motion.div>
                  ))}

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        disabled={!allOpened}
        onClick={onNext}
        className={`mt-6 px-8 py-4 rounded-full text-white transition z-10 ${
          allOpened
            ? "bg-pink-500 hover:scale-105 shadow-xl"
            : "bg-gray-300"
        }`}
      >
        {allOpened ? "Next 💌" : "Open all gifts"}
      </motion.button>

    </div>
  );
}
