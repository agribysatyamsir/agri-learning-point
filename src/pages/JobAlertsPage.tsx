import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Calendar, Users, Award, ExternalLink, ArrowRight, Send, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';
import { JOB_ALERTS } from '../data/mockData';

export const JobAlertsPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Upcoming'>('All');

  const filteredJobs = filter === 'All'
    ? JOB_ALERTS
    : JOB_ALERTS.filter((j) => j.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time Vacancy Updates</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Agriculture Govt. Job Alerts 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Stay updated with the latest recruitment notifications for IBPS AFO, UPSSSC AGTA, State ADO/AAO, ICAR, FCI, and KVK posts.
        </p>
      </div>

      {/* Telegram Alert Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Join Our Telegram For 1-Minute Job Alerts</h4>
            <p className="text-xs text-slate-400">Direct PDF notifications, syllabus, and exam date updates.</p>
          </div>
        </div>

        <a
          href="https://t.me/agribysatyamsir"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="secondary" size="sm" className="gap-2 w-full text-sky-400 hover:text-sky-300 border-sky-500/30">
            <Send className="w-3.5 h-3.5" />
            Join @agribysatyamsir
          </Button>
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['All', 'Active', 'Upcoming'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === status
                ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {status} Notifications
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card3D key={job.id} className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={job.status === 'Active' ? 'emerald' : 'gold'}>
                  {job.status === 'Active' ? 'Applications Active' : 'Upcoming Release'}
                </Badge>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5" /> {job.totalPosts} Total Vacancies
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Department: <strong className="text-slate-300">{job.department}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">
                    <strong>Eligibility:</strong> {job.qualification}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <span><strong>Last Date:</strong> {job.lastDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {job.notificationUrl && (
                <a
                  href={job.notificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Official Portal
                  </Button>
                </a>
              )}

              <Link to="/courses" className="flex-1">
                <Button variant="primary" size="sm" className="w-full gap-1.5 text-xs">
                  Prepare for Exam
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};
