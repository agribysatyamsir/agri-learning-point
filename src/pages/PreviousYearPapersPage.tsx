import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, CheckCircle2, ArrowRight, Sparkles, Filter, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';
import { PREVIOUS_YEAR_PAPERS } from '../data/mockData';

export const PreviousYearPapersPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const exams = ['All', 'IBPS AFO', 'UPSSSC AGTA', 'Haryana ADO', 'ICAR JRF', 'NABARD Grade A'];

  const filteredPapers = selectedExam === 'All'
    ? PREVIOUS_YEAR_PAPERS
    : PREVIOUS_YEAR_PAPERS.filter((p) => p.exam.toLowerCase().includes(selectedExam.toLowerCase()));

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // Create simulated PDF download
      const element = document.createElement('a');
      const file = new Blob([
        `Learning Point — ${title}\nOfficial Solved Paper with Explanations by Satyam Sir.\nWebsite: https://agri-learning-point.agribysatyamsir.workers.dev/`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Solved.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Question Bank Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Agriculture Previous Year Papers (PYQ)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Download free solved question papers with official answer keys or attempt them in our real-time CBT examination interface.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {exams.map((exam) => (
          <button
            key={exam}
            onClick={() => setSelectedExam(exam)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedExam === exam
                ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {exam}
          </button>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <Card3D key={paper.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="emerald">{paper.exam}</Badge>
                <span className="text-xs text-amber-400 font-bold font-mono">Year {paper.year}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {paper.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>Questions: <strong className="text-slate-200">{paper.questionsCount} MCQs</strong></span>
                <span>Time: <strong className="text-slate-200">{paper.durationMinutes} Mins</strong></span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Over {paper.downloadCount.toLocaleString()} aspirants practiced</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="gap-1.5 text-xs flex-1"
                isLoading={downloadingId === paper.id}
                onClick={() => handleDownload(paper.id, paper.title)}
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </Button>

              {paper.testId && (
                <Link to={`/exam/attempt/${paper.testId}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full gap-1.5 text-xs">
                    <Play className="w-3.5 h-3.5" />
                    Attempt CBT
                  </Button>
                </Link>
              )}
            </div>
          </Card3D>
        ))}
      </div>

      {/* Preparation Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-white">Need Systematic Coaching For Upcoming Agri Exams?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Join Satyam Sir&apos;s Flagship Batches with daily live sessions, full printed notes, and all-India mock tests.
          </p>
        </div>
        <Link to="/courses" className="shrink-0">
          <Button variant="gold" size="md" className="gap-2">
            Explore All Batches
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
