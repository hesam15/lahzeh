import { useState, useEffect } from 'react';



const AudioVolumeSlider: React.FC<AudioVolumeSliderProps> = () => {
  const [volume, setVolume] = useState<number>(0.1);

  useEffect(() => {
    const audio = document?.getElementById('audio') as HTMLAudioElement;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '10px' }}>
        {icon} {/* اینجا آیکون نشان داده می‌شود */}
      </div>
      <audio id="audio" src={audioSrc} autoPlay loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
};

export default AudioVolumeSlider;
