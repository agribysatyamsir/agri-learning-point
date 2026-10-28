import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  FileCheck2, 
  LogOut, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { COURSES, TEST_SERIES } from '../data/mockData';

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem('lp_student_session');
    if (raw) {
      setStudent(JSON.parse(raw));
    } else {
      // Default fallback demo student
      setStudent({
        name: 'Aspirant',
        phone: '9876543210',
        targetExam: 'IBPS AFO',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lp_student_session');
    navigate('/login');
  };

  const enrolledCourse = COURSES[0]; // Active enrolled course

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="emerald">Enrolled Student</Badge>
            <span className="text-xs text-slate-400 font-mono">+91 {student?.phone}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {student?.name || 'Aspirant'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Target Focus: <strong className="text-emerald-400">{student?.targetExam || 'IBPS AFO Mains'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/courses">
            <Button variant="secondary" size="sm">
              Explore More Batches
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10">
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Enrolled Courses & Tests */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Courses */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Active Enrolled Courses
            </h2>

            <Card3D goldAccent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <Badge variant="gold">Active Access</Badge>
                  <h3 className="text-lg font-bold text-white mt-1">{enrolledCourse.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Validity Remaining</span>
                  <p className="text-sm font-bold text-emerald-400 font-mono">312 Days Left</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Mock Tests</span>
                  <p className="text-base font-bold text-white mt-0.5">{enrolledCourse.testsCount} Full Papers</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Study Modules</span>
                  <p className="text-base font-bold text-white mt-0.5">{enrolledCourse.materialsCount} Topics</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-400">Practice Reattempts</span>
                  <p className="text-base font-bold text-amber-400 mt-0.5">5 Allowed / Test</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link to="/test-series">
                  <Button variant="primary" size="sm" className="gap-1.5">
                    Start Mock Tests
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card3D>
          </div>

          {/* Available Mock Tests */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              Available Practice Papers
            </h2>

            <div className="space-y-3">
              {TEST_SERIES.map((test) => (
                <div key={test.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={test.isFree ? 'emerald' : 'gold'}>{test.isFree ? 'Free Mock' : 'Enrolled'}</Badge>
                      <span className="text-xs text-slate-400 font-mono">{test.durationMinutes} Mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{test.title}</h4>
                    <p className="text-xs text-slate-400">Marking: +{test.markingScheme.correct} / -{test.markingScheme.wrong}</p>
                  </div>
                  <Link to={`/exam/${test.id}`}>
                    <Button variant="primary" size="sm">
                      Take Test
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary & Invoices */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats */}
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Exam Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Tests Completed</span>
                <strong className="text-white">1 Paper</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Average Accuracy</span>
                <strong className="text-emerald-400 font-bold">82.5%</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">All-India Rank Snapshot</span>
                <strong className="text-amber-400 font-bold">#48 of 1,240</strong>
              </div>
            </div>
          </div>

          {/* Payment Receipts */}
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              Receipts & Invoices
            </h3>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-300 font-semibold">
                <span>IBPS AFO Mains 2026 Batch</span>
                <span className="text-emerald-400">₹1,999</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Receipt #LP-2026-8491</span>
                <span>Paid via Razorpay</span>
              </div>
            </div>
          </div>

          {/* Device & Session Safety */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Active Session Verified</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Your session is locked to this active browser. Initiating a login from another device will terminate this session automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
