import { useState, useRef, useEffect } from 'react';
import { HiOutlineShare, HiOutlineBookmark } from 'react-icons/hi2';
import { HiOutlineHeart, HiOutlineChartBar } from 'react-icons/hi2';
import { HiOutlineSpeakerWave, HiOutlineMusicalNote, HiOutlineSun } from 'react-icons/hi2';
import { BsCloudRain, BsWater } from 'react-icons/bs';
import AudioPlayerCircle from '../audioPlayerCircle/AudioPlayerCircle';

const AudioPlayer: React.FC = () => {
    const [isEffectPlaying, setIsEffectPlaying] = useState(false);
    const [isWavePlaying, setIsWavePlaying] = useState(false);
    const [isForestPlaying, setIsForestPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState<'main' | 'effects'>('main');
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [effectVolume, setEffectVolume] = useState(0);
    const [waveVolume, setWaveVolume] = useState(0);
    const [forestVolume, setForestVolume] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const effectAudioRef = useRef<HTMLAudioElement | null>(null);
    const waveAudioRef = useRef<HTMLAudioElement | null>(null);
    const forestAudioRef = useRef<HTMLAudioElement | null>(null);



    const handleEffectPlayPause = () => {
        if (effectAudioRef.current) {
            if (isEffectPlaying) {
                effectAudioRef.current.pause();
            } else {
                effectAudioRef.current.play();
            }
            setIsEffectPlaying(!isEffectPlaying);
        }
    };

    const handleWavePlayPause = () => {
        if (waveAudioRef.current) {
            if (isWavePlaying) {
                waveAudioRef.current.pause();
            } else {
                waveAudioRef.current.play();
            }
            setIsWavePlaying(!isWavePlaying);
        }
    };

    const handleForestPlayPause = () => {
        if (forestAudioRef.current) {
            if (isForestPlaying) {
                forestAudioRef.current.pause();
            } else {
                forestAudioRef.current.play();
            }
            setIsForestPlaying(!isForestPlaying);
        }
    };

    const handleEffectVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setEffectVolume(newVolume);
        if (effectAudioRef.current) {
            effectAudioRef.current.volume = newVolume;
            if (newVolume === 0) {
                effectAudioRef.current.pause();
                setIsEffectPlaying(false);
            } else if (!isEffectPlaying) {
                effectAudioRef.current.play();
                setIsEffectPlaying(true);
            }
        }
    };

    const handleWaveVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setWaveVolume(newVolume);
        if (waveAudioRef.current) {
            waveAudioRef.current.volume = newVolume;
            if (newVolume === 0) {
                waveAudioRef.current.pause();
                setIsWavePlaying(false);
            } else if (!isWavePlaying) {
                waveAudioRef.current.play();
                setIsWavePlaying(true);
            }
        }
    };

    const handleForestVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setForestVolume(newVolume);
        if (forestAudioRef.current) {
            forestAudioRef.current.volume = newVolume;
            if (newVolume === 0) {
                forestAudioRef.current.pause();
                setIsForestPlaying(false);
            } else if (!isForestPlaying) {
                forestAudioRef.current.play();
                setIsForestPlaying(true);
            }
        }
    };


    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'دریا پناهی',
                    text: 'فایل شماره 3 مدیتیشن چگونه به خواب برویم؟',
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('لینک در کلیپ‌بورد کپی شد');
            }
        } catch (error) {
            console.error('خطا در اشتراک‌گذاری:', error);
        }
    };

    useEffect(() => {
        const updateTime = setInterval(() => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
            }
        }, 1000);

        return () => clearInterval(updateTime);
    }, []);

    return (
        <div className="p-2 flex flex-col items-center w-full">
            <audio ref={audioRef} src="/sounds/daryapanahi.mp3" preload="auto" autoPlay />
            <audio ref={effectAudioRef} src="/sounds/rain.mp3" preload="auto" loop />
            <audio ref={waveAudioRef} src="/sounds/sea.mp3" preload="auto" loop />
            <audio ref={forestAudioRef} src="/sounds/forest.mp3" preload="auto" loop />
            <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full flex justify-center gap-4 mb-4">
                    <button
                        onClick={() => setActiveTab('main')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'main'
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:text-white/80'
                            }`}
                    >
                        <HiOutlineMusicalNote className="w-5 h-5" />
                        <span className="text-sm">پخش‌کننده اصلی</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('effects')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'effects'
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:text-white/80'
                            }`}
                    >
                        <HiOutlineSpeakerWave className="w-5 h-5" />
                        <span className="text-sm">افکت‌های صوتی</span>
                    </button>
                </div>

                {activeTab === 'main' ? (
                    <>
                        <div className="flex flex-row items-center justify-center w-full">
                            <div className="flex items-center w-full justify-center">

                                <AudioPlayerCircle />


                            </div>
                        </div>


                        <div className='w-full flex flex-row justify-between mt-2 px-2'>



                            <div className='w-full'>
                                <div className=''>
                                    <HiOutlineHeart className="w-4 h-4" />
                                    <HiOutlineChartBar className="w-4 h-4" />
                                    <HiOutlineShare className="w-5 h-5" />

                                </div>
                            </div>
                            <div className="w-1/3 flex justify-end items-center gap-4">
                            

                                <div className="flex items-center justify-center gap-1 text-white/80 hover:text-white transition-colors">
                                    <span className="text-xs p-0 m-0">12.8K</span>
                                </div>
                            </div>

                            <div className="w-1/3 flex justify-end items-center gap-4">
                                <button
                                    onClick={handleShare}
                                    className="text-white/60 hover:text-white transition-colors duration-300"
                                >
                                </button>

                                <button className="text-white/80 hover:text-white transition-colors">
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                        <div className="flex flex-col gap-6">
                            {/* افکت باران */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/80 text-sm">افکت باران</span>
                                    <button
                                        onClick={handleEffectPlayPause}
                                        className={`text-white p-2 rounded-full border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 ${isEffectPlaying ? 'bg-white/10' : ''}`}
                                    >
                                        <BsCloudRain className={`w-5 h-5 ${isEffectPlaying ? 'text-white' : 'text-white/60'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlineSpeakerWave className="w-4 h-4 text-white/60" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={effectVolume}
                                        onChange={handleEffectVolumeChange}
                                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                            [&::-webkit-slider-thumb]:appearance-none
                                            [&::-webkit-slider-thumb]:w-3
                                            [&::-webkit-slider-thumb]:h-3
                                            [&::-webkit-slider-thumb]:bg-white
                                            [&::-webkit-slider-thumb]:rounded-full
                                            [&::-webkit-slider-thumb]:cursor-pointer
                                            [&::-webkit-slider-thumb]:transition-all
                                            [&::-webkit-slider-thumb]:hover:scale-125
                                            [&::-webkit-slider-thumb]:hover:bg-white/90
                                            [&::-webkit-slider-thumb]:active:scale-150
                                            [&::-webkit-slider-thumb]:active:bg-white
                                            [&::-webkit-slider-thumb]:shadow-lg
                                            [&::-webkit-slider-thumb]:border-2
                                            [&::-webkit-slider-thumb]:border-white/20"
                                    />
                                    <span className="text-white/60 text-xs w-8 text-center">
                                        {Math.round(effectVolume * 100)}%
                                    </span>
                                </div>
                            </div>

                            {/* افکت موج دریا */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/80 text-sm">افکت موج دریا</span>
                                    <button
                                        onClick={handleWavePlayPause}
                                        className={`text-white p-2 rounded-full border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 ${isWavePlaying ? 'bg-white/10' : ''}`}
                                    >
                                        <BsWater className={`w-5 h-5 ${isWavePlaying ? 'text-white' : 'text-white/60'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlineSpeakerWave className="w-4 h-4 text-white/60" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={waveVolume}
                                        onChange={handleWaveVolumeChange}
                                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                            [&::-webkit-slider-thumb]:appearance-none
                                            [&::-webkit-slider-thumb]:w-3
                                            [&::-webkit-slider-thumb]:h-3
                                            [&::-webkit-slider-thumb]:bg-white
                                            [&::-webkit-slider-thumb]:rounded-full
                                            [&::-webkit-slider-thumb]:cursor-pointer
                                            [&::-webkit-slider-thumb]:transition-all
                                            [&::-webkit-slider-thumb]:hover:scale-125
                                            [&::-webkit-slider-thumb]:hover:bg-white/90
                                            [&::-webkit-slider-thumb]:active:scale-150
                                            [&::-webkit-slider-thumb]:active:bg-white
                                            [&::-webkit-slider-thumb]:shadow-lg
                                            [&::-webkit-slider-thumb]:border-2
                                            [&::-webkit-slider-thumb]:border-white/20"
                                    />
                                    <span className="text-white/60 text-xs w-8 text-center">
                                        {Math.round(waveVolume * 100)}%
                                    </span>
                                </div>
                            </div>

                            {/* افکت جنگل */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/80 text-sm">افکت جنگل</span>
                                    <button
                                        onClick={handleForestPlayPause}
                                        className={`text-white p-2 rounded-full border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 ${isForestPlaying ? 'bg-white/10' : ''}`}
                                    >
                                        <HiOutlineSun className={`w-5 h-5 ${isForestPlaying ? 'text-white' : 'text-white/60'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiOutlineSpeakerWave className="w-4 h-4 text-white/60" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={forestVolume}
                                        onChange={handleForestVolumeChange}
                                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                            [&::-webkit-slider-thumb]:appearance-none
                                            [&::-webkit-slider-thumb]:w-3
                                            [&::-webkit-slider-thumb]:h-3
                                            [&::-webkit-slider-thumb]:bg-white
                                            [&::-webkit-slider-thumb]:rounded-full
                                            [&::-webkit-slider-thumb]:cursor-pointer
                                            [&::-webkit-slider-thumb]:transition-all
                                            [&::-webkit-slider-thumb]:hover:scale-125
                                            [&::-webkit-slider-thumb]:hover:bg-white/90
                                            [&::-webkit-slider-thumb]:active:scale-150
                                            [&::-webkit-slider-thumb]:active:bg-white
                                            [&::-webkit-slider-thumb]:shadow-lg
                                            [&::-webkit-slider-thumb]:border-2
                                            [&::-webkit-slider-thumb]:border-white/20"
                                    />
                                    <span className="text-white/60 text-xs w-8 text-center">
                                        {Math.round(forestVolume * 100)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;
