import React, { useEffect } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const typeStyles: Record<AlertType, string> = {
  success: 'border-t-4 border-green-500 text-green-900 shadow-md',
  error: 'border-t-4 border-red-500 text-red-900 shadow-md',
  warning: 'border-t-4 border-yellow-500 text-yellow-900 shadow-md',
  info: 'border-t-4 border-blue-500 text-blue-900 shadow-md',
};

fillRule="evenodd"


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
      className={`fixed top-5 right-5 z-50 w-[90%] max-w-sm px-4 py-3 bg-white rounded-md flex items-start gap-3 transition-all duration-300 ${typeStyles[type]}`}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm">{message}</div>
      <button
        onClick={onClose}
        className="ml-2 text-xl font-bold leading-none opacity-60 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};
