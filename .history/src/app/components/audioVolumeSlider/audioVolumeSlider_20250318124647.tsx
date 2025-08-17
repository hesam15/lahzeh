import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ایجاد عنصر audio در سمت کلاینت
    audioRef.current = new Audio('/ظظ');
    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    audioRef.current.play();

    return () => {
      // پاک‌سازی هنگامUnmount
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
