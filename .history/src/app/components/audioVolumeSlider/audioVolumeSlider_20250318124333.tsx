import React, { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // استفاده از useEffect برای ایجاد و کنترل Audio
  useEffect(() => {
    const audio = new Audio('/your-audio-file.mp3');
    audio.volume = volume;
    audio.loop = true;
    audio.play();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // به‌روزرسانی حجم صدا هنگام تغییر مقدار
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // اطمینان از هماهنگی مقدار اولیه
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

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
