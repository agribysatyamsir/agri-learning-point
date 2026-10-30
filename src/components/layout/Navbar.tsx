import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  BookOpen, 
  GraduationCap, 
  FileCheck2, 
  Sparkles, 
  User, 
  ShieldCheck, 
  FileText, 
  Newspaper, 
  BellRing,
  Download
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { TopBar } from './TopBar';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Exams', href: '/exams', icon: GraduationCap },
    { label: 'Courses', href: '/courses', icon: BookOpen },
    { label: 'Test Series', href: '/test-series', icon: FileCheck2 },
    { label: 'Free Tests', href: '/free-tests', icon: Sparkles },
    { label: 'PYQ Papers', href: '/previous-year-papers', icon: FileText },
    { label: 'Current Affairs', href: '/current-affairs', icon: Newspaper },
    { label: 'Job Alerts', href: '/job-alerts', icon: BellRing },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Helpline & Announcement Bar */}
      <TopBar />

      <div className="w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-900 p-0.5 shadow-md shadow-emerald-500/10 shrink-0">
                <img 
                  src="/assets/branding/logo.png" 
                  alt="Learning Point Logo" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Learning Point
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/30">
                    AGRI
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
                  By Satyam Sir • Premier Exam Prep
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                      active
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5 opacity-80" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Medium screen navigation fallback (fewer links) */}
            <nav className="hidden md:flex xl:hidden items-center gap-1">
              {navLinks.slice(0, 5).map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="#download-app"
                className="hidden lg:flex items-center gap-1 text-xs text-amber-300 font-semibold bg-amber-400/10 px-2.5 py-1.5 rounded-lg border border-amber-400/30 hover:bg-amber-400/20 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>App</span>
              </a>

              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs">
                    <User className="w-3.5 h-3.5" />
                    {user?.fullName?.split(' ')[0] || 'Dashboard'}
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs">
                    <User className="w-3.5 h-3.5" />
                    Login
                  </Button>
                </Link>
              )}
              <Link to="/courses">
                <Button variant="primary" size="sm" className="font-semibold shadow-md text-xs px-3">
                  Enroll Now
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-5 h-5 text-emerald-400" />
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-primary" />}
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-amber-400 flex items-center gap-3 hover:bg-slate-800"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin Portal
              </Link>
            </div>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="primary" className="w-full py-2.5 text-sm">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
