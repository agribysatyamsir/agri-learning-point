import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck } from 'lucide-react';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-900 p-0.5">
                <img src="/assets/branding/logo.png" alt="Learning Point" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Learning Point</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India&apos;s authoritative competitive-examination platform specializing in Agriculture (IBPS AFO, NABARD, ICAR, State PSC) and government exam readiness through syllabus-grounded practice papers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@agrilearningpoint"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                aria-label="Agri Learning Point YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/agrilearningpoint"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                aria-label="Agri Learning Point Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/agriquizworld"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Agri Quiz World Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Academics & Tests</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-primary transition-colors">Courses & Batches</Link></li>
              <li><Link to="/test-series" className="hover:text-primary transition-colors">Online Test Series</Link></li>
              <li><Link to="/free-tests" className="hover:text-primary transition-colors">Daily Free Quiz</Link></li>
              <li><Link to="/previous-year-papers" className="hover:text-primary transition-colors">Previous Year Papers (PYQ)</Link></li>
              <li><Link to="/current-affairs" className="hover:text-primary transition-colors">Agri Current Affairs</Link></li>
              <li><Link to="/job-alerts" className="hover:text-primary transition-colors">Govt. Job Alerts</Link></li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Student Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">
                Support: <a href="https://t.me/agribysatyamsir" target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 font-medium">@agribysatyamsir (Telegram)</a>
              </li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Satyam Sir</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Help & Admission Desk</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><a href="#download-app" className="hover:text-amber-400 transition-colors">Download Android App</a></li>
              <li><Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/payment-policy" className="hover:text-primary transition-colors">Payment Terms</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary transition-colors">Exam Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Learning Point. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
