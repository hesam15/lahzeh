'use client';

import { useState, useRef, useEffect } from 'react';
import { HiOutlineShare, HiBookmark, HiOutlineBookmark, HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { HiOutlineChartBar, HiOutlineSpeakerWave, HiOutlineMusicalNote } from 'react-icons/hi2';
import { BsCloudRain, BsWater } from 'react-icons/bs';
import { GiBabyFace } from 'react-icons/gi';
import AudioPlayerCircle from '../audioPlayerCircle/AudioPlayerCircle';

interface Sound {
  id: number;
  title: string;
  file_path?: string;
  description?: string;
  active?: number;
  create_dates?: {
    created_human: string;
    created_at: string;
  };
}

interface AudioProps {
  data: {
    title?: string;
    narration?: { file_path?: string };
    sounds?: Sound[];
  };
  onLike: () => Promise<boolean>;
  isLiked: boolean;
  onFavourite: () => Promise<boolean>;
  isFavourited: boolean;
  onInteraction?: () => void;
}

const AudioPlayer: React.FC<AudioProps> = ({
  data,
  onLike,
  isLiked,
  onFavourite,
  isFavourited,
  onInteraction,
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'effects'>('main');
  const [likedState, setLikedState] = useState(isLiked);
  const [favouritedState, setFavouritedState] = useState(isFavourited);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
  const [soundStates, setSoundStates] = useState<Record<number, { isPlaying: boolean; volume: number }>>({});
  const [useWebAudio, setUseWebAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundAudioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const narrationGainNodeRef = useRef<GainNode | null>(null);
  const soundGainNodesRef = useRef<Record<number, GainNode | null>>({});
  const narrationSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Initialize AudioContext and GainNodes
  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('AudioContext initialized:', audioContextRef.current.state);
      } catch (error) {
        console.error('Error initializing AudioContext:', error);
        setUseWebAudio(false);
        setShareMessage('خطا در راه‌اندازی Web Audio API، استفاده از HTML5 Audio');
        return;
      }
    }
    if (audioRef.current && audioContextRef.current && !narrationGainNodeRef.current && useWebAudio) {
      try {
        narrationGainNodeRef.current = audioContextRef.current.createGain();
        narrationGainNodeRef.current.gain.setValueAtTime(1, audioContextRef.current.currentTime);
        narrationSourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        narrationSourceRef.current.connect(narrationGainNodeRef.current);
        narrationGainNodeRef.current.connect(audioContextRef.current.destination);
        console.log('Narration GainNode connected, gain:', narrationGainNodeRef.current.gain.value);
      } catch (error) {
        console.error('Error connecting narration GainNode:', error);
        setUseWebAudio(false);
        setShareMessage('مشکل CORS یا خطای Web Audio API، استفاده از HTML5 Audio');
      }
    }
    data?.sounds?.forEach((sound) => {
      const audio = soundAudioRefs.current[sound.id];
      if (audio && audioContextRef.current && !soundGainNodesRef.current[sound.id] && useWebAudio) {
        try {
          soundGainNodesRef.current[sound.id] = audioContextRef.current.createGain();
          soundGainNodesRef.current[sound.id]!.gain.setValueAtTime(0, audioContextRef.current.currentTime);
          const source = audioContextRef.current.createMediaElementSource(audio);
          source.connect(soundGainNodesRef.current[sound.id]!);
          soundGainNodesRef.current[sound.id]!.connect(audioContextRef.current.destination);
          console.log(`Sound ${sound.id} GainNode connected`);
        } catch (error) {
          console.error(`Error connecting sound ${sound.id} GainNode:`, error);
          setUseWebAudio(false);
          setShareMessage('مشکل CORS یا خطای Web Audio API، استفاده از HTML5 Audio');
        }
      }
    });
  };

  // Initialize sound states
  useEffect(() => {
    const initialStates: Record<number, { isPlaying: boolean; volume: number }> = {};
    data?.sounds?.forEach((sound) => {
      initialStates[sound.id] = { isPlaying: false, volume: 0 };
    });
    setSoundStates(initialStates);
  }, [data?.sounds]);

  // Handle narration play/pause
  const handleNarrationPlayPause = () => {
    const audio = audioRef.current;
    if (!audio) {
      setShareMessage('فایل صوتی یافت نشد');
      console.error('Audio element not found');
      return;
    }
    if (isNarrationPlaying) {
      audio.pause();
      setIsNarrationPlaying(false);
      console.log('Narration paused');
    } else {
      // Initialize and resume AudioContext on user interaction
      initializeAudioContext();
      if (audioContextRef.current?.state === 'suspended' && useWebAudio) {
        audioContextRef.current.resume().then(() => {
          console.log('AudioContext resumed, state:', audioContextRef.current?.state);
          audio.play().then(() => {
            setIsNarrationPlaying(true);
            console.log('Narration playing:', data?.narration?.file_path);
          }).catch((error) => {
            console.error('Error playing narration:', error);
            setShareMessage('خطا در پخش صدا: ' + error.message);
            setIsNarrationPlaying(false);
          });
        }).catch((error) => {
          console.error('Error resuming AudioContext:', error);
          setShareMessage('خطا در فعال‌سازی AudioContext');
          setUseWebAudio(false);
        });
      } else {
        audio.play().then(() => {
          setIsNarrationPlaying(true);
          console.log('Narration playing:', data?.narration?.file_path);
        }).catch((error) => {
          console.error('Error playing narration:', error);
          setShareMessage('خطا در پخش صدا: ' + error.message);
          setIsNarrationPlaying(false);
        });
      }
    }
    onInteraction?.();
  };

  // Handle sound play/pause
  const handleSoundPlayPause = (soundId: number) => {
    const audio = soundAudioRefs.current[soundId];
    if (!audio) {
      setShareMessage('فایل صوتی یافت نشد');
      console.error(`Audio for sound ${soundId} not found`);
      return;
    }
    if (soundStates[soundId]?.isPlaying) {
      audio.pause();
      setSoundStates((prev) => ({
        ...prev,
        [soundId]: { ...prev[soundId], isPlaying: false },
      }));
      console.log(`Sound ${soundId} paused`);
    } else {
      initializeAudioContext();
      const currentVolume = soundStates[soundId]?.volume || 0;
      const newVolume = currentVolume === 0 ? 0.1 : currentVolume;
      if (useWebAudio && soundGainNodesRef.current[soundId] && audioContextRef.current) {
        soundGainNodesRef.current[soundId]!.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
      } else {
        audio.volume = newVolume;
      }
      if (audioContextRef.current?.state === 'suspended' && useWebAudio) {
        audioContextRef.current.resume().then(() => {
          console.log('AudioContext resumed for sound, state:', audioContextRef.current?.state);
          audio.play().then(() => {
            setSoundStates((prev) => ({
              ...prev,
              [soundId]: { isPlaying: true, volume: newVolume },
            }));
            console.log(`Sound ${soundId} playing with volume ${newVolume}`);
          }).catch((error) => {
            console.error(`Error playing sound ${soundId}:`, error);
            setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
          });
        }).catch((error) => {
          console.error('Error resuming AudioContext:', error);
          setShareMessage('خطا در فعال‌سازی AudioContext');
          setUseWebAudio(false);
        });
      } else {
        audio.play().then(() => {
          setSoundStates((prev) => ({
            ...prev,
            [soundId]: { isPlaying: true, volume: newVolume },
          }));
          console.log(`Sound ${soundId} playing with volume ${newVolume}`);
        }).catch((error) => {
          console.error(`Error playing sound ${soundId}:`, error);
          setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
        });
      }
    }
    onInteraction?.();
  };

  // Handle sound volume change
  const handleSoundVolumeChange = (soundId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    const audio = soundAudioRefs.current[soundId];
    if (!audio) {
      console.error(`Audio for sound ${soundId} not found`);
      setShareMessage('خطا در تنظیم صدا');
      return;
    }
    if (useWebAudio && soundGainNodesRef.current[soundId] && audioContextRef.current) {
      soundGainNodesRef.current[soundId]!.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    } else {
      audio.volume = newVolume;
    }
    if (newVolume <= 0) {
      audio.pause();
      setSoundStates((prev) => ({
        ...prev,
        [soundId]: { isPlaying: false, volume: 0 },
      }));
      console.log(`Sound ${soundId} paused due to volume 0`);
    } else {
      if (!soundStates[soundId]?.isPlaying) {
        if (audioContextRef.current?.state === 'suspended' && useWebAudio) {
          audioContextRef.current.resume().then(() => {
            console.log('AudioContext resumed for volume change, state:', audioContextRef.current?.state);
            audio.play().then(() => {
              setSoundStates((prev) => ({
                ...prev,
                [soundId]: { isPlaying: true, volume: newVolume },
              }));
              console.log(`Sound ${soundId} playing with volume ${newVolume}`);
            }).catch((error) => {
              console.error(`Error playing sound ${soundId}:`, error);
              setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
            });
          }).catch((error) => {
            console.error('Error resuming AudioContext:', error);
            setShareMessage('خطا در فعال‌سازی AudioContext');
            setUseWebAudio(false);
          });
        } else {
          audio.play().then(() => {
            setSoundStates((prev) => ({
              ...prev,
              [soundId]: { isPlaying: true, volume: newVolume },
            }));
            console.log(`Sound ${soundId} playing with volume ${newVolume}`);
          }).catch((error) => {
            console.error(`Error playing sound ${soundId}:`, error);
            setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
          });
        }
      } else {
        setSoundStates((prev) => ({
          ...prev,
          [soundId]: { ...prev[soundId], volume: newVolume },
        }));
        console.log(`Sound ${soundId} volume set to ${newVolume}`);
      }
    }
    onInteraction?.();
  };

  // Handle sound click
  const handleSoundClick = (soundId: number, event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const rect = input.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newVolume = Math.max(0, Math.min(1, percentage));
    const audio = soundAudioRefs.current[soundId];
    if (!audio) {
      console.error(`Audio for sound ${soundId} not found`);
      setShareMessage('خطا در تنظیم صدا');
      return;
    }
    input.value = newVolume.toString();
    if (useWebAudio && soundGainNodesRef.current[soundId] && audioContextRef.current) {
      soundGainNodesRef.current[soundId]!.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    } else {
      audio.volume = newVolume;
    }
    if (newVolume <= 0) {
      audio.pause();
      setSoundStates((prev) => ({
        ...prev,
        [soundId]: { isPlaying: false, volume: 0 },
      }));
      console.log(`Sound ${soundId} paused due to volume 0`);
    } else {
      if (!soundStates[soundId]?.isPlaying) {
        if (audioContextRef.current?.state === 'suspended' && useWebAudio) {
          audioContextRef.current.resume().then(() => {
            console.log('AudioContext resumed for sound click, state:', audioContextRef.current?.state);
            audio.play().then(() => {
              setSoundStates((prev) => ({
                ...prev,
                [soundId]: { isPlaying: true, volume: newVolume },
              }));
              console.log(`Sound ${soundId} playing with volume ${newVolume}`);
            }).catch((error) => {
              console.error(`Error playing sound ${soundId}:`, error);
              setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
            });
          }).catch((error) => {
            console.error('Error resuming AudioContext:', error);
            setShareMessage('خطا در فعال‌سازی AudioContext');
            setUseWebAudio(false);
          });
        } else {
          audio.play().then(() => {
            setSoundStates((prev) => ({
              ...prev,
              [soundId]: { isPlaying: true, volume: newVolume },
            }));
            console.log(`Sound ${soundId} playing with volume ${newVolume}`);
          }).catch((error) => {
            console.error(`Error playing sound ${soundId}:`, error);
            setShareMessage('خطا در پخش افکت صوتی: ' + error.message);
          });
        }
      } else {
        setSoundStates((prev) => ({
          ...prev,
          [soundId]: { ...prev[soundId], volume: newVolume },
        }));
        console.log(`Sound ${soundId} volume set to ${newVolume}`);
      }
    }
    onInteraction?.();
  };

  // Handle like
  const handleLikeClick = async () => {
    const success = await onLike();
    if (success) {
      setLikedState((prev) => !prev);
      console.log('Like toggled:', !likedState);
      onInteraction?.();
    }
  };

  // Handle favourite
  const handleFavouriteClick = async () => {
    const success = await onFavourite();
    if (success) {
      setFavouritedState((prev) => !prev);
      setShareMessage(favouritedState ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
      console.log('Favourite toggled:', !favouritedState);
    } else {
      setShareMessage('خطا در تغییر وضعیت ذخیره');
      console.log('Favourite toggle failed');
    }
    onInteraction?.();
  };

  // Handle share
  const handleShareClick = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: data?.title || 'Check out this audio!',
      text: `Listen to "${data?.title || 'this audio'}" on Lahzeh!`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('لینک با موفقیت به اشتراک گذاشته شد!');
        console.log('Shared via navigator.share');
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('لینک در کلیپ‌بورد کپی شد!');
        console.log('Copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setShareMessage('خطا در اشتراک‌گذاری');
    }
    onInteraction?.();
  };

  // Handle tab click
  const handleTabClick = (tab: 'main' | 'effects') => {
    setActiveTab(tab);
    onInteraction?.();
    console.log('Tab switched to:', tab);
  };

  // Get sound icon
  const getSoundIcon = (title: string, isPlaying: boolean) => {
    const lowerTitle = title.toLowerCase();
    const iconClass = `w-5 h-5 ${isPlaying ? 'text-white' : 'text-white/60'}`;
    if (lowerTitle.includes('کودک')) return <GiBabyFace className={iconClass} />;
    if (lowerTitle.includes('جیرجیرک')) return <BsCloudRain className={iconClass} />;
    if (lowerTitle.includes('دریا')) return <BsWater className={iconClass} />;
    if (lowerTitle.includes('پرنده')) return <GiBabyFace className={iconClass} />;
    return <HiOutlineSpeakerWave className={iconClass} />;
  };

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    const soundAudioRefsCurrent = soundAudioRefs.current;
    const timer = timerRef.current; // Copy timerRef.current to a local variable
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      if (audio) {
        audio.pause();
      }
      Object.values(soundAudioRefsCurrent).forEach((soundAudio) => {
        if (soundAudio) soundAudio.pause();
      });
      if (audioContextRef.current) {
        audioContextRef.current.close().then(() => {
          console.log('AudioContext closed');
        });
        audioContextRef.current = null;
      }
    };
  }, []);

  // Log audio status for debugging
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log('Audio element status:', {
        src: audio.src,
        duration: audio.duration,
        currentTime: audio.currentTime,
        volume: audio.volume,
        muted: audio.muted,
        paused: audio.paused,
        error: audio.error,
      });
    }
  }, [isNarrationPlaying]);

  return (
    <div className="p-8 flex flex-col items-center justify-between w-full h-full">
      <audio
        ref={audioRef}
        src={data?.narration?.file_path}
        preload="auto"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('Audio element error:', e);
          setShareMessage('خطا در بارگذاری فایل صوتی');
          setIsNarrationPlaying(false);
          onInteraction?.();
        }}
      />
      {data?.sounds?.map((sound: Sound) => (
        <audio
          key={sound.id}
          ref={(el: HTMLAudioElement | null) => {
            soundAudioRefs.current[sound.id] = el;
          }}
          src={sound.file_path}
          preload="auto"
          loop
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('Sound audio element error:', e);
            setShareMessage('خطا در بارگذاری افکت صوتی');
            onInteraction?.();
          }}
        />
      ))}
      <div className="flex flex-col items-center justify-between w-full h-full">
        {shareMessage && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg z-[50]">
            {shareMessage}
          </div>
        )}
        <div className="w-full flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleTabClick('main')}
            onTouchStart={() => handleTabClick('main')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-[50] ${
              activeTab === 'main' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
            }`}
          >
            <HiOutlineMusicalNote className="w-5 h-5" />
            <span className="text-sm">پخش‌کننده اصلی</span>
          </button>
          <button
            onClick={() => handleTabClick('effects')}
            onTouchStart={() => handleTabClick('effects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 z-[50] ${
              activeTab === 'effects' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
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
                <AudioPlayerCircle
                  isPlaying={isNarrationPlaying}
                  onPlayPause={handleNarrationPlayPause}
                  audioRef={audioRef}
                  onInteraction={onInteraction}
                  audioContext={audioContextRef.current}
                  narrationGainNode={narrationGainNodeRef.current}
                />
              </div>
            </div>
            <div className="w-4/5 flex flex-row justify-between mt-2">
              <button
                onClick={handleLikeClick}
                className="bg-[#0000006e] rounded-[100%] p-2 border border-gray-500 hover:bg-red-600/50 transition-colors flex items-center gap-1"
              >
                {likedState ? (
                  <HiHeart className="w-6 h-6 text-red-500" />
                ) : (
                  <HiOutlineHeart className="w-6 h-6 text-white" />
                )}
              </button>
              <div className="bg-[#0000006e] rounded-[100%] p-2 border border-gray-500">
                <HiOutlineChartBar className="w-6 h-6" />
              </div>
              <button
                onClick={handleShareClick}
                className="bg-[#0000006e] rounded-[100%] p-2 border border-gray-500 hover:bg-blue-600/50 transition-colors"
              >
                <HiOutlineShare className="w-6 h-6" />
              </button>
              <button
                onClick={handleFavouriteClick}
                className="bg-[#0000006e] rounded-[100%] p-2 border border-gray-500 hover:bg-yellow-600/50 transition-colors flex items-center gap-1"
              >
                {favouritedState ? (
                  <HiBookmark className="w-6 h-6 text-yellow-500" />
                ) : (
                  <HiOutlineBookmark className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            {Array.isArray(data.sounds) && data.sounds.length > 0 ? (
              <div className="flex flex-col gap-6">
                {data.sounds.map((sound: Sound) => (
                  <div key={sound.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">{sound.title}</span>
                      <button
                        onClick={() => handleSoundPlayPause(sound.id)}
                        className={`text-white p-2 rounded-full border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 ${
                          soundStates[sound.id]?.isPlaying ? 'bg-white/10' : ''
                        }`}
                      >
                        {getSoundIcon(sound.title, soundStates[sound.id]?.isPlaying || false)}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineSpeakerWave className="w-4 h-4 text-white/60" />
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={soundStates[sound.id]?.volume || 0}
                          onChange={(e) => handleSoundVolumeChange(sound.id, e)}
                          onClick={(e) => handleSoundClick(sound.id, e)}
                          className={[
                            'w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer safari-track',
                            '[&::-webkit-slider-thumb]:appearance-none',
                            '[&::-webkit-slider-thumb]:w-4',
                            '[&::-webkit-slider-thumb]:h-4',
                            '[&::-webkit-slider-thumb]:bg-white',
                            '[&::-webkit-slider-thumb]:rounded-full',
                            '[&::-webkit-slider-thumb]:cursor-pointer',
                            '[&::-webkit-slider-thumb]:transition-all',
                            '[&::-webkit-slider-thumb]:hover:scale-125',
                            '[&::-webkit-slider-thumb]:hover:bg-white/90',
                            '[&::-webkit-slider-thumb]:active:scale-150',
                            '[&::-webkit-slider-thumb]:active:bg-white',
                            '[&::-webkit-slider-thumb]:shadow-lg',
                            '[&::-webkit-slider-thumb]:border-none',
                            '[&::-moz-range-thumb]:appearance-none',
                            '[&::-moz-range-thumb]:w-4',
                            '[&::-moz-range-thumb]:h-4',
                            '[&::-moz-range-thumb]:bg-white',
                            '[&::-moz-range-thumb]:rounded-full',
                            '[&::-moz-range-thumb]:cursor-pointer',
                            '[&::-moz-range-thumb]:border-none',
                            '[&::-moz-range-track]:bg-white/20',
                            '[&::-moz-range-track]:h-2',
                            '[&::-moz-range-track]:rounded-full',
                          ].join(' ')}
                          style={{
                            background: `linear-gradient(to right, white 0%, white ${
                              (soundStates[sound.id]?.volume || 0) * 100
                            }%, rgba(255,255,255,0.2) ${
                              (soundStates[sound.id]?.volume || 0) * 100
                            }%, rgba(255,255,255,0.2) 100%)`,
                          }}
                          dir="ltr"
                        />
                      </div>
                      <span className="text-white/60 text-xs w-8 text-center">
                        {Math.round((soundStates[sound.id]?.volume || 0) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white/80 text-center text-sm">هیچ افکت صوتی موجود نیست</div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .safari-track {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
        }

        .safari-track::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          height: 8px;
          border-radius: 4px;
        }

        .safari-track::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: none;
          margin-top: -4px;
        }

        .safari-track::-moz-range-track {
          background: rgba(255, 255, 255, 0.2);
          height: 8px;
          border-radius: 4px;
          border: none;
        }

        .safari-track::-moz-range-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        @supports (-webkit-touch-callout: none) {
          .safari-track {
            height: 30px;
            -webkit-appearance: none;
            background: transparent;
          }

          .safari-track::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;