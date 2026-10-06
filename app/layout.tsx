import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Lira Live - Syrian Market Exchange Rates & Financial Intelligence',
  description:
    'Track live Syrian Pound (SYP) exchange rates, gold prices, crypto markets, and financial movements with real-time verified data, currency calculator, and Lira AI assistant.',
  openGraph: {
    title: 'Lira Live - Syrian Market Exchange Rates & Financial Intelligence',
    description:
      'Track live Syrian Pound (SYP) exchange rates, gold prices, crypto markets, and financial movements with real-time verified data, currency calculator, and Lira AI assistant.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lira Live - Syrian Market Exchange Rates & Financial Intelligence',
    description:
      'Track live Syrian Pound (SYP) exchange rates, gold prices, crypto markets, and financial movements with real-time verified data, currency calculator, and Lira AI assistant.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
