import { useState, useEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
    const [volume, setVolume] = useState<number>(0.5);

 
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
