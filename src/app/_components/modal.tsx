'use client';

import { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
          >
            <span className="sr-only">Kapat</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
} 