import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { EXAM_CATEGORIES } from '../data/mockData';

export const ExamsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <Badge variant="emerald">Competitive Streams</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Exam Categories & Syllabi
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Browse dedicated exam tracks with topic-wise blueprints, official weightages, and targeted test papers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {EXAM_CATEGORIES.map((cat) => (
          <Link key={cat.id} to={`/exams/${cat.slug}`}>
            <Card3D className="h-full flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{cat.badge}</Badge>
                  <span className="text-xs text-slate-400">{cat.testCount} Tests</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.shortDesc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Explore Full Syllabus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card3D>
          </Link>
        ))}
      </div>
    </div>
  );
};
