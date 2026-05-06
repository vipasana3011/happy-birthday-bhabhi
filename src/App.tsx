import { useState } from "react";
import AlbumScene from "@/components/AlbumScene";
import BalloonScene from "@/components/BalloonScene";
import GiftsScene from "@/components/GiftsScene";
import MessageScene from "@/components/MessageScene";

const Index = () => {
  const [scene, setScene] = useState(0);

  const nextScene = () => {
    setScene((prev) => prev + 1);
  };

  return (
    // 🔥 MOST IMPORTANT FIX HERE
    <div className="w-full min-h-screen overflow-y-auto">

      {scene === 0 && <AlbumScene onNext={nextScene} />}
      {scene === 1 && <BalloonScene onNext={nextScene} />}
      {scene === 2 && <GiftsScene onNext={nextScene} />}
      {scene === 3 && <MessageScene onNext={nextScene} />}

    </div>
  );
};

export default Index;
