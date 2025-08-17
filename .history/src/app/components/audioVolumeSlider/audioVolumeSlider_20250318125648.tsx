import { useState, useEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0);

  
  useEffect(() => {
    const audio = document?.getElementById('audio') as HTMLAudioElement;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

 

  return (
    <div>
      <audio id="audio" src="/your-audio-file.mp3" autoPlay loop />
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default AudioVolumeSlider;
