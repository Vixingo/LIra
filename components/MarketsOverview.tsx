'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { MarketCategory, MarketItem } from '@/lib/types';
import {
  Search,
  SlidersHorizontal,
  Star,
  Bell,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Info,
  Check,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MarketsOverview() {
  const {
    language,
    t,
    marketItems,
    formatCurrency,
    favorites,
    toggleFavorite,
    isFavorite,
    denomination,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<MarketCategory | 'all'>('currencies');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>('usd'); // default open USD matching screenshot!
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{ index: number; val: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  const categories: { id: MarketCategory | 'all'; label: string }[] = [
    { id: 'currencies', label: t.markets.tabs.currencies },
    { id: 'gold', label: t.markets.tabs.gold },
    { id: 'crypto', label: t.markets.tabs.crypto },
    { id: 'fuel', label: t.markets.tabs.fuel },
    { id: 'global', label: t.markets.tabs.global },
    { id: 'commodities', label: t.markets.tabs.commodities },
  ];

  // Filtering items
  const filteredItems = useMemo(() => {
    return marketItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        // Global and commodities can show items or overlap
        if (activeCategory === 'global' && item.category !== 'currencies' && item.category !== 'crypto') return false;
        if (activeCategory === 'commodities' && item.category !== 'gold' && item.category !== 'fuel') return false;
      }

      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesEn = item.nameEn.toLowerCase().includes(query);
        const matchesAr = item.nameAr.includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        return matchesEn || matchesAr || matchesCode;
      }

      return true;
    });
  }, [marketItems, activeCategory, showOnlyFavorites, favorites, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const triggerAlert = (itemName: string) => {
    const text =
      language === 'ar'
        ? `تم تفعيل تنبيه تغير سعر ${itemName}`
        : `Rate alert activated for ${itemName}`;
    setAlertNotice(text);
    setTimeout(() => setAlertNotice(null), 3000);
  };

  return (
    <section id="markets" className="py-12 md:py-20 bg-slate-50/50 dark:bg-slate-950/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t.markets.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            {t.markets.subtitle}
          </p>
        </div>

        {/* Search & Tabs Controls Bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.markets.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs sm:text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter & Favorites Action Toggles */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                showOnlyFavorites
                  ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  showOnlyFavorites ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                }`}
              />
              <span>{t.markets.favoritesBtn}</span>
            </button>
          </div>
        </div>

        {/* Alert Notification Toast */}
        <AnimatePresence>
          {alertNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-300"
            >
              <Check className="h-4 w-4 text-emerald-600" />
              <span>{alertNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Markets Table Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800/90 dark:bg-slate-900/90">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                  <th className="py-3.5 pl-6 pr-4">{t.markets.columns.currency}</th>
                  <th className="px-4 py-3.5">{t.markets.columns.buyRate}</th>
                  <th className="px-4 py-3.5">{t.markets.columns.sellRate}</th>
                  <th className="px-4 py-3.5">{t.markets.columns.trend24h}</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">{t.markets.columns.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800/60">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                      {t.markets.noResults}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const isExpanded = expandedItemId === item.id;
                    const favorite = isFavorite(item.id);

                    return (
                      <React.Fragment key={item.id}>
                        {/* Primary Row */}
                        <tr
                          onClick={() => toggleExpand(item.id)}
                          className={`group cursor-pointer transition-colors hover:bg-blue-50/40 dark:hover:bg-slate-800/40 ${
                            isExpanded ? 'bg-slate-50/80 dark:bg-slate-800/50' : ''
                          }`}
                        >
                          {/* Currency & Flag */}
                          <td className="py-4 pl-6 pr-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xl shrink-0" role="img" aria-label={item.code}>
                                {item.flag || '💱'}
                              </span>
                              <div>
                                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                  <span>{language === 'ar' ? item.nameAr : item.nameEn}</span>
                                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                                    {item.code}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  <span>
                                    {t.hero.liveUpdated.replace('{sec}', String(item.updatedSecondsAgo))}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Buy Rate */}
                          <td className="px-4 py-4 align-middle">
                            <div className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
                              {formatCurrency(item.buyRate, item.unitEn || 'SYP')}
                            </div>
                            <div className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <TrendingUp className="h-3 w-3" />
                              <span>+{item.change24h}%</span>
                            </div>
                          </td>

                          {/* Sell Rate */}
                          <td className="px-4 py-4 align-middle">
                            <div className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
                              {formatCurrency(item.sellRate, item.unitEn || 'SYP')}
                            </div>
                            <div className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <TrendingUp className="h-3 w-3" />
                              <span>+0.45%</span>
                            </div>
                          </td>

                          {/* Trend (24h) Sparkline */}
                          <td className="px-4 py-4 align-middle">
                            <div className="h-8 w-28">
                              <svg viewBox="0 0 100 30" className="h-full w-full overflow-visible">
                                <polyline
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  points={item.sparkline
                                    .map((val, idx) => {
                                      const min = Math.min(...item.sparkline);
                                      const max = Math.max(...item.sparkline) || 1;
                                      const y = 26 - ((val - min) / (max - min || 1)) * 20;
                                      return `${idx * (100 / (item.sparkline.length - 1))},${y}`;
                                    })
                                    .join(' ')}
                                />
                              </svg>
                            </div>
                          </td>

                          {/* Action icons */}
                          <td className="py-4 pl-4 pr-6 text-right align-middle">
                            <div
                              className="flex items-center justify-end gap-1.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => triggerAlert(language === 'ar' ? item.nameAr : item.nameEn)}
                                title={t.markets.setAlert}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition"
                              >
                                <Bell className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => toggleFavorite(item.id)}
                                title={t.markets.toggleFavorite}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                  favorite
                                    ? 'text-amber-500 hover:text-amber-600'
                                    : 'text-slate-400 hover:bg-slate-100 hover:text-amber-500 dark:hover:bg-slate-800'
                                }`}
                              >
                                <Star
                                  className={`h-4 w-4 ${favorite ? 'fill-amber-400 text-amber-500' : ''}`}
                                />
                              </button>

                              <button
                                onClick={() => toggleExpand(item.id)}
                                title={t.markets.inspectDetails}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Detail Card (Accordion) */}
                        {isExpanded && (
                          <tr className="bg-slate-50/70 dark:bg-slate-950/50">
                            <td colSpan={5} className="p-4 sm:p-6">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 gap-6 lg:grid-cols-12"
                              >
                                {/* 7-Day Chart Area */}
                                <div className="lg:col-span-5 rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <span className="flex items-center gap-1.5">
                                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                                      <span>{t.markets.chart7d}</span>
                                    </span>
                                    {hoveredChartPoint ? (
                                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                                        Day {hoveredChartPoint.index + 1}: {formatCurrency(hoveredChartPoint.val)}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">Hover point to inspect</span>
                                    )}
                                  </div>

                                  {/* Interactive Chart SVG */}
                                  <div className="relative h-32 w-full pt-2">
                                    <svg viewBox="0 0 300 100" className="h-full w-full overflow-visible">
                                      {/* Gradient definition */}
                                      <defs>
                                        <linearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                        </linearGradient>
                                      </defs>

                                      {/* Area fill */}
                                      <polygon
                                        fill={`url(#grad-${item.id})`}
                                        points={`0,100 ${item.sparkline
                                          .map((val, idx) => {
                                            const min = Math.min(...item.sparkline);
                                            const max = Math.max(...item.sparkline) || 1;
                                            const y = 90 - ((val - min) / (max - min || 1)) * 70;
                                            return `${idx * (300 / (item.sparkline.length - 1))},${y}`;
                                          })
                                          .join(' ')} 300,100`}
                                      />

                                      {/* Polyline */}
                                      <polyline
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={item.sparkline
                                          .map((val, idx) => {
                                            const min = Math.min(...item.sparkline);
                                            const max = Math.max(...item.sparkline) || 1;
                                            const y = 90 - ((val - min) / (max - min || 1)) * 70;
                                            return `${idx * (300 / (item.sparkline.length - 1))},${y}`;
                                          })
                                          .join(' ')}
                                      />

                                      {/* Interactive dots */}
                                      {item.sparkline.map((val, idx) => {
                                        const min = Math.min(...item.sparkline);
                                        const max = Math.max(...item.sparkline) || 1;
                                        const cx = idx * (300 / (item.sparkline.length - 1));
                                        const cy = 90 - ((val - min) / (max - min || 1)) * 70;

                                        return (
                                          <circle
                                            key={idx}
                                            cx={cx}
                                            cy={cy}
                                            r="4"
                                            className="fill-emerald-500 hover:r-6 cursor-pointer transition-all stroke-white dark:stroke-slate-900 stroke-2"
                                            onMouseEnter={() => setHoveredChartPoint({ index: idx, val })}
                                            onMouseLeave={() => setHoveredChartPoint(null)}
                                          />
                                        );
                                      })}
                                    </svg>
                                  </div>
                                </div>

                                {/* AI Insight Card */}
                                <div className="lg:col-span-4 rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                                    <Sparkles className="h-4 w-4" />
                                    <span>{t.markets.aiInsight}</span>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                    {language === 'ar' ? item.aiInsightAr : item.aiInsightEn}
                                  </p>
                                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                    <span>
                                      {t.markets.verifiedSources.replace(
                                        '{n}',
                                        String(item.verifiedSourcesCount)
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* Metrics Breakdown Grid */}
                                <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                                      {t.markets.high24h}
                                    </span>
                                    <div className="mt-1 text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                                      {item.high24h.toLocaleString()}
                                    </div>
                                  </div>

                                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                                      {t.markets.low24h}
                                    </span>
                                    <div className="mt-1 text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                                      {item.low24h.toLocaleString()}
                                    </div>
                                  </div>

                                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                                      {t.markets.volume}
                                    </span>
                                    <div className="mt-1 text-xs font-bold tabular-nums text-slate-900 dark:text-white truncate">
                                      {item.volume}
                                    </div>
                                  </div>

                                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                                      {t.markets.volatility}
                                    </span>
                                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                      {item.volatility === 'Low'
                                        ? t.markets.volatilityLow
                                        : item.volatility === 'Moderate'
                                        ? t.markets.volatilityModerate
                                        : t.markets.volatilityHigh}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Matching Screenshot */}
          <div className="flex items-center justify-between border-t border-slate-200/80 px-6 py-4 dark:border-slate-800">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-40 dark:text-slate-400 dark:hover:text-white transition"
            >
              {t.markets.paginationPrev}
            </button>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setCurrentPage(1)}
                className={`h-7 w-7 rounded-lg font-bold ${
                  currentPage === 1
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`h-7 w-7 rounded-lg font-bold ${
                  currentPage === 2
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`h-7 w-7 rounded-lg font-bold ${
                  currentPage === 3
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                3
              </button>
              <span className="px-1 text-slate-400">…</span>
              <button
                onClick={() => setCurrentPage(67)}
                className="h-7 w-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
              >
                67
              </button>
              <button
                onClick={() => setCurrentPage(68)}
                className="h-7 w-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
              >
                68
              </button>
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
            >
              {t.markets.paginationNext}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
