'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { tickerRates } from '@/lib/market-data';
import {
  Moon,
  Sun,
  Globe,
  Download,
  Menu,
  X,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenDownloadModal?: () => void;
}

export function Header({ onOpenDownloadModal }: HeaderProps) {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    denomination,
    toggleDenomination,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200 border-b border-slate-200/80 bg-white/90 dark:bg-slate-950/90 dark:border-slate-800/80">
      {/* Top Ticker Ribbon */}
      <div className="w-full overflow-hidden border-b border-slate-100 bg-slate-50/90 py-1.5 text-xs text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/80 dark:text-slate-400">
        <div className="relative flex items-center">
          <div className="animate-ticker flex items-center gap-6 whitespace-nowrap pl-4">
            {/* Repeat list twice for seamless infinite marquee loop */}
            {[...tickerRates, ...tickerRates].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-1.5 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {item.name}
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-mono">
                  {item.symbol}
                </span>
                <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200">
                  {item.rate}
                </span>
                <span
                  className={`text-[10px] font-semibold tabular-nums ${
                    item.change.startsWith('+')
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-500 dark:text-rose-400'
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-slate-300 dark:text-slate-700 ml-3">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20">
              <span className="font-black text-sm tracking-wider">LS</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {t.brandName}
                </span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                {t.brandTagline}
              </span>
            </div>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#markets"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.markets}
          </a>
          <a
            href="#calculator"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.calculators}
          </a>
          <a
            href="#ai-assistant"
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>{t.nav.aiAssistant}</span>
          </a>
          <a
            href="#news"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.news}
          </a>
        </nav>

        {/* Right Controls Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Denomination Switcher (New SYP / Old SYP) */}
          <button
            onClick={toggleDenomination}
            title="Toggle denomination display"
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Layers className="h-3.5 w-3.5 text-slate-500" />
            <span>{denomination === 'new' ? t.nav.newSyp : t.nav.oldSyp}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-slate-700 transition-transform hover:rotate-12" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Globe className="h-3.5 w-3.5 text-blue-500" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Download App CTA Button */}
          <button
            onClick={onOpenDownloadModal}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700 active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.nav.downloadApp}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 md:hidden dark:border-slate-800 dark:text-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav className="flex flex-col gap-3 font-medium text-slate-700 dark:text-slate-200">
              <a
                href="#markets"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t.nav.markets}
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t.nav.calculators}
              </a>
              <a
                href="#ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <span>{t.nav.aiAssistant}</span>
                <Sparkles className="h-4 w-4 text-blue-500" />
              </a>
              <a
                href="#news"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {t.nav.news}
              </a>

              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-500">Denomination</span>
                <button
                  onClick={toggleDenomination}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700"
                >
                  {denomination === 'new' ? t.nav.newSyp : t.nav.oldSyp}
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDownloadModal) onOpenDownloadModal();
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20"
              >
                <Download className="h-4 w-4" />
                <span>{t.nav.downloadApp}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
