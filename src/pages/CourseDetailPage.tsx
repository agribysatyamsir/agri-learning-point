import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Clock, BookOpen, FileCheck2, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';
import { COURSES } from '../data/mockData';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const course = COURSES.find((c) => c.slug === slug) || COURSES[0];

  const handleEnroll = () => {
    setIsProcessing(true);
    // Simulate navigation to payment / enrollment flow
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/dashboard?enrolled=${course.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <Link to="/courses" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Course Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="emerald">{course.category}</Badge>
              <span className="text-xs text-slate-400">{course.validityDays} Days Validity</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Curriculum & Key Features */}
          <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">What You Receive in This Batch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              {course.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Series Included */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Included Practice Tests & Mock Papers</h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-white">All-India Grand Mocks + Sectional Quizzes</h4>
                  <p className="text-xs text-slate-400">Total {course.testsCount} tests with full negative marking (-0.25)</p>
                </div>
              </div>
              <Badge variant="gold">Included</Badge>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Checkout Card */}
        <div className="lg:col-span-4">
          <Card3D goldAccent className="p-6 sm:p-8 space-y-6 sticky top-28">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">Limited Batch Offer</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">₹{course.offerPrice}</span>
                <span className="text-sm text-slate-500 line-through">₹{course.price}</span>
                <span className="text-xs text-emerald-400 font-bold">50% OFF</span>
              </div>
              <p className="text-[11px] text-slate-400">One-time payment • Validity: {course.validityDays} days</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Total Study Modules</span>
                <strong className="text-white">{course.materialsCount} Topics</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Mock Tests</span>
                <strong className="text-white">{course.testsCount} Papers</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Practice Reattempts</span>
                <strong className="text-emerald-400">5 per test</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>GST Tax</span>
                <strong className="text-white">Included</strong>
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full py-3.5 text-base shadow-xl"
              isLoading={isProcessing}
              onClick={handleEnroll}
            >
              Enroll & Start Learning
            </Button>

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant Access via Razorpay Secure Gateway</span>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
};
