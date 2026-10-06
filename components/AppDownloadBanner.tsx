'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { ParallaxCard } from './ParallaxCard';
import {
  Bell,
  Sparkles,
  Globe,
  WifiOff,
  CheckCircle2,
  TrendingUp,
  Search,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AppDownloadBannerProps {
  onOpenDownloadModal?: () => void;
}

export function AppDownloadBanner({ onOpenDownloadModal }: AppDownloadBannerProps) {
  const { language, t } = useApp();
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleDownloadClick = () => {
    if (onOpenDownloadModal) {
      onOpenDownloadModal();
    } else {
      setDownloadTriggered(true);
      setTimeout(() => setDownloadTriggered(false), 3000);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Decorative ambient background rings */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Copy & Store Buttons */}
            <div className="lg:col-span-7">
              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {t.appBanner.title}
              </h2>

              <p className="mt-4 max-w-xl text-base sm:text-lg text-blue-100/90 leading-relaxed">
                {t.appBanner.subtitle}
              </p>

              {/* App Store / Google Play Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Google Play */}
                <button
                  onClick={handleDownloadClick}
                  className="flex items-center gap-3 rounded-xl bg-slate-950/80 px-5 py-3 text-white backdrop-blur border border-white/15 transition-all hover:bg-slate-900 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-.926V2.74c0-.348.232-.684.609-.926zm11.241 11.244l2.562 2.562-11.83 6.83 9.268-9.392zm0-2.116L5.582 1.55l11.83 6.83-2.562 2.562zm1.488 1.488l3.197 1.846c.887.512.887 1.344 0 1.856l-3.197 1.846-2.164-2.164 2.164-2.884z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-blue-200">
                      {t.appBanner.getItOn}
                    </div>
                    <div className="text-sm font-bold tracking-tight">
                      {t.appBanner.googlePlay}
                    </div>
                  </div>
                </button>

                {/* Apple Store */}
                <button
                  onClick={handleDownloadClick}
                  className="flex items-center gap-3 rounded-xl bg-slate-950/80 px-5 py-3 text-white backdrop-blur border border-white/15 transition-all hover:bg-slate-900 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.03.63-2.68 1.39-.58.66-1.08 1.74-.94 2.78 1.04.08 2.08-.55 2.7-1.3z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-blue-200">
                      {t.appBanner.downloadOn}
                    </div>
                    <div className="text-sm font-bold tracking-tight">
                      {t.appBanner.appStore}
                    </div>
                  </div>
                </button>
              </div>

              {downloadTriggered && (
                <div className="mt-3 text-xs font-semibold text-emerald-300">
                  ✓ APK download package ready for install.
                </div>
              )}

              {/* Feature Pills */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <Bell className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{t.appBanner.features[0]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{t.appBanner.features[1]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <Globe className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{t.appBanner.features[2]}</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Parallax Mobile Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ParallaxCard intensity={18} className="w-full max-w-[290px]">
                {/* Smartphone Device Frame */}
                <div className="relative mx-auto rounded-[40px] border-[7px] border-slate-900 bg-slate-900 p-2 shadow-2xl ring-1 ring-white/20">
                  {/* Dynamic Island / Speaker notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-slate-950 z-20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-slate-800" />
                  </div>

                  {/* Phone Screen Display */}
                  <div className="relative h-[480px] w-full overflow-hidden rounded-[32px] bg-slate-950 text-white p-4 font-sans select-none">
                    {/* Top status bar */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-1 pb-3 px-1">
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px]">5G</span>
                      </div>
                    </div>

                    {/* App Header Inside Phone */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                          LS
                        </div>
                        <span className="text-xs font-bold text-white">Market</span>
                      </div>
                      <Bell className="h-4 w-4 text-slate-400" />
                    </div>

                    {/* Trending Trade Section Inside Phone */}
                    <div className="mt-3">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Trending Trade
                      </span>

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {/* Bitcoin inside phone */}
                        <div className="rounded-xl bg-slate-900 border border-slate-800 p-2.5">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                            <span className="text-amber-400 font-bold">₿</span>
                            <span>Bitcoin</span>
                          </div>
                          <div className="mt-1 text-xs font-extrabold text-white">
                            $63,788
                          </div>
                          <span className="text-[9px] font-bold text-emerald-400">
                            +3.2%
                          </span>
                        </div>

                        {/* USD inside phone */}
                        <div className="rounded-xl bg-slate-900 border border-slate-800 p-2.5">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                            <span>🇺🇸</span>
                            <span>USD/SYP</span>
                          </div>
                          <div className="mt-1 text-xs font-extrabold text-white">
                            13,292
                          </div>
                          <span className="text-[9px] font-bold text-emerald-400">
                            +0.15%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Prices Mini Table Inside Phone */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                        <span>Live Prices</span>
                        <span className="text-blue-400">See all</span>
                      </div>

                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">✨</span>
                            <div>
                              <div className="font-bold text-[11px]">Gold 21K</div>
                              <div className="text-[9px] text-slate-400">per gram</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-[11px]">985,000</div>
                            <div className="text-[9px] text-emerald-400">+2.4%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">🇪🇺</span>
                            <div>
                              <div className="font-bold text-[11px]">Euro</div>
                              <div className="text-[9px] text-slate-400">EUR/SYP</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-[11px]">19,000</div>
                            <div className="text-[9px] text-emerald-400">+0.15%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">🟢</span>
                            <div>
                              <div className="font-bold text-[11px]">Tether USDT</div>
                              <div className="text-[9px] text-slate-400">P2P Desk</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-[11px]">13,550</div>
                            <div className="text-[9px] text-emerald-400">+0.12%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-white/40" />
                  </div>
                </div>
              </ParallaxCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
