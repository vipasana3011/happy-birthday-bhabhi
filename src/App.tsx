import { useState } from "react";
import AlbumScene from "@/scenes/AlbumScene";
import BalloonScene from "@/scenes/BalloonScene";
import GiftsScene from "@/scenes/GiftsScene";
import MessageScene from "@/scenes/MessageScene";
import FinalScene from "@/scenes/FinalScene";
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
      {scene === 4 && <FinalScene onNext={() => setScene(0)} />}

    </div>
  );
};

export default Index;
