import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set the flag to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!isClient) {
    // Prevent rendering the audio element until it's on the client
    return null;
  }

  return (
    <div>
      <audio ref={audioRef} src="/your-audio-file.mp3" autoPlay loop />
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
