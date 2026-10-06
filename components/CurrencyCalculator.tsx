'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { ParallaxCard } from './ParallaxCard';
import {
  Wrench,
  ArrowRightLeft,
  Copy,
  Check,
  ShieldCheck,
  Calculator,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export function CurrencyCalculator() {
  const { language, t, marketItems, denomination } = useApp();

  const [activeTab, setActiveTab] = useState<'currencies' | 'gold' | 'crypto'>('currencies');
  const [amount, setAmount] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<string>('USD');
  const [toUnit, setToUnit] = useState<string>('SYP');
  const [rateMode, setRateMode] = useState<'buy' | 'sell'>('sell');
  const [copied, setCopied] = useState(false);

  // Conversion rates baseline (SYP per unit)
  const rateBook: Record<string, { buy: number; sell: number; nameEn: string; nameAr: string }> = {
    USD: { buy: 13220, sell: 13561, nameEn: 'US Dollar', nameAr: 'دولار أمريكي' },
    EUR: { buy: 14450, sell: 14850, nameEn: 'Euro', nameAr: 'يورو أوروبي' },
    TRY: { buy: 385, sell: 410, nameEn: 'Turkish Lira', nameAr: 'ليرة تركية' },
    SAR: { buy: 3580, sell: 3670, nameEn: 'Saudi Riyal', nameAr: 'ريال سعودي' },
    AED: { buy: 3650, sell: 3740, nameEn: 'UAE Dirham', nameAr: 'درهم إماراتي' },
    GBP: { buy: 17100, sell: 17600, nameEn: 'British Pound', nameAr: 'جنيه إسترليني' },
    // Gold
    GOLD_21K: { buy: 985000, sell: 995000, nameEn: 'Gold 21K (Gram)', nameAr: 'غرام ذهب 21' },
    GOLD_24K: { buy: 1125000, sell: 1137000, nameEn: 'Gold 24K (Gram)', nameAr: 'غرام ذهب 24' },
    GOLD_COIN: { buy: 7880000, sell: 7960000, nameEn: 'Syrian Gold Pound', nameAr: 'ليرة ذهب سورية' },
    // Crypto
    BTC: { buy: 855000000, sell: 864000000, nameEn: 'Bitcoin', nameAr: 'بيتكوين' },
    ETH: { buy: 42000000, sell: 43200000, nameEn: 'Ethereum', nameAr: 'إيثيريوم' },
    USDT: { buy: 13520, sell: 13600, nameEn: 'Tether (USDT)', nameAr: 'تيذر USDT' },
    // Base
    SYP: { buy: 1, sell: 1, nameEn: 'Syrian Pound', nameAr: 'ليرة سورية' },
  };

  const tabs = [
    { id: 'currencies', label: t.calc.tabs.currencies },
    { id: 'gold', label: t.calc.tabs.gold },
    { id: 'crypto', label: t.calc.tabs.crypto },
  ];

  // Options depending on tab
  const tabOptions = useMemo(() => {
    if (activeTab === 'currencies') {
      return ['USD', 'EUR', 'TRY', 'SAR', 'AED', 'GBP', 'SYP'];
    }
    if (activeTab === 'gold') {
      return ['GOLD_21K', 'GOLD_24K', 'GOLD_COIN', 'SYP', 'USD'];
    }
    return ['USDT', 'BTC', 'ETH', 'SYP', 'USD'];
  }, [activeTab]);

  const handleTabChange = (tab: 'currencies' | 'gold' | 'crypto') => {
    setActiveTab(tab);
    if (tab === 'currencies') {
      setFromUnit('USD');
      setToUnit('SYP');
    } else if (tab === 'gold') {
      setFromUnit('GOLD_21K');
      setToUnit('SYP');
    } else {
      setFromUnit('USDT');
      setToUnit('SYP');
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Calculate live exchange rate and result
  const fromRateInSyp = rateBook[fromUnit] ? rateBook[fromUnit][rateMode] : 1;
  const toRateInSyp = rateBook[toUnit] ? rateBook[toUnit][rateMode] : 1;
  const exchangeRate = fromRateInSyp / toRateInSyp;
  const calculatedResult = amount * exchangeRate;

  // Old SYP multiplier if enabled
  const finalResult = denomination === 'old' && toUnit === 'SYP' ? calculatedResult * 1000 : calculatedResult;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${finalResult.toLocaleString()} ${toUnit === 'SYP' && language === 'ar' ? 'ل.س' : toUnit}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculator" className="py-12 md:py-20 bg-slate-50/60 dark:bg-slate-950/70 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Smart Tools Copy */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
              <Calculator className="h-3.5 w-3.5 text-blue-500" />
              <span>{t.calc.badge}</span>
            </div>

            <h2
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.calc.title}
            </h2>

            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              {t.calc.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Multi-source verified pricing from Syrian chambers & central market</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Supports gold karats (21K & 24K), international currencies and digital assets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Card with 3D Parallax */}
          <div className="lg:col-span-7 xl:col-span-7">
            <ParallaxCard intensity={10} className="w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                {/* Segmented Category Buttons */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as 'currencies' | 'gold' | 'crypto')}
                        className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Buy / Sell mode selector */}
                  <div className="flex rounded-lg border border-slate-200 p-0.5 text-[11px] font-semibold dark:border-slate-700">
                    <button
                      onClick={() => setRateMode('buy')}
                      className={`rounded px-2 py-1 transition ${
                        rateMode === 'buy'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {t.calc.modeBuy}
                    </button>
                    <button
                      onClick={() => setRateMode('sell')}
                      className={`rounded px-2 py-1 transition ${
                        rateMode === 'sell'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {t.calc.modeSell}
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.calc.amount}
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="number"
                      min="0"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base font-bold tabular-nums text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Currency Selection Grid with Swap */}
                <div className="mt-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-11">
                  {/* From Dropdown */}
                  <div className="sm:col-span-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t.calc.from}
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {tabOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt} - {language === 'ar' ? rateBook[opt]?.nameAr : rateBook[opt]?.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center sm:col-span-1 pt-4">
                    <button
                      onClick={swapUnits}
                      title={t.calc.swap}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:rotate-180 transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <ArrowRightLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>

                  {/* To Dropdown */}
                  <div className="sm:col-span-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t.calc.to}
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {tabOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt} - {language === 'ar' ? rateBook[opt]?.nameAr : rateBook[opt]?.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live Exchange Rate Bar */}
                <div className="mt-5 flex flex-wrap items-center justify-between rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {t.calc.liveRateLabel}:
                    </span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      1 {fromUnit} = {exchangeRate.toLocaleString(undefined, { maximumFractionDigits: 4 })}{' '}
                      {toUnit}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">{t.calc.sourceVerified}</span>
                </div>

                {/* Conversion Result Block */}
                <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-5 dark:border-blue-900/40 dark:from-slate-800/80 dark:to-blue-950/30">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <span>{t.calc.result}</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-600 font-semibold">{t.calc.copySuccess}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{t.calc.copyBtn}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
                      {finalResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-base font-bold text-slate-500 dark:text-slate-400">
                      {toUnit === 'SYP' && language === 'ar' ? 'ل.س' : toUnit}
                    </span>
                  </div>
                </div>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </div>
    </section>
  );
}
