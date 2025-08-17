import { useState, useEffect } from 'react';

const AudioVolumeSlider: React.FC = () => {
    const [volume1, setVolume1] = useState<number>(0.0001);
    const [volume2, setVolume2] = useState<number>(0.0001);
    const [volume3, setVolume3] = useState<number>(0.0001);


    useEffect(() => {
        const audio = document?.getElementById('audio1') as HTMLAudioElement;
        if (audio) {
            audio.volume = volume1;
        }
    }, [volume1]);

    useEffect(() => {
        const audio = document?.getElementById('audio2') as HTMLAudioElement;
        if (audio) {
            audio.volume = volume2;
        }
    }, [volume2]);
    useEffect(() => {
        const audio = document?.getElementById('audio3') as HTMLAudioElement;
        if (audio) {
            audio.volume = volume3;
        }
    }, [volume1]);

    return (
        <div>
            <audio id="audio1" src="/sounds/rain.mp3" autoPlay loop />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume1}
                onChange={(e) => setVolume1(Number(e.target.value))}
            />

            <audio id="audio2" src="/sounds/forest.mp3" autoPlay loop />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume2}
                onChange={(e) => setVolume2(Number(e.target.value))}
            />


            <audio id="audio3" src="/sounds/sea.mp3" autoPlay loop />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume3}
                onChange={(e) => setVolume3(Number(e.target.value))}
            />
        </div>
    );
};

export default AudioVolumeSlider;
