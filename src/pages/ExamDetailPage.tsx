import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileCheck2, ArrowRight } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EXAM_CATEGORIES, COURSES, TEST_SERIES } from '../data/mockData';

export const ExamDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const exam = EXAM_CATEGORIES.find((e) => e.slug === slug) || EXAM_CATEGORIES[0];
  const relatedCourses = COURSES.filter((c) => c.examSlug === exam.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link to="/exams" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to All Exams
      </Link>

      <div className="space-y-4">
        <Badge variant="emerald">{exam.badge}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {exam.title}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {exam.shortDesc} Explore structured courses, previous year question trends, and high-frequency mock tests aligned with the official examination syllabus.
        </p>
      </div>

      {/* Recommended Batches */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Recommended Batches for {exam.badge}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(relatedCourses.length > 0 ? relatedCourses : COURSES.slice(0, 2)).map((course) => (
            <Card3D key={course.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="gold">{course.category}</Badge>
                <h3 className="text-lg font-bold text-white leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-400">{course.tagline}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-lg font-bold text-white">₹{course.offerPrice}</span>
                <Link to={`/course/${course.slug}`}>
                  <Button variant="primary" size="sm">View Batch</Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};
