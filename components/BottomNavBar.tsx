import { LucideIcon } from 'lucide-react';

import Link from 'next/link';

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/75 backdrop-blur-2xl border-t border-sky-500/10">
      <Link className="flex flex-col items-center justify-center text-sky-700 font-bold bg-sky-500/10 rounded-xl px-3 py-1 active:scale-90 transition-transform" href="/">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>radio_button_checked</span>
        <span className="font-['Inter'] text-[10px] font-medium">Today</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-700 active:scale-90 transition-transform" href="/calendar">
        <span className="material-symbols-outlined">event_note</span>
        <span className="font-['Inter'] text-[10px] font-medium">Calendar</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-700 active:scale-90 transition-transform" href="/insights">
        <span className="material-symbols-outlined">bar_chart</span>
        <span className="font-['Inter'] text-[10px] font-medium">Insights</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-slate-500 hover:text-sky-700 active:scale-90 transition-transform" href="/settings">
        <span className="material-symbols-outlined">settings</span>
        <span className="font-['Inter'] text-[10px] font-medium">Settings</span>
      </Link>
    </nav>
  );
}
