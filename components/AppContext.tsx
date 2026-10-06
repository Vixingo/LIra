'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, Denomination, MarketItem } from '@/lib/types';
import { translations } from '@/lib/translations';
import { initialMarketItems } from '@/lib/market-data';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  denomination: Denomination;
  setDenomination: (denom: Denomination) => void;
  toggleDenomination: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  marketItems: MarketItem[];
  t: typeof translations.en;
  formatCurrency: (amount: number, unit?: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('lira_lang') as Language;
        if (savedLang === 'en' || savedLang === 'ar') return savedLang;
      } catch {}
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('lira_theme') as Theme;
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      } catch {}
    }
    return 'light';
  });

  const [denomination, setDenominationState] = useState<Denomination>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedDenom = localStorage.getItem('lira_denom') as Denomination;
        if (savedDenom === 'new' || savedDenom === 'old') return savedDenom;
      } catch {}
    }
    return 'new';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFavs = localStorage.getItem('lira_favs');
        if (savedFavs) return JSON.parse(savedFavs);
      } catch {}
    }
    return ['usd', 'gold-21k-gram', 'try'];
  });

  const [marketItems, setMarketItems] = useState<MarketItem[]>(initialMarketItems);

  // Update DOM classes and attributes for theme and dir
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('lira_theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('lira_lang', language);
    } catch {}
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setDenomination = (denom: Denomination) => {
    setDenominationState(denom);
    try {
      localStorage.setItem('lira_denom', denom);
    } catch {}
  };

  const toggleDenomination = () => {
    const next = denomination === 'new' ? 'old' : 'new';
    setDenomination(next);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('lira_favs', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Subtle live tick simulation to make the UI feel alive & authentic
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketItems((prev) =>
        prev.map((item) => {
          // slight chance to tick seconds or price micro-move
          const updatedSecondsAgo = Math.max(1, (item.updatedSecondsAgo + 2) % 30);
          return {
            ...item,
            updatedSecondsAgo,
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number, unit = 'SYP') => {
    const adjustedAmount = denomination === 'old' && unit === 'SYP' ? amount * 1000 : amount;
    const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SY' : 'en-US', {
      maximumFractionDigits: amount > 1000 ? 0 : 2,
    }).format(adjustedAmount);

    const translatedUnit =
      language === 'ar' ? (unit === 'SYP' ? 'ل.س' : unit) : unit;

    return `${formatted} ${translatedUnit}`;
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        denomination,
        setDenomination,
        toggleDenomination,
        favorites,
        toggleFavorite,
        isFavorite,
        marketItems,
        t,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
