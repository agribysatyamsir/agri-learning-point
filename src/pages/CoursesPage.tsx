import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Search, Filter } from 'lucide-react';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { COURSES } from '../data/mockData';

export const CoursesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="gold">Comprehensive Curriculum</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Courses & Batches
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Complete exam-oriented batches with structured video/PDF resources, test series, and teacher guidance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses or exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'Banking', 'Regulatory', 'State Agriculture'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Batches' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((course) => (
          <Card3D key={course.id} goldAccent={course.isFeatured} className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={course.isFeatured ? 'gold' : 'slate'}>{course.category}</Badge>
                <span className="text-xs text-slate-400 font-medium">{course.validityDays} Days</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {course.tagline}
              </p>

              <div className="py-2 space-y-2 border-t border-b border-slate-800 text-xs text-slate-300">
                {course.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">₹{course.offerPrice}</span>
                  <span className="text-xs text-slate-500 line-through">₹{course.price}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">Inclusive of GST</span>
              </div>
              <Link to={`/course/${course.slug}`}>
                <Button variant="primary" size="sm">
                  Enroll Now
                </Button>
              </Link>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};
