import { useState, useEffect } from 'react';

interface AudioVolumeSliderProps {
  icon: React.ReactNode; // آیکونی که می‌خواهیم کنار اسلایدر نشان دهیم
  audioSrc: string; // مسیر فایل صوتی
}

const AudioVolumeSlider: React.FC<AudioVolumeSliderProps> = ({ icon, audioSrc }) => {
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
