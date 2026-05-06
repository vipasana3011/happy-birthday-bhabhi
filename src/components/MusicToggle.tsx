import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.volume = 0.4;
        await audio.play();
        setPlaying(true);
      }
    } catch (err) {
      console.log("Audio blocked until user interaction:", err);
    }
  };

  return (
    <>
      {/* 🎵 AUDIO FILE */}
      <audio
        ref={audioRef}
        src="/assets/TumhoToh.mp3"
        loop
        preload="auto"
      />

      {/* 🎛 BUTTON */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 glass rounded-full p-3 hover:scale-110 transition"
      >
        {playing ? (
          <Volume2 className="h-5 w-5 text-rose-500" />
        ) : (
          <VolumeX className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </>
  );
}