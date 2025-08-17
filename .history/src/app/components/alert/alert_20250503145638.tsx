import React, { useEffect } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number; // زمان برای بسته‌شدن خودکار (ms)
}

const typeStyles: Record<AlertType, string> = {
    success:
      'bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-500 text-green-900 shadow-md',
    error:
      'bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-500 text-red-900 shadow-md',
    warning:
      'bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-500 text-yellow-900 shadow-md',
    info:
      'bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500 text-blue-900 shadow-md',
  };
  

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  show,
  onClose,
  duration = 0,
}) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-5 right-5 -translate-x-1/2 z-50 w-[90%] max-w-sm border px-4 py-3 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 ${typeStyles[type]}`}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold leading-none opacity-60 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};
