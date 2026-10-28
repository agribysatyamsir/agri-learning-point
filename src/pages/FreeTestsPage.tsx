import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TEST_SERIES } from '../data/mockData';

export const FreeTestsPage: React.FC = () => {
  const freeTests = TEST_SERIES.filter((t) => t.isFree);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="emerald">100% Free Practice</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Free Mock Tests
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Test your preparation without any financial commitment. Experience the real exam environment with instant scoring, negative marking, and detailed explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeTests.map((test) => (
          <Card3D key={test.id} className="flex flex-col justify-between border-emerald-500/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="emerald">Free Access</Badge>
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
                  <span>Marking</span>
                  <span className="text-emerald-400 font-semibold">+{test.markingScheme.correct} / -{test.markingScheme.wrong}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Syllabus: {test.syllabus.join(', ')}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Open to all students
              </span>
              <Link to={`/exam/attempt/${test.id}`}>
                <Button variant="primary" size="sm">
                  Start Test Now
                </Button>
              </Link>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};
