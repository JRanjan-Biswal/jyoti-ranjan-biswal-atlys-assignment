import React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      className={cn(
        "rounded-md px-4 py-3 shadow-lg transition-all duration-300 ease-out transform",
        "flex items-center justify-between gap-2 min-w-[300px] max-w-[400px]",
        type === 'success' && "bg-green-50 text-green-800 border border-green-200",
        type === 'error' && "bg-red-50 text-red-800 border border-red-200",
        type === 'info' && "bg-blue-50 text-blue-800 border border-blue-200"
      )}
    >
      <div className="flex items-center gap-2">
        {type === 'success' && (
          <svg className="w-5 h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-5 h-5 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )}
        {type === 'info' && (
          <svg className="w-5 h-5 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className={cn(
          "p-1 rounded-md transition-colors",
          type === 'success' && "hover:bg-green-100",
          type === 'error' && "hover:bg-red-100",
          type === 'info' && "hover:bg-blue-100"
        )}
      >
        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};