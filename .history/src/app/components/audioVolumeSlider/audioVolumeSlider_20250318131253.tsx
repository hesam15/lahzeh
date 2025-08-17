import { useState, useEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.0001);

  
  useEffect(() => {
    const audio = document?.getElementById('audio') as HTMLAudioElement;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

 

  return (
    <div>
      <audio id="audio" src="/sounds/rain.mp3" autoPlay loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />

<audio id="audio" src="/sounds/rain.mp3" autoPlay loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />


<audio id="audio" src="/sounds/rain.mp3" autoPlay loop />
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
