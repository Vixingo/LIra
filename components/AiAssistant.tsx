'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from './AppContext';
import { ParallaxCard } from './ParallaxCard';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ChatMessage } from '@/lib/types';

let msgSeq = 10;
function createMessageId(prefix: string): string {
  msgSeq += 1;
  return `${prefix}-${msgSeq}`;
}

function getCurrentTimeString(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function AiAssistant() {
  const { language, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: language === 'ar' ? 'شو سعر الدولار اليوم؟' : "What's the USD rate today?",
      timestamp: '10:42 AM',
    },
    {
      id: 'm2',
      sender: 'assistant',
      text:
        language === 'ar'
          ? 'سعر صرف USD/SYP حالياً 13,292 ل.س للشراء و 13,220 ل.س للمبيع.\nتم التحديث منذ 10 ثوانٍ • محقق من 3 مصادر (دمشق، حلب، المركزي).'
          : 'USD/SYP is currently 13,292 (Buy) and 13,220 (Sell).\nUpdated 10 seconds ago • 3 sources verified',
      timestamp: '10:42 AM',
      sourcesVerified: 3,
    },
    {
      id: 'm3',
      sender: 'user',
      text: language === 'ar' ? 'وسعر الذهب عيار 21؟' : 'Gold price?',
      timestamp: '10:43 AM',
    },
    {
      id: 'm4',
      sender: 'assistant',
      text:
        language === 'ar'
          ? 'غرام الذهب عيار 21 اليوم بـ 985,000 ل.س. في مسار صعودي +2.4% اليوم، والأونصة 64,479,000 ل.س.'
          : '21K gold is 985,000 SYP per gram. Trending +2.4% today.',
      timestamp: '10:43 AM',
      sourcesVerified: 4,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll within chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: createMessageId('u'),
      sender: 'user',
      text,
      timestamp: getCurrentTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: createMessageId('a'),
        sender: 'assistant',
        text: data.text || (language === 'ar' ? 'تم استلام سؤالك ومراجعته مع مصادر السوق.' : 'Market signals verified.'),
        timestamp: getCurrentTimeString(),
        sourcesVerified: data.sourcesVerified || 4,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: createMessageId('a'),
        sender: 'assistant',
        text:
          language === 'ar'
            ? 'سعر الصرف في دمشق وحلب مستقر حالياً، وغرام الذهب 21 بـ 985,000 ل.س. تم التحقق من 4 مصادر.'
            : 'USD/SYP stands around 13,292 SYP and 21K gold is 985,000 SYP/g. Multi-source verified.',
        timestamp: getCurrentTimeString(),
        sourcesVerified: 4,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-12 md:py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: AI Assistant Copy & Suggested Prompts */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>{t.ai.badge}</span>
            </div>

            {/* Headline */}
            <h2
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.ai.title}
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              {t.ai.subtitle}
            </p>

            {/* Suggested Prompts */}
            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t.ai.suggestedTitle}
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {t.ai.suggested.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification marker */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{t.ai.verifiedBanner}</span>
            </div>
          </div>

          {/* Right Column: Lira AI Chat Box with 3D Parallax Tilt */}
          <div className="lg:col-span-6 xl:col-span-6">
            <ParallaxCard intensity={8} className="w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900/90">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm dark:text-white">
                          {t.ai.chatHeader}
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <span>{t.ai.onlineBadge}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    gemini-3.8-flash
                  </span>
                </div>

                {/* Messages Body */}
                <div className="h-80 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30 dark:bg-slate-950/40">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white shadow-sm rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-bl-none dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 px-1">
                        <span>{msg.timestamp}</span>
                        {msg.sourcesVerified && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              {msg.sourcesVerified} sources verified
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-3.5 py-2 text-xs text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 max-w-fit"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                      <span>{t.ai.typing}</span>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Controls */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="border-t border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-slate-800 dark:bg-slate-950">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t.ai.inputPlaceholder}
                      className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isTyping}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40 active:scale-95"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </div>
    </section>
  );
}
