import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Smartphone, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetExam, setTargetExam] = useState('IBPS AFO');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanedPhone = phone.trim().replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    try {
      await register(name.trim(), cleanedPhone, targetExam, password);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card3D className="w-full max-w-md p-8 space-y-6 bg-slate-900/90 border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-950 p-1 mb-2">
            <img src="/assets/branding/logo.png" alt="Learning Point" className="w-full h-full object-contain" />
          </div>
          <Badge variant="emerald">New Student Registration</Badge>
          <h1 className="text-2xl font-black text-white tracking-tight">Create Your Account</h1>
          <p className="text-xs text-slate-400">Join thousands of students preparing for competitive agriculture exams.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Rahul Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-slate-300">Primary Target Exam</label>
            <select
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-primary"
            >
              <option value="IBPS AFO">IBPS AFO (Agriculture Field Officer)</option>
              <option value="NABARD Grade A">NABARD Grade A & B</option>
              <option value="ICAR JRF/SRF">ICAR JRF / SRF Entrance</option>
              <option value="UPSSSC AGTA">UPSSSC AGTA / Cane Supervisor</option>
              <option value="State PSC Agri">State PSC Agriculture Officer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Choose Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full py-3" isLoading={isLoading}>
            Create Free Account
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800/80">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
            Sign in here
          </Link>
        </div>
      </Card3D>
    </div>
  );
};
