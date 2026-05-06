import { useState } from "react";

import HeroScene from "@/scenes/HeroScene";
import CakeScene from "@/scenes/CakeScene";
import AlbumScene from "@/scenes/AlbumScene";
import BalloonScene from "@/scenes/BalloonScene";
import GiftsScene from "@/scenes/GiftsScene";
import MessageScene from "@/scenes/MessageScene";
import FinalScene from "@/scenes/FinalScene";

const Index = () => {
  const [scene, setScene] = useState(0);

  // 🎬 NEXT SCENE
  const nextScene = () => {
    setScene((prev) => {
      const next = prev + 1;
      console.log("➡️ SCENE CHANGED TO:", next);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">

      {scene === 0 && (
        <HeroScene onNext={nextScene} />
      )}

      {scene === 1 && (
        <CakeScene onNext={nextScene} />
      )}

      {scene === 2 && (
        <AlbumScene onNext={nextScene} />
      )}

      {scene === 3 && (
        <BalloonScene onNext={nextScene} />
      )}

      {scene === 4 && (
        <GiftsScene onNext={nextScene} />
      )}

      {scene === 5 && (
        <MessageScene onNext={nextScene} />
      )}

      {scene === 6 && (
        <FinalScene onNext={() => setScene(0)} />
      )}

    </div>
  );
};

export default Index;
