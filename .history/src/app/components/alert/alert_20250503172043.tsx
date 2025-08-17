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

const icons: Record<AlertType, JSX.Element> = {
  success: (
    <svg
      className="w-5 h-5 text-green-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 text-yellow-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M4.93 19h14.14c.89 0 1.34-1.08.71-1.71L13.41 4.59a1 1 0 00-1.82 0L4.22 17.29c-.63.63-.18 1.71.71 1.71z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 text-blue-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
      />
    </svg>
  ),
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
