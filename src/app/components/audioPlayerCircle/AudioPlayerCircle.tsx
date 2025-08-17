'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';

type AudioPlayerProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onInteraction?: () => void;
  audioContext: AudioContext | null;
  narrationGainNode: GainNode | null;
};

const AudioPlayerCircle: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onPlayPause,
  audioRef,
  onInteraction,
  audioContext,
  narrationGainNode,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const radius = 45;
  const center = 50;
  const circumference = 2 * Math.PI * radius;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isDragging) return;
    const current = audio.currentTime;
    const dur = audio.duration;
    if (dur > 0 && !isNaN(dur)) {
      setProgress((current / dur) * 100);
      setDuration(dur);
    }
  }, [audioRef, isDragging]);

  // تعریف updateAudioTime قبل از handleDragMove
  const updateAudioTime = useCallback(
    (progressPercent: number, shouldPlay: boolean) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;

      const newTime = progressPercent * audio.duration;
      audio.currentTime = newTime;
      setProgress(progressPercent * 100);
      console.log('Audio time updated to:', newTime, 'seconds');

      if (shouldPlay && isPlaying) {
        setIsBuffering(true);
        audio.play().then(() => {
          console.log('Played audio after time update');
          setIsBuffering(false);
        }).catch((error) => {
          console.error('Error playing audio:', error);
          setIsBuffering(false);
        });
      }
    },
    [audioRef, isPlaying]
  );

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (narrationGainNode && audioContext) {
      narrationGainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
      console.log('Volume set via Web Audio API:', newVolume);
    } else if (audioRef.current) {
      audioRef.current.volume = newVolume;
      console.log('Volume set via HTML5 audio:', newVolume);
    }
    onInteraction?.();
  };

  const handlePlayPause = () => {
    onPlayPause();
    onInteraction?.();
  };

  const calculateProgressFromEvent = (clientX: number, clientY: number) => {
    if (!svgRef.current) return 0;

    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX);
    angle = (angle * 180 / Math.PI + 90) % 360;
    if (angle < 0) angle += 360;

    const progressPercent = angle / 360;

    console.log('Click position:', { clientX, clientY, centerX, centerY });
    console.log('Calculated angle:', angle, 'Progress:', progressPercent * 100);

    return progressPercent;
  };

  const handleDragStart = (e: React.PointerEvent<SVGCircleElement> | React.TouchEvent<SVGCircleElement>) => {
    e.preventDefault();
    if (!svgRef.current) {
      console.error('svgRef is null');
      return;
    }

    console.log('Drag start triggered');
    setIsDragging(true);

    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      console.log('Paused audio during drag');
    }

    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.PointerEvent).clientX;
      clientY = (e as React.PointerEvent).clientY;
      svgRef.current.setPointerCapture((e as React.PointerEvent).pointerId);
    }

    onInteraction?.();
    const progressPercent = calculateProgressFromEvent(clientX, clientY);
    updateAudioTime(progressPercent, false);
  };

  const handleDragMove = useCallback(
    (e: Event) => {
      if (!isDragging || !svgRef.current) return;
      e.preventDefault();

      let clientX, clientY;
      if ('touches' in e && (e as TouchEvent).touches.length > 0) {
        clientX = (e as TouchEvent).touches[0].clientX;
        clientY = (e as TouchEvent).touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as PointerEvent).clientX;
        clientY = (e as PointerEvent).clientY;
      } else {
        return;
      }

      const progressPercent = calculateProgressFromEvent(clientX, clientY);
      updateAudioTime(progressPercent, false);
    },
    [isDragging, updateAudioTime]
  );

  const handleDragEnd = useCallback(
    (e: Event) => {
      if (!isDragging) return;
      console.log('Drag end triggered');

      if (svgRef.current && 'pointerId' in e) {
        svgRef.current.releasePointerCapture((e as PointerEvent).pointerId);
      }

      setIsDragging(false);
      const audio = audioRef.current;

      if (audio && isPlaying) {
        setIsBuffering(true);
        const checkBuffer = () => {
          if (!audio) return;
          const buffered = audio.buffered;
          const currentTime = audio.currentTime;
          let isBuffered = false;

          for (let i = 0; i < buffered.length; i++) {
            if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
              isBuffered = true;
              break;
            }
          }

          if (isBuffered) {
            audio.play().then(() => {
              console.log('Resumed audio after drag');
              setIsBuffering(false);
            }).catch((error) => {
              console.error('Error resuming audio:', error);
              setIsBuffering(false);
            });
          } else {
            console.log('Waiting for buffer at:', currentTime);
            setTimeout(checkBuffer, 100);
          }
        };
        checkBuffer();
      }

      onInteraction?.();
    },
    [isDragging, isPlaying, audioRef, onInteraction]
  );

  const handleCircleClick = (e: React.PointerEvent<SVGCircleElement> | React.TouchEvent<SVGCircleElement>) => {
    if (isDragging) return;

    e.preventDefault();
    e.stopPropagation();

    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.PointerEvent).clientX;
      clientY = (e as React.PointerEvent).clientY;
    }

    const progressPercent = calculateProgressFromEvent(clientX, clientY);
    updateAudioTime(progressPercent, true);
    onInteraction?.();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log('Audio duration loaded:', audio.duration);
    };

    const handleEnded = () => {
      onPlayPause();
      setProgress(0);
      console.log('Audio ended');
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsBuffering(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsBuffering(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioRef, onPlayPause, updateProgress]);

  useEffect(() => {
    if (isDragging && typeof window !== 'undefined') {
      window.addEventListener('pointermove', handleDragMove);
      window.addEventListener('pointerup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('pointermove', handleDragMove);
        window.removeEventListener('pointerup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      }
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const angle = (progress / 100) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  const markerX = center + radius * Math.cos(rad);
  const markerY = center + radius * Math.sin(rad);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <p className="text-gray-300 text-lg font-semibold">
        {isBuffering ? 'Buffering...' : `${formatTime(audioRef.current?.currentTime || 0)} / ${formatTime(duration || 0)}`}
      </p>

      <div className="relative w-60 h-60" style={{ touchAction: 'none' }}>
        {isPlaying && !isBuffering && (
          <>
            <div className="pulse-circle" />
            <div className="pulse-circle" style={{ animationDelay: '0.2s' }} />
            <div className="pulse-circle" style={{ animationDelay: '0.6s' }} />
            <div className="pulse-circle" style={{ animationDelay: '0.8s' }} />
          </>
        )}

        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          viewBox="0 0 100 100"
          style={{ touchAction: 'none', pointerEvents: 'auto' }}
        >
          <circle cx={center} cy={center} r={radius} stroke="white" strokeWidth="0.8" fill="none" />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            style={{
              transition: isDragging ? 'none' : 'stroke-dashoffset 0.1s linear',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="transparent"
            strokeWidth="15"
            fill="none"
            onPointerDown={handleDragStart}
            onTouchStart={handleDragStart}
            onPointerUp={handleCircleClick}
            onTouchEnd={handleCircleClick}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          />
          <circle
            cx={markerX}
            cy={markerY}
            r={isDragging ? "6" : "4"}
            fill={isDragging ? "#ff4444" : "white"}
            stroke="white"
            strokeWidth="2"
            onPointerDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ cursor: 'grab', pointerEvents: 'auto' }}
          />
        </svg>

        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-transparent z-10"
        >
          {isPlaying ? (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full flex items-center justify-center mt-4" dir="ltr">
        <HiMiniSpeakerXMark color="gray" size={30} className="m-2" />
        <div className="flex-1 relative mx-4">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider w-full"
            style={{
              background: `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`,
            }}
          />
        </div>
        <HiMiniSpeakerWave color="white" size={30} className="m-2" />
      </div>

      <style jsx>{`
        .volume-slider {
          height: 6px;
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          border: none;
        }

        .volume-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .volume-slider::-moz-range-track {
          background: transparent;
          border: none;
        }

        @media (hover: none) and (pointer: coarse) {
          .volume-slider {
            height: 8px;
          }

          .volume-slider::-webkit-slider-thumb {
            height: 20px;
            width: 20px;
          }

          .volume-slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
          }
        }

        .pulse-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid white;
          opacity: 0.1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
          40% {
            transform: scale(2);
            opacity: 0.01;
          }
          70% {
            transform: scale(3);
            opacity: 0.001;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayerCircle;