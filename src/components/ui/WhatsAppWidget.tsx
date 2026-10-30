import React from 'react';
import { Send } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  return (
    <aside aria-label="Student Support & Community" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-slate-700/80 text-white text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span>Connect on Telegram @agribysatyamsir</span>
      </div>

      <a
        href="https://t.me/agribysatyamsir"
        target="_blank"
        rel="noreferrer"
        className="relative w-14 h-14 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
        aria-label="Connect on Telegram Support"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-950"></span>
        </span>
        <Send className="w-6 h-6 ml-[-2px]" />
      </a>
    </aside>
  );
};
