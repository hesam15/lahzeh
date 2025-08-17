'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/app/preloader/page';
import BottomNavbar from '@/app/components/bottomNavbar/bottomNavbar';
import Cookies from 'js-cookie';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  invoice_period: number;
  invoice_interval: string;
  currency: string;
  active: boolean;
};

// تابع فرمت قیمت
const formatPrice = (price: number, currency: string): string => {
  if (currency.toLowerCase() === 'toman' || currency.toLowerCase() === 'irr') {
    // اضافه کردن 3 صفر
    const adjustedPrice = price * 1000;
    // فرمت با نقطه بین هر 3 رقم
    const formatted = adjustedPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} تومان`;
  }
  // فرمت انگلیسی با کاما
  return `${price.toLocaleString('en-US')} ${currency}`;
};

// تابع تبدیل interval به فارسی
const formatInterval = (interval: string): string => {
  return interval.toLowerCase() === 'month' ? 'ماه' : interval;
};

export default function Subscriptions() {
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      console.warn('توکن یافت نشد');
      setError('لطفاً ابتدا وارد حساب کاربری خود شوید.');
      setIsLoading(false);
      return;
    }

    const fetchPlans = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.subscriptionPlans(), {
          method: 'GET',
          ...apiHelpers.getRequestConfig(token),
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('Error fetching plans:', res.status, res.statusText);
          setError('خطا در دریافت پلن‌های اشتراک.');
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        setPlans(json.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error network fetching plans:', error);
        setError('خطا در ارتباط با سرور.');
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePurchase = async () => {
    // Note: Backend route for subscribing to plans does not exist
    // This needs to be implemented in backend: POST /api/user/subscribe/{planId}
    setPurchaseMessage('قابلیت خرید اشتراک هنوز در بک‌اند پیاده‌سازی نشده است.');
    setTimeout(() => setPurchaseMessage(null), 3000);
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="text-white text-center min-h-screen flex items-center justify-center bg-gradient-to-b from-[#007994] to-[#00333E]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#007994] to-[#00333E] flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        {purchaseMessage && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg z-[50]">
            {purchaseMessage}
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-8 text-right">پلن‌های اشتراک</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-white text-lg font-semibold text-right">{plan.name}</h2>
                  <p className="text-white/80 text-sm mt-2 text-right">
                    قیمت: {formatPrice(plan.price, plan.currency)}
                  </p>
                  <p className="text-white/80 text-sm text-right">
                    دوره: هر {plan.invoice_period} {formatInterval(plan.invoice_interval)}
                  </p>
                  <p className="text-white/80 text-sm text-right">
                    وضعیت: {plan.active ? 'فعال' : 'غیرفعال'}
                  </p>
                </div>
                <button
                  onClick={() => handlePurchase()}
                  disabled={!plan.active}
                  className={`mt-4 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    plan.active
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-gray-500/50 text-white/60 cursor-not-allowed'
                  }`}
                >
                  {plan.active ? 'خرید پلن' : 'غیرقابل خرید'}
                </button>
              </div>
            ))
          ) : (
            <div className="text-white/80 text-center text-sm col-span-full">
              هیچ پلن اشتراکی موجود نیست.
            </div>
          )}
        </div>
      </main>
      <BottomNavbar />
    </div>
  );
}