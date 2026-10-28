import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Menu, 
  X, 
  ShieldAlert,
  Sparkles 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Question {
  id: string;
  statement: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  subject: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    subject: 'Agronomy & Soil Science',
    statement: 'Which among the following bio-fertilizers is most specifically adapted for atmospheric nitrogen fixation in pulse crops through symbiotic nodulation?',
    options: [
      { id: 'opt-1', text: 'Azotobacter chroococcum' },
      { id: 'opt-2', text: 'Rhizobium leguminosarum' },
      { id: 'opt-3', text: 'Azospirillum brasilense' },
      { id: 'opt-4', text: 'Blue Green Algae (Anabaena)' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Rhizobium forms symbiotic nodules with legumes to fix atmospheric nitrogen. Azotobacter and Azospirillum are free-living and associative, whereas Blue Green Algae is predominantly used in wetland rice paddies.',
  },
  {
    id: 'q-2',
    subject: 'Agricultural Economics & Schemes',
    statement: 'Under the Pradhan Mantri Fasal Bima Yojana (PMFBY), what is the uniform maximum premium payable by farmers for all Kharif food and oilseed crops?',
    options: [
      { id: 'opt-1', text: '1.5% of sum insured' },
      { id: 'opt-2', text: '2.0% of sum insured' },
      { id: 'opt-3', text: '5.0% of sum insured' },
      { id: 'opt-4', text: '2.5% of sum insured' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Under PMFBY, the maximum premium payable by farmers is 2.0% for Kharif crops, 1.5% for Rabi food & oilseeds, and 5.0% for commercial/annual horticultural crops.',
  },
  {
    id: 'q-3',
    subject: 'Horticulture & Plant Breeding',
    statement: 'What is the optimum temperature range required for lycopene pigment synthesis and deep red color development in tomato fruit?',
    options: [
      { id: 'opt-1', text: '12°C to 15°C' },
      { id: 'opt-2', text: '21°C to 24°C' },
      { id: 'opt-3', text: '32°C to 35°C' },
      { id: 'opt-4', text: '38°C to 42°C' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Lycopene development in tomatoes is optimal between 21°C and 24°C. Temperatures exceeding 27°C inhibit lycopene synthesis while above 30°C only yellow carotene is formed.',
  },
  {
    id: 'q-4',
    subject: 'Plant Pathology & Entomology',
    statement: 'The vector responsible for the transmission of Potato Leaf Roll Virus (PLRV) in field conditions is:',
    options: [
      { id: 'opt-1', text: 'Bemisia tabaci (Whitefly)' },
      { id: 'opt-2', text: 'Myzus persicae (Green peach aphid)' },
      { id: 'opt-3', text: 'Nephotettix virescens (Green leafhopper)' },
      { id: 'opt-4', text: 'Thrips palmi' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Potato Leaf Roll Virus (PLRV) is persistently transmitted primarily by Myzus persicae (Green peach aphid). Whitefly transmits Gemini viruses such as Yellow Mosaic.',
  },
  {
    id: 'q-5',
    subject: 'Animal Husbandry & Dairying',
    statement: 'Which indigenous Indian cattle breed is renowned for having the highest milk yield among desi dairy breeds and originated in Gujarat?',
    options: [
      { id: 'opt-1', text: 'Gir' },
      { id: 'opt-2', text: 'Sahiwal' },
      { id: 'opt-3', text: 'Red Sindhi' },
      { id: 'opt-4', text: 'Tharparkar' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Gir cattle originate in the Gir forests of Saurashtra, Gujarat, known for high milk yield and heat tolerance. Sahiwal originated in Montgomery (Pakistan).',
  },
];

export const ExamRunnerPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes countdown
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  const timerRef = useRef<any>(null);

  // Authoritative countdown timer simulation
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // 120s Batch Sync simulation
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSyncStatus('syncing');
      setTimeout(() => setSyncStatus('synced'), 600);
    }, 120000);

    return () => clearInterval(syncInterval);
  }, []);

  const currentQ = SAMPLE_QUESTIONS[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleFinalSubmit = () => {
    // Calculate final scores
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    SAMPLE_QUESTIONS.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (!selected) {
        unattempted++;
      } else if (selected === q.correctOptionId) {
        correct++;
      } else {
        wrong++;
      }
    });

    const positiveMarks = correct * 1.0;
    const negativeMarks = wrong * 0.25;
    const finalScore = positiveMarks - negativeMarks;

    const resultPayload = {
      testId,
      totalQuestions: SAMPLE_QUESTIONS.length,
      correct,
      wrong,
      unattempted,
      positiveMarks,
      negativeMarks,
      finalScore: Number(finalScore.toFixed(2)),
      timeSpentSeconds: 45 * 60 - timeLeft,
      submittedAnswers: selectedAnswers,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('lp_last_test_result', JSON.stringify(resultPayload));
    navigate('/exam/results/attempt-live-01');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Authoritative Bar */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-950 p-0.5">
            <img src="/assets/branding/logo.png" alt="Learning Point" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              IBPS AFO Mains 2026: Grand Mock Test 01
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>Marking: +1.0 / -0.25</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Cloud Sync: {syncStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm font-bold text-amber-400">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowSubmitModal(true)}
            className="hidden sm:inline-flex"
          >
            Submit Paper
          </Button>

          <button
            onClick={() => setPaletteOpen(!paletteOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Question Palette"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="emerald">Question {currentIndex + 1} of {SAMPLE_QUESTIONS.length}</Badge>
                <span className="text-xs text-slate-400">{currentQ.subject}</span>
              </div>
              <button
                onClick={handleToggleReview}
                className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {markedForReview[currentQ.id] ? 'Marked' : 'Mark for Review'}
              </button>
            </div>

            {/* Statement */}
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
              {currentQ.statement}
            </p>

            {/* Options with Stable UUIDs */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                    {isSelected && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {currentIndex < SAMPLE_QUESTIONS.length - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  Save & Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit Final Test
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Question Palette (Desktop & Mobile Drawer) */}
        <div className={`lg:col-span-4 lg:block ${paletteOpen ? 'fixed inset-0 z-50 bg-slate-950/90 p-4 flex flex-col justify-center' : 'hidden'}`}>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Question Palette</h3>
              {paletteOpen && (
                <button onClick={() => setPaletteOpen(false)} className="lg:hidden text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-800" />
                <span>Unattempted ({SAMPLE_QUESTIONS.length - answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Marked ({reviewCount})</span>
              </div>
            </div>

            {/* Matrix */}
            <div className="grid grid-cols-5 gap-2.5 pt-2">
              {SAMPLE_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(selectedAnswers[q.id]);
                const isMarked = Boolean(markedForReview[q.id]);

                let bgClass = 'bg-slate-950 border-slate-800 text-slate-400';
                if (isCurrent) bgClass = 'ring-2 ring-primary border-primary text-white';
                else if (isMarked) bgClass = 'bg-amber-500/20 border-amber-500/40 text-amber-300';
                else if (isAnswered) bgClass = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setPaletteOpen(false);
                    }}
                    className={`h-10 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <Button
              variant="danger"
              className="w-full sm:hidden py-3"
              onClick={() => {
                setPaletteOpen(false);
                setShowSubmitModal(true);
              }}
            >
              Submit Paper
            </Button>
          </div>
        </div>
      </div>

      {/* Final Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Confirm Test Submission</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Once submitted, answers cannot be modified. Your attempt will be evaluated server-side and recorded on the leaderboard.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-400">Answered</span>
                <p className="text-base font-bold text-emerald-400 mt-0.5">{answeredCount}</p>
              </div>
              <div>
                <span className="text-slate-400">Unanswered</span>
                <p className="text-base font-bold text-slate-300 mt-0.5">{SAMPLE_QUESTIONS.length - answeredCount}</p>
              </div>
              <div>
                <span className="text-slate-400">Marked</span>
                <p className="text-base font-bold text-amber-400 mt-0.5">{reviewCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShowSubmitModal(false)}
              >
                Back to Test
              </Button>
              <Button
                variant="primary"
                className="w-full"
                onClick={handleFinalSubmit}
              >
                Yes, Submit Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
