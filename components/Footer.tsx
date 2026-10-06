'use client';

import React from 'react';
import { useApp } from './AppContext';
import {
  Send,
  ShieldCheck,
  Globe,
  TrendingUp,
} from 'lucide-react';

export function Footer() {
  const { language, t } = useApp();

  const cities = [
    { name: t.footer.cities.damascus, rate: '13,292 SYP', change: '+0.15%' },
    { name: t.footer.cities.aleppo, rate: '13,310 SYP', change: '+0.10%' },
    { name: t.footer.cities.homs, rate: '13,280 SYP', change: '+0.05%' },
    { name: t.footer.cities.latakia, rate: '13,290 SYP', change: '+0.12%' },
    { name: t.footer.cities.hama, rate: '13,275 SYP', change: '+0.08%' },
    { name: t.footer.cities.tartous, rate: '13,285 SYP', change: '+0.10%' },
  ];

  return (
    <footer className="border-t border-slate-200/80 bg-white pt-16 pb-12 dark:border-slate-800 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* City Benchmark Bar */}
        <div className="mb-12 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.footer.cityTickerTitle}
            </span>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-6">
              {cities.map((city) => (
                <div key={city.name} className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {city.name}:
                  </span>
                  <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                    {city.rate}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {city.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md">
                LS
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {t.brandName}
              </span>
            </div>

            <p className="mt-4 max-w-sm text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{t.footer.disclaimerText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#markets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.exchangeRate}
                </a>
              </li>
              <li>
                <a href="#markets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.gold}
                </a>
              </li>
              <li>
                <a href="#markets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.crypto}
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.news}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.calculator}
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.aiAssistant}
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.importantLinks}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.termsOfUse}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.contact}
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.articles}
                </a>
              </li>
              <li>
                <a href="#markets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.footer.links.globalMarkets}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us / Social Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.followUs}
            </h4>

            <div className="mt-4 flex items-center gap-2.5">
              {/* Telegram (vital in Syria) */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                title="Telegram Channel"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 transition"
              >
                <Send className="h-4 w-4" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                title="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>

              {/* Web / Channel */}
              <a
                href="#"
                title="Official Portal"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 transition"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
