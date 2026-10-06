'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { heroLiveCards } from '@/lib/market-data';
import { ParallaxCard } from './ParallaxCard';
import {
  Download,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenDownloadModal?: () => void;
}

export function Hero({ onOpenDownloadModal }: HeroProps) {
  const { language, t, denomination } = useApp();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-50/60 via-white to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 transition-colors">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/10 via-indigo-500/10 to-transparent blur-3xl dark:from-blue-600/15 dark:via-cyan-600/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Live Syrian Market Data badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm dark:border-blue-900/70 dark:bg-blue-950/60 dark:text-blue-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl dark:text-white leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              <span className="block text-slate-800 dark:text-slate-100">
                {t.hero.titleLine1}
              </span>
              <span className="mt-1 block bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300">
                {t.hero.titleLine2}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                onClick={onOpenDownloadModal}
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                <span>{t.hero.downloadCta}</span>
              </button>

              <a
                href="#markets"
                className="group flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-95"
              >
                <span>{t.hero.viewRatesCta}</span>
                <ArrowRight
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                    language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''
                  }`}
                />
              </a>
            </motion.div>

            {/* Social Proof / Security Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Damascus & Aleppo Trading Desks</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Multi-Source Aggregation</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 4 Live Market Rate Cards with 3D Parallax */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {heroLiveCards.map((card, idx) => (
                <ParallaxCard
                  key={card.id}
                  intensity={12}
                  className="w-full transform-gpu transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-blue-950/50"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800/90 dark:bg-slate-900/90"
                  >
                    {/* Top Row: Title, Flag & Live Update Pulse */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-label={card.code}>
                          {card.flag}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                            {language === 'ar' ? card.nameAr : card.nameEn}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{t.hero.liveUpdated.replace('{sec}', card.updated)}</span>
                      </div>
                    </div>

                    {/* Middle: Buy Rate, Sell Rate & Trend columns */}
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                      {/* Buy Rate */}
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">
                          {t.hero.buyRate}
                        </div>
                        <div className="mt-0.5 font-bold tabular-nums text-slate-900 dark:text-white text-xs sm:text-sm">
                          {denomination === 'old' && card.code !== 'GOLD'
                            ? `${card.buyRate}k`
                            : card.buyRate}
                        </div>
                        {card.subBuyRate && (
                          <div className="text-[9px] text-slate-400 truncate font-mono">
                            {card.subBuyRate}
                          </div>
                        )}
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {card.buyChange}
                        </span>
                      </div>

                      {/* Sell Rate */}
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">
                          {t.hero.sellRate}
                        </div>
                        <div className="mt-0.5 font-bold tabular-nums text-slate-900 dark:text-white text-xs sm:text-sm">
                          {denomination === 'old' && card.code !== 'GOLD'
                            ? `${card.sellRate}k`
                            : card.sellRate}
                        </div>
                        {card.subSellRate && (
                          <div className="text-[9px] text-slate-400 truncate font-mono">
                            {card.subSellRate}
                          </div>
                        )}
                        <span
                          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                            card.isSellPositive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-500 dark:text-rose-400'
                          }`}
                        >
                          {card.sellChange}
                        </span>
                      </div>

                      {/* Trend 24h mini sparkline */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 text-right">
                          {t.hero.trend24h}
                        </div>
                        <div className="h-9 w-16">
                          <svg
                            viewBox="0 0 70 30"
                            className="h-full w-full overflow-visible"
                          >
                            <polyline
                              fill="none"
                              stroke={card.isSellPositive ? '#10b981' : '#f43f5e'}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={card.sparkline
                                .map((val, i) => `${i * 11},${30 - (val / 65) * 26}`)
                                .join(' ')}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ParallaxCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
