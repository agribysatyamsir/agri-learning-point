import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, Download, Sparkles, Check, ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';
import { CURRENT_AFFAIRS_ITEMS } from '../data/mockData';

export const CurrentAffairsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Government Schemes & MSP',
    'Crop Insurance',
    'Agricultural Science & Research',
    'Agricultural Credit & Banking'
  ];

  const filteredItems = selectedCategory === 'All'
    ? CURRENT_AFFAIRS_ITEMS
    : CURRENT_AFFAIRS_ITEMS.filter((item) => item.category === selectedCategory);

  const handleDownloadMonthlyPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `Learning Point — Monthly Agriculture Current Affairs Digest (October 2026)\nCurated by Satyam Sir for IBPS AFO, State ADO, and NABARD Grade A.\nWebsite: https://agri-learning-point.agribysatyamsir.workers.dev/`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Agri_Current_Affairs_October_2026_Digest.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily & Monthly Exam Digest</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Agriculture Current Affairs & Schemes
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          High-yield exam-oriented updates covering CCEA MSP decisions, PMFBY, KCC, budget allocations, and ICAR research breakthroughs.
        </p>
      </div>

      {/* Action Bar: Download PDF & Test CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">October 2026 Monthly Compendium</h4>
            <p className="text-xs text-slate-400">Complete bilingual PDF with 100 practice MCQs</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="gold"
            size="sm"
            className="gap-1.5 flex-1 sm:flex-initial"
            onClick={handleDownloadMonthlyPDF}
          >
            <Download className="w-4 h-4" />
            Download Monthly PDF
          </Button>
          <Link to="/exam/attempt/test-2" className="flex-1 sm:flex-initial">
            <Button variant="primary" size="sm" className="gap-1.5 w-full">
              <Play className="w-4 h-4" />
              Practice Free Mock
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Current Affairs Cards */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <Card3D key={item.id} className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="emerald">{item.category}</Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {item.date}
                </span>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">Source: {item.source}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {item.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {item.summary}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Exam High-Yield Takeaways:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {item.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
};
