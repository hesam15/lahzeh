import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set isMounted to true after the component mounts
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Render the audio element only after the component has mounted
  return (
    <div>
      {isMounted && (
        <audio ref={audioRef} src="/your-audio-file.mp3" autoPlay loop />
      )}
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
