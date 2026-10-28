import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, FileCheck2, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Exams', href: '/exams', icon: GraduationCap },
    { label: 'Courses', href: '/courses', icon: BookOpen },
    { label: 'Test Series', href: '/test-series', icon: FileCheck2 },
    { label: 'Free Tests', href: '/free-tests', icon: Sparkles },
    { label: 'Updates', href: '/updates' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-900 p-0.5 shadow-md shadow-emerald-500/10">
              <img 
                src="/assets/branding/logo.png" 
                alt="Learning Point Logo" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-primary transition-colors">
                Learning Point
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
                Agri & Govt. Exam Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    active
                      ? 'text-primary bg-primary/10 border border-primary/20 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 opacity-80" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300">
                  <User className="w-4 h-4" />
                  {user?.fullName?.split(' ')[0] || 'Dashboard'}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
            <Link to="/courses">
              <Button variant="primary" size="sm" className="font-semibold shadow-md">
                Explore Courses
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
                className={`px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {link.icon && <link.icon className="w-5 h-5 text-primary" />}
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-base font-medium text-amber-400 flex items-center gap-3 hover:bg-slate-800"
            >
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Admin Portal
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="primary" className="w-full py-3">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
