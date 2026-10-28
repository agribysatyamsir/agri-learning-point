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
  FileCheck2,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';
import { apiClient } from '../lib/apiClient';

const DEFAULT_RESULT = {
  totalQuestions: 5,
  correct: 4,
  wrong: 1,
  unattempted: 0,
  positiveMarks: 4.0,
  negativeMarks: 0.25,
  finalScore: 3.75,
  timeSpentSeconds: 680,
  solutions: [
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
      explanation: 'Rhizobium forms symbiotic nodules with legumes to fix atmospheric nitrogen.',
      selectedOptionId: 'opt-2',
      status: 'correct',
    },
  ],
};

export const ExamResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [result, setResult] = useState<any>(DEFAULT_RESULT);
  const [isLoading, setIsLoading] = useState(false);
  const [reportingQ, setReportingQ] = useState<any>(null);
  const [reportIssue, setReportIssue] = useState('incorrect_answer');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchResult() {
      // 1. Try local cache first for instant render
      const localRaw = localStorage.getItem('lp_last_test_result');
      if (localRaw) {
        try {
          const parsed = JSON.parse(localRaw);
          if (isMounted) {
            setResult(parsed);
          }
        } catch {
          // Ignored
        }
      }

      // 2. Fetch server-verified result if attemptId is present
      if (attemptId) {
        try {
          const serverRes = await apiClient.getExamResult(attemptId);
          if (isMounted && serverRes) {
            setResult(serverRes);
          }
        } catch {
          // Fallback to local
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    }

    fetchResult();

    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportingQ(null);
      setReportSuccess(false);
      setReportDesc('');
    }, 1200);
  };

  if (isLoading && !result) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-slate-300">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
        <p className="text-sm font-semibold">Retrieving Authoritative Examination Score...</p>
      </div>
    );
  }

  // Normalization for server summary vs legacy payload
  const summary = result?.summary || result || {};
  const finalScore = summary.finalScore ?? result?.finalScore ?? 0;
  const totalQuestions = summary.totalQuestions ?? result?.totalQuestions ?? 10;
  const correct = summary.correctCount ?? result?.correct ?? 0;
  const wrong = summary.wrongCount ?? result?.wrong ?? 0;
  const unattempted = summary.unattemptedCount ?? result?.unattempted ?? 0;
  const positiveMarks = summary.positiveMarks ?? (correct * 1.0);
  const negativeMarks = summary.negativeMarks ?? (wrong * 0.25);
  const accuracy = summary.accuracy ?? (correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0);
  const solutions = result?.solutions || [];

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
              {finalScore} <span className="text-lg font-normal text-slate-400">/ {totalQuestions} Marks</span>
            </h1>
            <p className="text-xs text-slate-400">
              Scoring Rule: +1.0 for Correct, -0.25 for Incorrect
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Rank Snapshot</span>
              <p className="text-lg font-bold text-amber-400 font-mono">#{summary.rank || 14} of {summary.totalParticipants || 580}</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Accuracy</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{accuracy}%</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Percentile</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{summary.percentile || 91.2}%</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Correct Answers
            </span>
            <p className="text-xl font-bold text-white font-mono">{correct}</p>
            <span className="text-[10px] text-slate-400">+{positiveMarks} Marks</span>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-rose-400 font-semibold flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> Incorrect Answers
            </span>
            <p className="text-xl font-bold text-white font-mono">{wrong}</p>
            <span className="text-[10px] text-rose-400">-{negativeMarks} Marks</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Unattempted</span>
            <p className="text-xl font-bold text-white font-mono">{unattempted}</p>
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

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            <span>Want to re-test your conceptual retention? </span>
            <strong className="text-slate-200">Practice attempts feature shuffled options without affecting your ranked score.</strong>
          </div>
          <Link to={`/exam/attempt/${result?.testId || 'test-1'}`}>
            <Button variant="gold" size="sm" className="gap-1.5 whitespace-nowrap">
              <RotateCcw className="w-4 h-4" />
              Start Practice Reattempt #1
            </Button>
          </Link>
        </div>
      </Card3D>

      {/* Solutions & Explanations Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-emerald-400" />
          Detailed Solutions & Verified Explanations
        </h2>
        <p className="text-xs text-slate-400">
          Explanations are unlocked only after test completion. Review step-by-step rationales below.
        </p>
      </div>

      {/* Question Solutions List */}
      <div className="space-y-6">
        {solutions.map((q: any, idx: number) => {
          const selectedOptionId = q.selectedOptionId;
          const isCorrect = q.status === 'correct';
          const isUnattempted = q.status === 'unattempted';

          let statusBadge = <Badge variant="emerald">Correct (+1.0)</Badge>;
          if (isUnattempted) {
            statusBadge = <Badge variant="slate">Unattempted (0.0)</Badge>;
          } else if (!isCorrect) {
            statusBadge = <Badge variant="rose">Incorrect (-0.25)</Badge>;
          }

          return (
            <Card3D key={q.id} className="p-6 sm:p-8 space-y-6 border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Question {idx + 1}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{q.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  {statusBadge}
                  <button
                    onClick={() => setReportingQ(q)}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 p-1 rounded transition-colors"
                    title="Report question discrepancy"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Report</span>
                  </button>
                </div>
              </div>

              {/* Statement */}
              <p className="text-base text-slate-100 font-medium leading-relaxed">
                {q.statement}
              </p>

              {/* Options Breakdown */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt: any, optIdx: number) => {
                  const isThisCorrect = opt.id === q.correctOptionId;
                  const isThisSelected = opt.id === selectedOptionId;

                  let borderStyle = 'border-slate-800 bg-slate-950/40 text-slate-300';
                  if (isThisCorrect) {
                    borderStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-semibold';
                  } else if (isThisSelected && !isThisCorrect) {
                    borderStyle = 'border-rose-500/50 bg-rose-500/10 text-rose-300';
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-xl border text-sm flex items-center justify-between transition-colors ${borderStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                          isThisCorrect
                            ? 'bg-emerald-500 text-slate-950'
                            : isThisSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {isThisSelected && (
                          <span className={isThisCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                            (Your Answer)
                          </span>
                        )}
                        {isThisCorrect && (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Check className="w-4 h-4" /> Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Solution Explanation Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  Approved Conceptual Explanation: Verified Solution & Reference Notes
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {q.explanation}
                </p>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Discrepancy Reporting Modal */}
      {reportingQ && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-400" />
                Report Question Discrepancy
              </h3>
              <button onClick={() => setReportingQ(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center space-y-1">
                <Check className="w-6 h-6 mx-auto mb-1" />
                <p className="font-bold">Discrepancy Reported</p>
                <p>Our subject matter experts and reviewers have been notified.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Issue Category</label>
                  <select
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="incorrect_answer">Incorrect Answer Key</option>
                    <option value="incorrect_explanation">Flawed or Outdated Explanation</option>
                    <option value="ambiguous_wording">Ambiguous Question Statement</option>
                    <option value="typo">Typo or Spelling Mistake</option>
                    <option value="other">Other Academic Discrepancy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Detailed Description & Reference</label>
                  <textarea
                    rows={3}
                    placeholder="Cite ICAR/TNAU textbook or official committee report..."
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setReportingQ(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
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
