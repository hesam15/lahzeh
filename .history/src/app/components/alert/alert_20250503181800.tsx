import React, { JSX, useEffect } from 'react';

type AlertType = string;

interface AlertProps {
  type?: AlertType;
  message: string; // فقط متن پیام
  show: boolean;
  onClose: () => void;
  duration?: number; // ms
}

const typeStyles: Record<AlertType, string> = {
  success: 'border-t-4 border-green-500 text-green-900 bg-green-50 shadow-md',
  error: 'border-t-4 border-red-500 text-red-900 bg-red-50 shadow-md',
  warning: 'border-t-4 border-yellow-500 text-yellow-900 bg-yellow-50 shadow-md',
  info: 'border-t-4 border-blue-500 text-blue-900 bg-blue-50 shadow-md',
};

const icons: Record<AlertType, JSX.Element> = {
  success: (
    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.516 11.6c.75 1.334-.213 3-1.742 3H3.483c-1.53 0-2.492-1.666-1.742-3l6.516-11.6zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-1a1 1 0 112 0v5a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
        clipRule="evenodd"
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
      className={`fixed top-5 right-5 z-50 w-[90%] max-w-sm px-4 py-3 rounded-md flex items-start gap-3 transition-all duration-300 ${typeStyles[type]}`}
    >
      <div className="mt-1">{icons[type]}</div>
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
