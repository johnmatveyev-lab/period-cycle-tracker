import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import BottomNavBar from '@/components/BottomNavBar';
import { NotificationManager } from './NotificationManager';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Glacier Cycle Tracker',
  description: 'A premium, glassmorphism-styled menstrual cycle tracking application.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans min-h-screen pb-24">
        <Providers>
          <NotificationManager />
          {children}
          <BottomNavBar />
        </Providers>
      </body>
    </html>
  );
}
