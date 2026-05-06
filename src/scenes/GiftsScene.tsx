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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-10 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">

      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl text-pink-500 font-bold text-center">
        Open Your Gifts 🎁
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">

        {gifts.map((g) => {
          const isOpen = opened.includes(g.id);

          return (
            <div
              key={g.id}
              onClick={() => openGift(g.id)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 cursor-pointer"
            >
              <div className="relative w-full h-full">

                {/* BOX */}
                <div className="absolute bottom-0 w-full h-3/4 rounded-xl bg-gradient-to-br from-pink-300 to-rose-500 shadow-lg flex items-center justify-center">

                  <div className="px-3 py-1 bg-white text-pink-500 text-xs sm:text-sm rounded-full shadow font-semibold">
                    {g.word}
                  </div>
                </div>

                {/* LID */}
                <motion.div
                  animate={
                    isOpen
                      ? { rotateX: -130, y: -20 }
                      : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 w-full h-1/3 rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 origin-top"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-xl sm:text-2xl">
                    🎀
                  </div>
                </motion.div>

                {/* ITEM */}
                {isOpen && (
                  <motion.img
                    src={g.img}
                    initial={{ y: 20, scale: 0 }}
                    animate={{ y: -80, scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="absolute left-1/2 -translate-x-1/2 top-6 w-16 sm:w-20 md:w-24 z-20"
                  />
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <button
        onClick={onNext}
        disabled={!allOpened}
        className={`mt-6 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white transition ${
          allOpened
            ? "bg-pink-500 hover:scale-105 shadow-lg"
            : "bg-gray-300"
        }`}
      >
        {allOpened ? "Next 💌" : "Open all gifts"}
      </button>

    </div>
  );
}
