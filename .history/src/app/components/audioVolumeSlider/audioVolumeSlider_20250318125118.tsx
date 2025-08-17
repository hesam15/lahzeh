import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [isClient, setIsClient] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // تعیین اینکه آیا کامپوننت در کلاینت رندر می‌شود
  useEffect(() => {
    setIsClient(true);
  }, []);

  // استفاده از useEffect برای تنظیم حجم صدا
  useEffect(() => {
    if (isClient && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, isClient]);

  // اطمینان از عدم رندر در سرور
  if (!isClient) {
    return null; // جلوگیری از رندر در سرور
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
        suppressHydrationWarning
      />
    </div>
  );
};

export default AudioVolumeSlider;
