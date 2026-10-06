'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  X,
  Download,
  Smartphone,
  Check,
  QrCode,
  ShieldCheck,
  Bell,
  Wifi,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const { language, t } = useApp();
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    setDownloadStarted(true);
    // Simulate APK download trigger
    setTimeout(() => {
      setDownloadStarted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-500/20">
            LS
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'تحميل تطبيق ليرة لايف' : 'Download Lira Live App'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ar'
                ? 'الإصدار الأحدث لنظام Android و iOS مع التنبيهات المباشرة'
                : 'Latest release for Android & iOS with instant rate alerts'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex items-start gap-4">
            {/* Mock QR Code */}
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <QrCode className="h-16 w-16 text-slate-800 dark:text-white" />
              <span className="text-[9px] font-bold text-slate-500 mt-1">SCAN QR</span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div className="font-semibold text-slate-900 dark:text-white">
                {language === 'ar' ? 'الميزات الأساسية للتطبيق:' : 'Key App Features:'}
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Bell className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'إشعارات لحظية بتغيرات الصرف وأسعار الذهب'
                    : 'Instant alerts on currency and gold rate movements'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Wifi className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'وضع عدم الاتصال: حفظ آخر أسعار تلقائياً'
                    : 'Offline Mode: caches last verified prices'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'خفيف وسريع وآمن 100%'
                    : 'Lightweight APK (< 12 MB), 100% verified'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            disabled={downloadStarted}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            {downloadStarted ? (
              <>
                <Check className="h-4 w-4 animate-bounce text-emerald-300" />
                <span>
                  {language === 'ar' ? 'جارٍ بدء التحميل...' : 'Starting download...'}
                </span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>
                  {language === 'ar' ? 'تحميل ملف APK المباشر' : 'Download Direct APK'}
                </span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Smartphone className="h-4 w-4 text-slate-500" />
            <span>
              {language === 'ar' ? 'فتح متجر التطبيقات' : 'Open in App Store'}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
