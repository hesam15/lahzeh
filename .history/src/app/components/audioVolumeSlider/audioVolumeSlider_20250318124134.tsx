import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // استفاده از useLayoutEffect برای اطمینان از همسانی
  useLayoutEffect(() => {
    audioRef.current = new Audio('/your-audio-file.mp3');
    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    audioRef.current.play();

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default AudioVolumeSlider;
