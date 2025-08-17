'use client';

import BottomNavbar from '../bottomNavbar/bottomNavbar';

type PremiumGlassModalProps = {
  onSubscribe: () => void;
};

export default function PremiumGlassModal({ onSubscribe }: PremiumGlassModalProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden rtl relative pb-[100px] bg-transparent">
      {/* Background Video Blur Effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Glass Container */}
      <div className="relative z-10 mx-4 max-w-md w-full px-4">
        {/* Main Glass Card */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 blur-xl"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            {/* Crown Icon with Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 3h5.5l1.5 5 1.5-5H17l-2 13H5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white mb-2">
                محتوای پریمیوم
              </h2>
              <div className="flex items-center justify-center gap-2 text-yellow-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium">ویژه اعضای پریمیوم</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/80 text-base leading-relaxed">
              این محتوا فقط برای کاربران پریمیوم در دسترس است. برای دسترسی به تمام امکانات و محتوای اختصاصی، اشتراک پریمیوم تهیه کنید.
            </p>

            {/* Features List */}
            <div className="bg-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-sm">دسترسی به تمام محتوای پریمیوم</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                <span className="text-sm">کیفیت بالاتر صوتی و تصویری</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                <span className="text-sm">بدون تبلیغات</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onSubscribe}
              className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-orange-500/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-lg">خرید اشتراک پریمیوم</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>

            {/* Additional Info */}
            <p className="text-white/60 text-xs">
              با خرید اشتراک، به تمام امکانات پریمیوم دسترسی خواهید داشت
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>
      <BottomNavbar />
    </div>
  );
}