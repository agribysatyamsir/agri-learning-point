import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen, FileCheck2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <Card3D className="w-full max-w-xl p-8 sm:p-12 text-center space-y-6 bg-slate-900/90 border-slate-800 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <Badge variant="gold">404 Error — Page Not Found</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lost in the Exam Fields?
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The page or examination resource you are looking for doesn&apos;t exist or has moved. Explore our verified syllabus and active test batches below.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/courses" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Courses
            </Button>
          </Link>
          <Link to="/exams" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full gap-2">
              <FileCheck2 className="w-4 h-4" />
              Exam Categories
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          Need urgent exam assistance? Contact support at{' '}
          <a href="mailto:support@learningpoint.in" className="text-emerald-400 hover:underline">
            support@learningpoint.in
          </a>
        </div>
      </Card3D>
    </div>
  );
};

export default NotFoundPage;
