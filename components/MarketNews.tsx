'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from './AppContext';
import { newsArticles } from '@/lib/market-data';
import { NewsArticle } from '@/lib/types';
import { ParallaxCard } from './ParallaxCard';
import {
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MarketNews() {
  const { language, t } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="news" className="py-12 md:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t.news.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {t.news.subtitle}
            </p>
          </div>

          <a
            href="#news"
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition"
          >
            <span>{t.news.viewAll}</span>
            <ArrowRight
              className={`h-3.5 w-3.5 ${language === 'ar' ? 'rotate-180' : ''}`}
            />
          </a>
        </div>

        {/* 3-Card Grid Matching Screenshot Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1 (Large Leading Card - Syrian pound) */}
          <div className="lg:col-span-6">
            {newsArticles[0] && (
              <ParallaxCard intensity={8} className="h-full">
                <div
                  onClick={() => setSelectedArticle(newsArticles[0])}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800/90 dark:bg-slate-950"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={newsArticles[0].image}
                      alt={newsArticles[0].titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {(language === 'ar'
                          ? newsArticles[0].tagsAr
                          : newsArticles[0].tagsEn
                        ).map((tag, i) => (
                          <span key={i}>
                            {tag}
                            {i < (newsArticles[0].tagsEn.length - 1) && (
                              <span className="text-slate-300 dark:text-slate-700 mx-1">·</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                        {language === 'ar'
                          ? newsArticles[0].titleAr
                          : newsArticles[0].titleEn}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed dark:text-slate-300 line-clamp-2">
                        {language === 'ar'
                          ? newsArticles[0].excerptAr
                          : newsArticles[0].excerptEn}
                      </p>

                      {/* Featured AI Summary Box matching screenshot */}
                      <div className="mt-4 rounded-xl border border-blue-200/70 bg-blue-50/60 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/40">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{t.news.aiSummaryTitle}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          {language === 'ar'
                            ? newsArticles[0].aiSummaryAr
                            : newsArticles[0].aiSummaryEn}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {language === 'ar'
                            ? newsArticles[0].publishedTimeAr
                            : newsArticles[0].publishedTimeEn}
                        </span>
                      </div>

                      <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                        <span>{t.news.readMore}</span>
                        <ArrowRight
                          className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${
                            language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            )}
          </div>

          {/* Cards 2 & 3 (Stacked Column on Right) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {newsArticles.slice(1, 3).map((article) => (
              <ParallaxCard key={article.id} intensity={8}>
                <div
                  onClick={() => setSelectedArticle(article)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:flex-row dark:border-slate-800/90 dark:bg-slate-950"
                >
                  <div className="relative aspect-video sm:aspect-square sm:w-48 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={article.image}
                      alt={article.titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Tags */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {(language === 'ar' ? article.tagsAr : article.tagsEn).map((tag, i) => (
                          <span key={i}>
                            {tag}
                            {i < (article.tagsEn.length - 1) && (
                              <span className="text-slate-300 dark:text-slate-700 mx-1">·</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="mt-1.5 text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                        {language === 'ar' ? article.titleAr : article.titleEn}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {language === 'ar' ? article.excerptAr : article.excerptEn}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {language === 'ar'
                            ? article.publishedTimeAr
                            : article.publishedTimeEn}
                        </span>
                      </div>

                      <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                        <span>{t.news.readMore}</span>
                        <ArrowRight
                          className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${
                            language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 mb-5">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.titleEn}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                {(language === 'ar'
                  ? selectedArticle.tagsAr
                  : selectedArticle.tagsEn
                ).join(' · ')}
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? selectedArticle.titleAr : selectedArticle.titleEn}
              </h2>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-3 dark:border-slate-800">
                <span>{selectedArticle.author}</span>
                <span>
                  {language === 'ar'
                    ? selectedArticle.publishedTimeAr
                    : selectedArticle.publishedTimeEn}
                </span>
              </div>

              {/* AI Summary Box */}
              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  <span>{t.news.aiSummaryTitle}</span>
                </div>
                <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? selectedArticle.aiSummaryAr
                    : selectedArticle.aiSummaryEn}
                </p>
              </div>

              <div className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-3">
                <p>
                  {language === 'ar'
                    ? selectedArticle.contentAr
                    : selectedArticle.contentEn}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Copied link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>Share article</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  {t.news.backToNews}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
