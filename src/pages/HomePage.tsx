import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Target, 
  ShieldAlert, 
  Trophy, 
  Clock, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { EXAM_CATEGORIES, COURSES, TEST_SERIES } from '../data/mockData';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Section A: Hero */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-12 lg:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Messaging */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Competitive Examination Prep</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Master Your Exam With <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Targeted, High-Yield
                </span> <br />
                Practice & Courses.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Structured bilingual preparation for <strong>IBPS AFO</strong>, <strong>NABARD</strong>, <strong>ICAR</strong>, <strong>UPSSSC AGTA</strong>, and state competitive exams. Syllabus-aligned test papers, server-authoritative timer, and verified explanations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/courses" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Explore Courses
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/free-tests" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Try Free Mock Test
                  </Button>
                </Link>
              </div>

              {/* Trust Pill Bar */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Real Exam Pattern
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  -0.25 Negative Marking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  5 Practice Reattempts
                </span>
              </div>
            </div>

            {/* Right Column: Visual Education Mockup Card */}
            <div className="lg:col-span-5">
              <Card3D className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700/60 p-6 sm:p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Target className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Exam Runner</h3>
                      <p className="text-xs text-slate-400">IBPS AFO Mains Grand Mock</p>
                    </div>
                  </div>
                  <Badge variant="emerald">In Progress</Badge>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Question 14 of 60</span>
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 32:45 Left
                      </span>
                    </div>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      Which of the following bio-fertilizers is most appropriate for pulse crop inoculation to enhance atmospheric nitrogen fixation?
                    </p>
                  </div>

                  <div className="space-y-2">
                    {['Azotobacter', 'Rhizobium leguminosarum', 'Azospirillum', 'Blue Green Algae (BGA)'].map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                          idx === 1
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                            : 'bg-slate-900/50 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                        {idx === 1 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Sync Status: <span className="text-emerald-400 font-semibold">Saved Locally & Cloud</span></span>
                    <span className="text-amber-400 font-semibold">Marks: +1.0 / -0.25</span>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section B: Exam Categories */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="emerald">Exam Streams</Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Choose Your Target Exam</h2>
          <p className="text-sm text-slate-400">
            Specialized curriculum designed around authorized exam blueprints and past question trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAM_CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/exams/${cat.slug}`}>
              <Card3D className="h-full flex flex-col justify-between group hover:border-emerald-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald">{cat.badge}</Badge>
                    <span className="text-xs text-slate-400">{cat.testCount} Tests Available</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>View Syllabus & Tests</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card3D>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section C: Featured Courses */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <Badge variant="gold">Comprehensive Batches</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Featured Courses & Batches</h2>
            <p className="text-sm text-slate-400">Enroll once and receive full validity, mock papers, and study resources.</p>
          </div>
          <Link to="/courses">
            <Button variant="secondary" size="sm" className="gap-1.5">
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <Card3D key={course.id} goldAccent={course.isFeatured} className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={course.isFeatured ? 'gold' : 'slate'}>{course.category}</Badge>
                  <span className="text-xs text-slate-400">{course.validityDays} Days Validity</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {course.tagline}
                </p>

                {/* Features List */}
                <div className="py-2 space-y-2 border-t border-b border-slate-800 text-xs text-slate-300">
                  {course.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
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
                    View Course
                  </Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section D: Test-Series Preview */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="emerald">Examination Readiness</Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Structured Test Series</h2>
          <p className="text-sm text-slate-400">
            Real exam simulation with server-authoritative timer, auto-sync, and 5 practice reattempts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEST_SERIES.map((test) => (
            <Card3D key={test.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={test.isFree ? 'emerald' : 'gold'}>
                    {test.isFree ? 'Free Mock' : 'Full Series'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">{test.durationMinutes} Mins</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {test.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 py-2">
                  <span>Questions: <strong className="text-slate-200">{test.questionsCount}</strong></span>
                  <span>Marking: <strong className="text-emerald-400">+{test.markingScheme.correct} / -{test.markingScheme.wrong}</strong></span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{test.attemptsAllowed} Attempts Total</span>
                <Link to={`/exam/attempt/${test.id}`}>
                  <Button variant={test.isFree ? 'primary' : 'gold'} size="sm">
                    {test.isFree ? 'Start Test' : 'Enroll to Unlock'}
                  </Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section E: How Learning Point Works */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-slate-800/80">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">How Learning Point Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">Four straightforward steps to systematic examination preparation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Select Target Exam', desc: 'Pick your stream from IBPS AFO, NABARD, ICAR, or State Agri services.' },
              { step: '02', title: 'Choose Course or Test', desc: 'Enroll in structured batches or test series designed around syllabus weightage.' },
              { step: '03', title: 'Attempt Structured Tests', desc: 'Practice with timed exams, local autosave, and safe option shuffling.' },
              { step: '04', title: 'Analyze & Retest', desc: 'Inspect authoritative explanations and utilize your 5 practice reattempts.' },
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-2xl font-black text-emerald-400 font-mono">{item.step}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section F: FAQ & Direct Support */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Essential information regarding tests, scoring, validity, and access.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does the 1 ranked attempt + 5 practice reattempts policy work?',
              a: 'Your initial attempt is recorded on the public leaderboard and counts toward authoritative rank percentiles. Subsequently, you receive up to 5 practice reattempts with shuffled options to deepen conceptual retention without overriding your initial ranked score.',
            },
            {
              q: 'What happens if my network disconnects or browser refreshes during an exam?',
              a: 'All selected answers are saved instantly in your browser (IndexedDB) and synchronized to the cloud every 120 seconds. The countdown timer is locked on the server; when you reconnect, your time and responses are fully restored.',
            },
            {
              q: 'Can I access Learning Point on mobile and desktop?',
              a: 'Yes. The interface is optimized across small mobile viewports (320px+), tablets, and desktops, featuring high touch targets and an accessible bottom drawer navigation for mobile exam takers.',
            },
            {
              q: 'How are payments and course access handled?',
              a: 'All payments are handled securely through Razorpay using 256-bit SSL encryption. Course entitlements are activated immediately upon verified webhook signature verification.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
