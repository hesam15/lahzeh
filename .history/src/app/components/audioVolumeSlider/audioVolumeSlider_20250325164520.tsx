import { useState, useEffect, useRef } from 'react';
import "./style.css";
import { FaWater } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";
import { GiForestCamp } from "react-icons/gi";
import Image from 'next/image';

const AudioVolumeSlider: React.FC = () => {
    const [volume1, setVolume1] = useState<number>(0);
    const [volume2, setVolume2] = useState<number>(0);
    const [volume3, setVolume3] = useState<number>(0);

    const audioRef1 = useRef<HTMLAudioElement>(null);
    const audioRef2 = useRef<HTMLAudioElement>(null);
    const audioRef3 = useRef<HTMLAudioElement>(null);

    // تابع برای پخش صدا زمانی که حجم بیشتر از صفر می‌شود
    const handlePlayAudio = (audioRef: React.RefObject<HTMLAudioElement | null>, volume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
    
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
        <div className='flex w-full flex-col items-center justify-center p-8'>
            <div className='flex w-2/3 items-center justify-center flex-col'>
                <span className="text-white text-sm mb-1">{Math.round(volume1 * 100)}%</span>
                <div className="flex items-center w-full justify-center">
                    <Image src="/images/rain.png" alt="rain" width={50} height={50} />
                    <audio ref={audioRef1} src="/sounds/rain.mp3" loop />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume1}
                        onChange={(e) => setVolume1(Number(e.target.value))}
                        className='w-1/3 m-3 slider appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer'
                        style={{
                            background: 'white',
                            height: '2px',
                            borderRadius: '4px',
                            WebkitAppearance: 'none'
                        }}                />
                </div>
            </div>
            <div className='flex w-2/3 items-center justify-center flex-col'>
                <span className="text-white text-sm mb-1">{Math.round(volume2 * 100)}%</span>
                <div className="flex items-center w-full justify-center">
                    <Image src="/images/Nature.png" alt="rain" width={50} height={50} />
                    <audio ref={audioRef2} src="/sounds/forest.mp3" loop />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume2}
                        onChange={(e) => setVolume2(Number(e.target.value))}
                        className='w-1/3 m-3 slider appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer'
                        style={{
                            background: 'white',
                            height: '2px',
                            borderRadius: '4px',
                            WebkitAppearance: 'none'
                        }}
                    />
                </div>
            </div>
            <div className='flex w-2/3 items-center justify-center flex-col'>
                <div className="flex items-center w-full justify-center">
                    <Image src="/images/Sea Waves.png" alt="rain" width={50} height={50} />
                    <audio ref={audioRef3} src="/sounds/sea.mp3" loop />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume3}
                        onChange={(e) => setVolume3(Number(e.target.value))}
                        className='w-1/3 m-3 slider appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer'
                        style={{
                            background: 'white',
                            height: '2px',
                            borderRadius: '4px',
                            WebkitAppearance: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioVolumeSlider;
