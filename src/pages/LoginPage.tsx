import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Smartphone, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate 10-digit Indian Mobile Number
    const cleanedPhone = phone.trim().replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Simulated Authentication & Single Active Login Session Token Generation
    setTimeout(() => {
      setIsLoading(false);
      // Persist student session
      localStorage.setItem('lp_student_session', JSON.stringify({
        token: 'session_' + Math.random().toString(36).substring(2),
        phone: cleanedPhone,
        name: 'Aspirant',
        loggedInAt: new Date().toISOString(),
      }));
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card3D className="w-full max-w-md p-8 space-y-6 bg-slate-900/90 border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-950 p-1 mb-2">
            <img src="/assets/branding/logo.png" alt="Learning Point" className="w-full h-full object-contain" />
          </div>
          <Badge variant="emerald">Student Access</Badge>
          <h1 className="text-2xl font-black text-white tracking-tight">Student Login</h1>
          <p className="text-xs text-slate-400">Sign in with your mobile number to access enrolled batches and tests.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">10-Digit Mobile Number</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400 border-r border-slate-700 pr-2">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-14 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary font-mono"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <a href="#" className="text-[11px] text-emerald-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full py-3" isLoading={isLoading}>
            Sign In to Learning Point
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800/80 space-y-3">
          <p>
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="text-emerald-400 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Single active device policy enforced</span>
          </div>
        </div>
      </Card3D>
    </div>
  );
};
