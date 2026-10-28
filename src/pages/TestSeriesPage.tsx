import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, FileCheck, ArrowRight } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TEST_SERIES } from '../data/mockData';

export const TestSeriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="emerald">Examination Readiness</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Online Test Series
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Complete exam simulation papers featuring server-authoritative timer, -0.25 negative marking, and 5 practice reattempts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEST_SERIES.map((test) => (
          <Card3D key={test.id} className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={test.isFree ? 'emerald' : 'gold'}>
                  {test.isFree ? 'Free Mock' : 'Full Series'}
                </Badge>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {test.durationMinutes} Mins
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {test.title}
              </h3>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Questions</span>
                  <span className="text-slate-200 font-semibold">{test.questionsCount} MCQs</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Marking Scheme</span>
                  <span className="text-emerald-400 font-semibold">+{test.markingScheme.correct} / -{test.markingScheme.wrong}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Attempts Allowed</span>
                  <span className="text-slate-200 font-semibold">1 Ranked + 5 Practice</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase text-slate-500">Key Syllabus Focus</span>
                <p className="text-xs text-slate-400 truncate">
                  {test.syllabus.join(' • ')}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">{test.isFree ? 'No payment required' : 'Course enrollment required'}</span>
              <Link to={`/exam/${test.id}`}>
                <Button variant={test.isFree ? 'primary' : 'gold'} size="sm">
                  {test.isFree ? 'Start Test' : 'Unlock Series'}
                </Button>
              </Link>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};
