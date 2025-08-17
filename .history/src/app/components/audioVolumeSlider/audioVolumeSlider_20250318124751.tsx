import { useState, useEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const audio = document?.getElementById('audio') as HTMLAudioElement?;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <audio id="audio" src="/your-audio-file.mp3" autoPlay loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        suppressHydrationWarning
      />
    </div>
  );
};

export default AudioVolumeSlider;
