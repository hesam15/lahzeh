import { useState, useEffect, useRef } from 'react';

const AudioVolumeSlider: React.FC = () => {
  const [volume1, setVolume1] = useState<number>(0.1);
  const [volume2, setVolume2] = useState<number>(0.1);
  const [volume3, setVolume3] = useState<number>(0.1);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef1.current?.play();
    audioRef2.current?.play();
    audioRef3.current?.play();
  };

  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = volume1;
    }
  }, [volume1]);

  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = volume2;
    }
  }, [volume2]);

  useEffect(() => {
    if (audioRef3.current) {
      audioRef3.current.volume = volume3;
    }
  }, [volume3]);

  return (
    <div>
      <audio ref={audioRef1} src="/sounds/rain.mp3" loop />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume1}
        onChange={(e) => setVolume1(Number(e.target.value))}
      />

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

      {!isPlaying && (
        <button onClick={handlePlay}>Start Playing</button>
      )}
    </div>
  );
};

export default AudioVolumeSlider;
