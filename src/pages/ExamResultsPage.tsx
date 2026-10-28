import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Trophy, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Flag, 
  Check, 
  ArrowLeft, 
  HelpCircle,
  FileCheck2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';

const SAMPLE_QUESTIONS = [
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

export const ExamResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [result, setResult] = useState<any>(null);
  const [reportingQ, setReportingQ] = useState<any>(null);
  const [reportIssue, setReportIssue] = useState('incorrect_answer');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('lp_last_test_result');
    if (raw) {
      setResult(JSON.parse(raw));
    } else {
      // Default fallback demo result
      setResult({
        totalQuestions: 5,
        correct: 4,
        wrong: 1,
        unattempted: 0,
        positiveMarks: 4.0,
        negativeMarks: 0.25,
        finalScore: 3.75,
        timeSpentSeconds: 680,
        submittedAnswers: { 'q-1': 'opt-2', 'q-2': 'opt-2', 'q-3': 'opt-2', 'q-4': 'opt-1', 'q-5': 'opt-1' },
      });
    }
  }, []);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportingQ(null);
      setReportSuccess(false);
      setReportDesc('');
    }, 1200);
  };

  if (!result) return null;

  const accuracy = Math.round((result.correct / Math.max(1, result.correct + result.wrong)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Badge variant="emerald">Test Completed</Badge>
      </div>

      {/* Score Summary Hero Card */}
      <Card3D goldAccent className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border-amber-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Authoritative Examination Score</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {result.finalScore} <span className="text-lg font-normal text-slate-400">/ {result.totalQuestions} Marks</span>
            </h1>
            <p className="text-xs text-slate-400">
              Scoring Rule: +1.0 for Correct, -0.25 for Incorrect
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Rank Snapshot</span>
              <p className="text-lg font-bold text-amber-400 font-mono">#14 of 580</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Accuracy</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{accuracy}%</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Time Spent</span>
              <p className="text-lg font-bold text-slate-200 font-mono">{Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Correct Answers
            </span>
            <p className="text-xl font-bold text-white font-mono">{result.correct}</p>
            <span className="text-[10px] text-slate-400">+{result.positiveMarks} Marks</span>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-rose-400 font-semibold flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> Incorrect Answers
            </span>
            <p className="text-xl font-bold text-white font-mono">{result.wrong}</p>
            <span className="text-[10px] text-rose-400">-{result.negativeMarks} Marks</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Unattempted</span>
            <p className="text-xl font-bold text-white font-mono">{result.unattempted}</p>
            <span className="text-[10px] text-slate-400">0.0 Marks</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4" /> Practice Reattempts
            </span>
            <p className="text-xl font-bold text-white font-mono">5 Left</p>
            <span className="text-[10px] text-slate-400">Ranked attempt locked</span>
          </div>
        </div>

        {/* Practice Reattempt Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            <span>Want to re-test your conceptual retention? </span>
            <strong className="text-slate-200">Practice attempts feature shuffled options without affecting your ranked score.</strong>
          </div>
          <Link to={`/exam/attempt/${result.testId || 'test-1'}`}>
            <Button variant="gold" size="sm" className="gap-1.5 whitespace-nowrap">
              <RotateCcw className="w-4 h-4" />
              Start Practice Reattempt #1
            </Button>
          </Link>
        </div>
      </Card3D>

      {/* Solutions & Explanations Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-emerald-400" />
          Question-by-Question Solutions & Explanations
        </h2>
        <p className="text-xs text-slate-400">
          Review correct answers, your selection, and verified academic references for every question.
        </p>
      </div>

      {/* Question Review Cards */}
      <div className="space-y-6">
        {SAMPLE_QUESTIONS.map((q, idx) => {
          const userSelectedId = result.submittedAnswers?.[q.id];
          const isCorrect = userSelectedId === q.correctOptionId;
          const isUnattempted = !userSelectedId;

          return (
            <div key={q.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <Badge variant={isCorrect ? 'emerald' : isUnattempted ? 'slate' : 'rose'}>
                    {isCorrect ? 'Correct (+1.0)' : isUnattempted ? 'Unattempted (0.0)' : 'Incorrect (-0.25)'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-semibold">{q.subject}</span>
                </div>
                <button
                  onClick={() => setReportingQ(q)}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                  Report Issue
                </button>
              </div>

              {/* Statement */}
              <p className="text-base text-slate-100 font-medium leading-relaxed">
                <strong className="text-emerald-400 mr-2">Q{idx + 1}.</strong>
                {q.statement}
              </p>

              {/* Options Breakdown */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isThisCorrect = opt.id === q.correctOptionId;
                  const isThisUserSelected = opt.id === userSelectedId;

                  let borderClass = 'border-slate-800/80 bg-slate-950/40 text-slate-400';
                  if (isThisCorrect) {
                    borderClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold';
                  } else if (isThisUserSelected && !isThisCorrect) {
                    borderClass = 'border-rose-500 bg-rose-500/10 text-rose-300 font-semibold';
                  }

                  return (
                    <div key={opt.id} className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${borderClass}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                          isThisCorrect ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isThisUserSelected && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Your Choice
                          </span>
                        )}
                        {isThisCorrect && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Approved Explanation Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1.5">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Approved Conceptual Explanation:
                </h4>
                <p className="text-slate-300 leading-relaxed pl-5">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Question Report Modal */}
      {reportingQ && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-400" />
                Report Question Discrepancy
              </h3>
              <button onClick={() => setReportingQ(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center">
                Report logged successfully! Our academic team will review this question.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2 italic">
                  &ldquo;{reportingQ.statement}&rdquo;
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nature of Issue</label>
                  <select
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary"
                  >
                    <option value="incorrect_answer">Incorrect Official Answer Key</option>
                    <option value="incorrect_explanation">Inaccurate or Misleading Explanation</option>
                    <option value="ambiguous_wording">Ambiguous or Unclear Statement</option>
                    <option value="typo">Typographical Error / Spelling Mistake</option>
                    <option value="duplicate_question">Duplicate Question</option>
                    <option value="other">Other Academic Discrepancy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Detailed Feedback / Reference</label>
                  <textarea
                    rows={3}
                    placeholder="Provide book reference or correct calculation details..."
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="button" variant="secondary" className="w-full" onClick={() => setReportingQ(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-full">
                    Submit Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
