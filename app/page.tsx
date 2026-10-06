'use client';

import React, { useState } from 'react';
import { AppProvider } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MarketsOverview } from '@/components/MarketsOverview';
import { AiAssistant } from '@/components/AiAssistant';
import { CurrencyCalculator } from '@/components/CurrencyCalculator';
import { MarketNews } from '@/components/MarketNews';
import { AppDownloadBanner } from '@/components/AppDownloadBanner';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';

function MainContent() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <Header onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      <main>
        {/* Hero Section with Live Syrian Market Cards & 3D Parallax */}
        <Hero onOpenDownloadModal={() => setDownloadModalOpen(true)} />

        {/* Markets Overview Table with 7-Day Chart & AI Insights */}
        <MarketsOverview />

        {/* AI Assistant Section ("Ask anything about the Syrian financial market") */}
        <AiAssistant />

        {/* Smart Tools Currency, Gold & Crypto Calculator */}
        <CurrencyCalculator />

        {/* Market News & Insights */}
        <MarketNews />

        {/* App Download Banner with 3D Smartphone Mockup */}
        <AppDownloadBanner onOpenDownloadModal={() => setDownloadModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
