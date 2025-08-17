import React, { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isClient, setIsClient] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // تعیین اینکه آیا کامپوننت در کلاینت رندر می‌شود
  useEffect(() => {
    setIsClient(true);
  }, []);

  // استفاده از useEffect برای ایجاد و کنترل Audio
  useEffect(() => {
    if (isClient) {
      const audio = new Audio('/your-audio-file.mp3');
      audio.volume = volume;
      audio.loop = true;
      audio.play();
      audioRef.current = audio;

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [isClient, volume]);

  // به‌روزرسانی حجم صدا هنگام تغییر مقدار
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  if (!isClient) {
    return null; // جلوگیری از رندر در سرور
  }

  return (
    <div>
      <label htmlFor="volume-slider">Volume: {Math.round(volume * 100)}%</label>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioVolumeSlider;
