import React from 'react';
import { Phone, MessageCircle, Send, Download, Sparkles } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-slate-950/95 text-slate-300 text-xs border-b border-slate-800/80 py-1.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Direct Admission & Support Helpline */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] sm:text-xs">
          <a
            href="tel:+919057922277"
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Admission Helpline: <strong className="text-white font-mono">+91 90579 22277</strong></span>
          </a>

          <a
            href="https://wa.me/919057922277?text=Hello%20Satyam%20Sir,%20I%20want%20to%20enquire%20about%20Agri%20Learning%20Point%20Courses"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp Support</span>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 text-amber-300/90 font-medium bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Under Guidance of Satyam Sir (8+ Yrs Exp)</span>
          </div>
        </div>

        {/* Right: Social Handles & App Link */}
        <div className="flex items-center gap-3 text-[11px]">
          <a
            href="https://t.me/agribysatyamsir"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Send className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Telegram:</span> @agribysatyamsir
          </a>

          <a
            href="https://youtube.com/@agribysatyamsir"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden sm:inline">YouTube</span>
          </a>

          <a
            href="#download-app"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 transition-all hover:bg-emerald-500/20"
          >
            <Download className="w-3 h-3 shrink-0" />
            <span>Download App</span>
          </a>
        </div>
      </div>
    </div>
  );
};
