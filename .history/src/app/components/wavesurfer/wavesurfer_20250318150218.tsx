// pages/wavesurfer.tsx
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformEqualizer: React.FC = () => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    // بررسی اینکه کد در مرورگر در حال اجرا است
    if (typeof window !== 'undefined') {
      // ایجاد و پیکربندی Wavesurfer
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: '#4caf50', // رنگ موج
        progressColor: '#81c784', // رنگ پیشرفت
        height: 150,
        barWidth: 3,
        barHeight: 1,
        barGap: 2,
      });

      // بارگذاری فایل صوتی
      wavesurferRef.current.load('/sounds/rain.mp3');

      // تمیز کردن هنگام انهدام کامپوننت
      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div ref={waveformRef} className="w-full"></div>
    </div>
  );
};

export default WaveformEqualizer;
