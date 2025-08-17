import React, { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isClient, setIsClient] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const audio = new Audio('/your-audio-file.mp3');
      audio.volume = volume;
      audio.loop = true;

      // Check before play to ensure user interaction
      const playAudio = async () => {
        try {
          await audio.play();
          audioRef.current = audio;
        } catch (err) {
          console.error('Audio play failed:', err);
        }
      };

      playAudio();

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [isClient, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!isClient) {
    return null;
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
