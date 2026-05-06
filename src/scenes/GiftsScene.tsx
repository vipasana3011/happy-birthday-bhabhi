import { motion } from "framer-motion";
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-16">

      <h2 className="text-4xl md:text-5xl text-pink-400 font-bold">
        Open Your Gifts 🎁
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-14">

        {gifts.map((g) => {
          const isOpen = opened.includes(g.id);

          return (
            <div
              key={g.id}
              onClick={() => openGift(g.id)}
              className="relative w-44 h-44 cursor-pointer perspective"
            >

              <div className="relative w-full h-full [transform-style:preserve-3d]">

                {/* 🧱 BASE BOX */}
                <div className="absolute bottom-0 w-full h-3/4 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-500 shadow-2xl overflow-hidden">

                  {/* inner glow */}
                  <div className="absolute inset-0 shadow-inner opacity-30" />

                  {/* label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-1 bg-white text-pink-500 text-sm rounded-full shadow-md font-semibold">
                      {g.word}
                    </div>
                  </div>

                  {/* 3D side depth */}
                  <div className="absolute -right-2 top-2 w-full h-full bg-rose-600 rounded-2xl opacity-40 -z-10" />
                </div>

                {/* 🎁 LID */}
                <motion.div
                  animate={
                    isOpen
                      ? { rotateX: -140, y: -30 }
                      : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute top-0 w-full h-1/3 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 origin-top shadow-xl"
                  style={{ transformOrigin: "top" }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-3xl">
                    🎀
                  </div>
                </motion.div>

                {/* 🎁 ITEM POP OUT */}
                {isOpen && (
                  <motion.img
                    src={g.img}
                    initial={{ y: 30, scale: 0, opacity: 0 }}
                    animate={{ y: -130, scale: 1.2, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="absolute left-1/2 -translate-x-1/2 top-10 w-28 drop-shadow-2xl z-20"
                  />
                )}

                {/* ✨ SPARKLES */}
                {isOpen && (
                  <>
                    {[...Array(12)].map((_, i) => (
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
                  </>
                )}

              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!allOpened}
        className={`px-8 py-4 rounded-full text-white transition ${
          allOpened
            ? "bg-pink-500 hover:scale-105 shadow-xl"
            : "bg-gray-300"
        }`}
      >
        {allOpened ? "Next 💌" : "Open all gifts"}
      </button>

    </div>
  );
}