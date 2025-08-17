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
  success: 'bg-green-100 border-green-500 text-green-800',
  error: 'bg-red-100 border-red-500 text-red-800',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
  info: 'bg-blue-100 border-blue-500 text-blue-800',
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
