import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume1, setVolume1] = useState<number>(0);
  const [volume2, setVolume2] = useState<number>(0);
  const [volume3, setVolume3] = useState<number>(0);

  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);

  // تابع برای پخش صدا زمانی که حجم بیشتر از صفر می‌شود
  const handlePlayAudio = (audioRef: React.RefObject<HTMLAudioElement>, volume: number) => {
    if (audioRef.current) {
      // تنظیم حجم صدا
      audioRef.current.volume = volume;
      
      // پخش صدا زمانی که حجم بیشتر از صفر باشد
      if (volume > 0 && audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    handlePlayAudio(audioRef1, volume1);
  }, [volume1]);

  useEffect(() => {
    handlePlayAudio(audioRef2, volume2);
  }, [volume2]);

  useEffect(() => {
    handlePlayAudio(audioRef3, volume3);
  }, [volume3]);

  return (
    <div>
      <div className=''></div>

      <audio ref={audioRef2} src="/sounds/forest.mp3" loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume2}
        onChange={(e) => setVolume2(Number(e.target.value))}
      />

      <audio ref={audioRef3} src="/sounds/sea.mp3" loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume3}
        onChange={(e) => setVolume3(Number(e.target.value))}
      />
    </div>
  );
};

export default AudioVolumeSlider;
