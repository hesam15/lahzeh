'use client';

import BottomNavbar from '../bottomNavbar/bottomNavbar';

export default function PostNotFoundModal() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden rtl relative pb-[100px] bg-transparent">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="relative z-10 mx-4 max-w-md w-full">
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-xl"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-red-400 to-orange-500 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white mb-2">
                پست یافت نشد
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                متأسفانه پستی با این شناسه پیدا نشد یا ممکن است حذف شده باشد.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}