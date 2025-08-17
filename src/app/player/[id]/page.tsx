'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import Preloader from '@/app/preloader/page';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import { useParams } from 'next/navigation';
import { MusicPlayer } from '@/app/components/musicPlayer/musicPlayer';
import Cookies from 'js-cookie';
import PremiumGlassModal from '@/app/components/modals/PremiumGlassModal';
import PostNotFoundModal from '@/app/components/modals/PostNotFoundModal';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

type Narration = {
  id: number;
  title: string;
  file_path: string;
  description?: string;
  active: number;
  create_dates: {
    created_human: string;
    created_at: string;
  };
};

type Video = {
  id: number;
  title: string;
  file_path: string;
  description?: string;
  active: number;
  create_dates: {
    created_human: string;
    created_at: string;
  };
};

type Sound = {
  id: number;
  title: string;
  file_path: string;
  description?: string;
  active: number;
  create_dates: {
    created_human: string;
    created_at: string;
  };
};

type PostData = {
  id: number;
  title: string;
  poster?: string;
  content?: string;
  narration?: Narration;
  video?: Video;
  sounds: Sound[];
  premium: number;
  active: number;
  likes?: number;
  create_dates: {
    created_human: string;
    created_at: string;
  };
};

export default function Player() {
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isPremiumOnly, setIsPremiumOnly] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const params = useParams();
  const id = params?.id as string; // Type assertion
  const router = useRouter();

  // هدایت به صفحه اشتراک برای محتوای پریمیوم
  const handleSubscribe = () => {
    router.push('/subscriptions');
  };

  useEffect(() => {
    if (!id) {
      console.warn('Post ID is undefined.');
      setIsLoading(false);
      return;
    }

    const token = Cookies.get('access_token');
    if (!token) {
      console.warn('توکن یافت نشد');
      setIsLoading(false);
      return;
    }

    // دریافت اطلاعات پست
    const fetchPost = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.postById(id), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
          cache: 'no-store',
        });

        if (res.status === 403) {
          console.warn('Post is premium-only:', res.statusText);
          setIsPremiumOnly(true);
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          console.error('Error fetching post:', res.status, res.statusText);
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        setPostData(json.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setIsLoading(false);
      }
    };

    // بررسی وضعیت لایک
    const checkIfLiked = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.postLiked(id), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('Error checking liked status:', res.statusText);
          return;
        }

        const json = await res.json();
        setIsLiked(json.liked || false);
      } catch (error) {
        console.error('Error checking liked status:', error);
      }
    };

    // بررسی وضعیت فیووریت
    const checkIfFavourited = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.postFavourited(id), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('Error checking favourited status:', res.statusText);
          return;
        }

        const json = await res.json();
        setIsFavourited(json.favourited || false);
      } catch (error) {
        console.error('Error checking favourited status:', error);
      }
    };

    // اجرای درخواست‌ها
    fetchPost();
    checkIfLiked();
    checkIfFavourited();
  }, [id]);

  // مدیریت لایک/آنلایک
  const handleLike = async () => {
    const token = Cookies.get('access_token');

    if (!token || !id) {
      console.warn('No token or post ID found.');
      return false;
    }

    try {
      const res = await fetch(API_ENDPOINTS.postLike(id), {
        method: 'POST',
        ...apiHelpers.getRequestConfig(token),
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error(`Error ${isLiked ? 'unliking' : 'liking'}:`, res.statusText);
        return false;
      }

      const json = await res.json();
      if (json.message === 'Successful') {
        setIsLiked(!isLiked);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'}:`, error);
      return false;
    }
  };

  // مدیریت فیووریت/آنفیووریت
  const handleFavourite = async () => {
    const token = Cookies.get('access_token');

    if (!token || !id) {
      console.warn('No token or post ID found.');
      return false;
    }

    try {
      const res = await fetch(API_ENDPOINTS.postFavourite(id), {
        method: 'POST',
        ...apiHelpers.getRequestConfig(token),
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error(`Error ${isFavourited ? 'unfavouriting' : 'favouriting'}:`, res.statusText);
        return false;
      }

      const json = await res.json();
      if (json.message === 'Successful') {
        setIsFavourited(!isFavourited);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Error ${isFavourited ? 'unfavouriting' : 'favouriting'}:`, error);
      return false;
    }
  };

  // مدیریت خطاهای پلیر
  const handlePlayerError = (error: any) => {
    console.error('Video player error:', error);
  };

  // نمایش لودر در حالت بارگذاری
  if (isLoading) {
    return <Preloader />;
  }

  // نمایش مودال پریمیوم در صورت محتوای پریمیوم
  if (isPremiumOnly) {
    return <PremiumGlassModal onSubscribe={handleSubscribe} />;
  }

  // نمایش مودال پست یافت نشد
  if (!id || !postData) {
    return <PostNotFoundModal />;
  }

  // نمایش محتوای اصلی (ویدیو و موزیک پلیر)
  return (
    <div className="flex h-[100vh] w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#001B22] to-[#333]">
      <div className="flex flex-col items-center w-full xl:w-1/2 xl:p-5 rounded-[8px] relative flex-1 max-h-full">
        {/* ReactPlayer برای پخش ویدیو */}
        <ReactPlayer
          ref={playerRef}
          url={postData?.video?.file_path || '/images/default/default.mp4'}
          playing={true} // پخش خودکار
          loop={true} // لوپ فعال
          muted={true}
          width="100%"
          height="100%"
          playsinline={true}
          controls={false}
          pip={false}
          config={{
            file: {
              attributes: {
                style: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                playsInline: true,
                'webkit-playsinline': '',
                preload: 'auto', // بارگذاری خودکار
                loop: true, // لوپ در سطح المنت
                muted: true,
              },
              forceVideo: true,
              hlsOptions: {
                autoStartLoad: true,
                capLevelToPlayerSize: true,
              },
            },
          }}
          onError={handlePlayerError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            backgroundColor: '#000', // پس‌زمینه مشکی برای جلوگیری از فلش
          }}
          wrapper={({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
            <div
              {...props}
              style={{
                ...props.style,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                backgroundColor: '#000', // پس‌زمینه مشکی
              }}
            >
              {children}
            </div>
          )}
        />
        
        {/* Music Player Interface */}
        <div className="relative z-[2] w-full">
          <MusicPlayer
            data={postData}
            postId={id}
            onLike={handleLike}
            isLiked={isLiked}
            onFavourite={handleFavourite}
            isFavourited={isFavourited}
          />
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}