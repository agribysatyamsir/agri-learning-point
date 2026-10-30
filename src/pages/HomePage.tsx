import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  FileCheck2,
  Target, 
  Trophy, 
  Clock, 
  Check, 
  HelpCircle,
  Newspaper,
  BellRing,
  Download,
  Star,
  Users,
  ShieldCheck,
  Smartphone,
  Award,
  Video,
  Play
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { Badge } from '../components/ui/Badge';
import { EXAM_CATEGORIES, COURSES, TEST_SERIES, TOPPERS, FACULTIES } from '../data/mockData';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-24 pb-20 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Notice Ticker Banner */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-emerald-950/60 border-b border-emerald-500/20 py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-emerald-300">
            <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
              NEW BATCH
            </span>
            <span className="truncate font-medium">
              🔥 Admissions Open for IBPS AFO 2026-27 Complete Foundation Batch & UPSSSC AGTA! Flat 50% Off — Limited Seats.
            </span>
          </div>
          <Link to="/courses" className="text-amber-400 font-bold shrink-0 hover:underline flex items-center gap-1">
            Enroll Today <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section A: Hero */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-6 lg:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Messaging */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India&apos;s #1 Dedicated Agriculture Competitive Exam Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Crack Agriculture Exams <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  With Satyam Sir&apos;s
                </span> <br />
                Proven Strategy & Tests.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Targeted <strong>Bilingual (Hindi + English)</strong> preparation for <strong>IBPS AFO</strong>, <strong>UPSSSC AGTA</strong>, <strong>State ADO / BAO</strong>, <strong>ICAR JRF</strong>, and <strong>NABARD Grade A</strong>. Daily live classes, exam-oriented study material, and real CBT mock test engine.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/courses" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 text-base font-bold shadow-xl shadow-emerald-500/20">
                    Explore Flagship Batches
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

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Bilingual (Hindi + English)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  -0.25 CBT Negative Marking
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1,500+ Selections Record
                </span>
              </div>
            </div>

            {/* Right Column: Interactive CBT Mockup Card */}
            <div className="lg:col-span-5">
              <Card3D className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700/60 p-6 sm:p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Target className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Live CBT Test Runner</h3>
                      <p className="text-xs text-slate-400">IBPS AFO Mains Grand Mock 01</p>
                    </div>
                  </div>
                  <Badge variant="emerald">Live Interface</Badge>
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
                    <span>Sync: <span className="text-emerald-400 font-semibold">Autosaved Locally & Cloud</span></span>
                    <span className="text-amber-400 font-semibold">Marking: +1.0 / -0.25</span>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section B: Quick Action Shortcut Strip (Like agricoaching.in) */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Online Courses', desc: 'Live & Recorded', icon: BookOpen, href: '/courses', color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400' },
            { title: 'Test Series', desc: 'CBT Real Mocks', icon: FileCheck2, href: '/test-series', color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-400' },
            { title: 'Daily Free Quiz', desc: 'Topic-wise MCQs', icon: Sparkles, href: '/free-tests', color: 'from-teal-500/20 to-teal-500/5', iconColor: 'text-teal-400' },
            { title: 'PYQ Papers', desc: 'Solved PDF & CBT', icon: FileText, href: '/previous-year-papers', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400' },
            { title: 'Agri Affairs', desc: 'Monthly Digest', icon: Newspaper, href: '/current-affairs', color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-400' },
            { title: 'Job Alerts', desc: 'Recruitment 2026', icon: BellRing, href: '/job-alerts', color: 'from-rose-500/20 to-rose-500/5', iconColor: 'text-rose-400' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={idx} to={item.href} className="group">
                <Card3D className="p-4 text-center h-full flex flex-col items-center justify-center space-y-2 group-hover:border-emerald-500/50 transition-all">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-b ${item.color} border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </Card3D>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section C: Target Exam Streams */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="emerald">Exam Streams</Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Choose Your Target Agriculture Exam</h2>
          <p className="text-sm text-slate-400">
            Specialized curriculum designed around syllabus weightage, past paper trends, and ICAR references.
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
                  <span>View Syllabus & Batches</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card3D>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section D: Popular / Flagship Batches (agricoaching style) */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Badge variant="gold">Flagship Online Batches</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Popular Agriculture Batches</h2>
            <p className="text-sm text-slate-400">Enroll once and receive complete live sessions, class PDFs, and full CBT test series.</p>
          </div>
          <Link to="/courses">
            <Button variant="secondary" size="sm" className="gap-1.5">
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <Card3D key={course.id} goldAccent={course.isFeatured} className="flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={course.isFeatured ? 'gold' : 'slate'}>{course.category}</Badge>
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {course.medium}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {course.tagline}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-300 py-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {course.studentsCount}+ Enrolled
                  </span>
                </div>

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
                  <Button variant="primary" size="sm" className="font-semibold">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section E: Toppers Wall & Selections (Hall of Fame) */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="gold">Selections & Hall of Fame</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Our Star Performers & Selections</h2>
            <p className="text-sm text-slate-400">
              Aspirants who trusted Satyam Sir&apos;s guidance and cracked India&apos;s toughest agriculture competitive examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOPPERS.map((topper) => (
              <div key={topper.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={topper.avatar}
                      alt={topper.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{topper.name}</h4>
                      <Badge variant="emerald">{topper.badge}</Badge>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-amber-300">
                    {topper.rankOrPost}
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{topper.testimonial}&rdquo;
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2 font-mono">
                  {topper.exam} • Batch {topper.year}
                </div>
              </div>
            ))}
          </div>

          {/* Credibility Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">1,500+</div>
              <div className="text-xs text-emerald-400 font-semibold uppercase mt-0.5">Selections</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">50,000+</div>
              <div className="text-xs text-amber-400 font-semibold uppercase mt-0.5">Active Aspirants</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">150+</div>
              <div className="text-xs text-sky-400 font-semibold uppercase mt-0.5">CBT Mock Papers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">4.9 / 5.0</div>
              <div className="text-xs text-purple-400 font-semibold uppercase mt-0.5">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section F: Test Series Showcase */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Badge variant="emerald">Real CBT Simulation</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">All-India Agriculture Test Series</h2>
            <p className="text-sm text-slate-400">Exact IBPS & State PSC interface with -0.25 negative marking, timer lock, and 5 reattempts.</p>
          </div>
          <Link to="/test-series">
            <Button variant="secondary" size="sm" className="gap-1.5">
              View All Test Series
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
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
                  <Button variant={test.isFree ? 'primary' : 'gold'} size="sm" className="gap-1.5">
                    <Play className="w-3.5 h-3.5" />
                    {test.isFree ? 'Start Test' : 'Enroll to Unlock'}
                  </Button>
                </Link>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section G: Faculty Spotlight (Satyam Sir & Team) */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="emerald">Expert Faculty</Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Learn From India&apos;s Leading Agri Mentors</h2>
          <p className="text-sm text-slate-400">
            Guided by Satyam Sir and distinguished agricultural scientists with decades of university & competitive coaching experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACULTIES.map((fac) => (
            <Card3D key={fac.id} className="p-6 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-500/40">
                <img src={fac.avatar} alt={fac.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{fac.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{fac.role}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
                <p><strong>Subject:</strong> {fac.specialization}</p>
                <p><strong>Experience:</strong> {fac.experience}</p>
                <p className="text-[11px] text-slate-400">{fac.education}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section H: Mobile App Promotion (agricoaching style) */}
      {/* ------------------------------------------------------------------ */}
      <section id="download-app" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Agri Learning Point Mobile App</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Study On The Go With Our <br />
                Official Android Mobile App.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Attend daily live classes, download offline PDF notes, attempt speed mock quizzes on your phone, and receive instant exam job notifications.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-emerald-500 text-white transition-all shadow-xl"
                >
                  <Download className="w-5 h-5 text-emerald-400" />
                  <div className="text-left text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Get it on</span>
                    <strong className="text-sm font-bold">Google Play Store</strong>
                  </div>
                </a>

                <a
                  href="https://t.me/agribysatyamsir"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-sky-500 text-white transition-all shadow-xl"
                >
                  <Smartphone className="w-5 h-5 text-sky-400" />
                  <div className="text-left text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Direct Download</span>
                    <strong className="text-sm font-bold">Android APK / Web-App</strong>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Free Tests Included
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Offline PDF Download
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Instant Rank Alerts
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                  {/* QR Code Graphic placeholder */}
                  <div className="w-full h-full border-2 border-dashed border-slate-900 flex flex-col items-center justify-center text-slate-900 text-center">
                    <Smartphone className="w-8 h-8 text-slate-900 mb-1" />
                    <span className="text-[10px] font-bold">SCAN TO INSTALL</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-white">Scan QR to install on phone</p>
                <span className="text-[10px] text-slate-400 block">Supports Android 8.0 and above</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section I: FAQ */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="emerald">Help & Clarity</Badge>
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Everything you need to know about batches, test series, and enrolment.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Classes kis medium me conduct hoti hain (Hindi or English)?',
              a: 'Hamare sabhi flagship batches (IBPS AFO, UPSSSC AGTA, State ADO) Bilingual medium (Hindi + English) me conduct hote hain. Technical agriculture terms English me samjhaye jaate hain aur conceptual delivery Saral Hindi me hoti hai, jisse dono medium ke students ko 100% clarity milti hai.',
            },
            {
              q: 'Kya test series me real CBT pattern aur -0.25 negative marking hoti hai?',
              a: 'Haan. Hamara test series platform exact IBPS aur State PSC exam pattern par based hai. Isme server-authoritative timer, -0.25 negative marking, All-India Ranking Percentile, aur post-submission instant detailed solutions milte hain.',
            },
            {
              q: 'Agar class miss ho jaye to kya recorded backup milta hai?',
              a: 'Bilkul! Sabhi live classes automatically aapke dashboard me save ho jaati hain, jinhe aap apni validity ke dauran kisi bhi samay kitni bhi baar (unlimited views) dekh sakte hain.',
            },
            {
              q: 'Study material PDF format me milta hai ya printed book?',
              a: 'Har lecture ke sath high-yield Class Notes PDF download ke liye uplabdh rehte hain. Sath hi flagship foundation batches me complete printed theory + question bank booklets courier ke through ghar bhejne ka vikalp bhi rehta hai.',
            },
            {
              q: 'Admission ya batch related koi doubt ho to kisse contact karein?',
              a: 'Aap direct hamare Telegram channel @agribysatyamsir par connect kar sakte hain ya platform ke Help & Admission Desk par inquiry submit kar sakte hain.',
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
