import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  FileSpreadsheet, 
  Layers, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  History, 
  Bot, 
  Play, 
  Pause, 
  CheckCircle, 
  Upload, 
  Sparkles, 
  Clock, 
  FileCheck2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card3D } from '../components/ui/Card3D';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'ai-factory' | 'copilot' | 'reports'>('overview');
  
  // AI Job State
  const [aiJobStatus, setAiJobStatus] = useState<'running' | 'paused' | 'completed'>('running');
  const [aiAgriRatio, setAiAgriRatio] = useState({ master: 40, ai: 60 });

  // Copilot State
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<any>(null);
  const [isCopilotExecuting, setIsCopilotExecuting] = useState(false);

  // Sheets Importer State
  const [sheetUrl, setSheetUrl] = useState('');
  const [importState, setImportState] = useState<'idle' | 'importing' | 'success'>('idle');

  const handleRunCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotPrompt.trim()) return;

    setIsCopilotExecuting(true);
    setTimeout(() => {
      setIsCopilotExecuting(false);
      setCopilotResponse({
        intent: 'Draft Exam Question Review & Discrepancy Analysis',
        riskLevel: 'LOW (Read-Only & Staged Draft)',
        recommendation: 'Analyzed 5 pending question reports. Question #q-4 has confirmed typographical error in option text. Prepared draft correction for reviewer approval.',
        approvalRequired: false,
        stagedDiff: {
          field: 'options[0].text',
          original: 'Bemisia tabaci (Whitefly)',
          corrected: 'Bemisia tabaci (Sweetpotato Whitefly)',
        },
      });
    }, 900);
  };

  const handleSimulateImport = () => {
    setImportState('importing');
    setTimeout(() => {
      setImportState('success');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Title & Role Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Admin Operation Center</Badge>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> TOTP MFA Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Learning Point Admin & AI Control
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard', icon: Layers },
            { id: 'questions', label: 'Question Bank & Sheets', icon: FileSpreadsheet },
            { id: 'ai-factory', label: 'AI Factory & Models', icon: Cpu },
            { id: 'copilot', label: 'Admin Copilot', icon: Bot },
            { id: 'reports', label: 'Question Reports', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isCurrent ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card3D className="p-6 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Registered Students</span>
              <p className="text-3xl font-black text-white font-mono">1,248</p>
              <span className="text-[11px] text-emerald-400 font-medium">100% Mobile Verified</span>
            </Card3D>

            <Card3D className="p-6 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Active Exams Today</span>
              <p className="text-3xl font-black text-emerald-400 font-mono">342</p>
              <span className="text-[11px] text-slate-400 font-medium">0 Lost sync events</span>
            </Card3D>

            <Card3D className="p-6 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Question Bank Inventory</span>
              <p className="text-3xl font-black text-white font-mono">4,820</p>
              <span className="text-[11px] text-amber-400 font-medium">All with verified explanations</span>
            </Card3D>

            <Card3D className="p-6 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">AI Worker Queue</span>
              <p className="text-3xl font-black text-emerald-400 font-mono">Healthy</p>
              <span className="text-[11px] text-slate-400 font-medium">Gemini + Groq + OpenAI</span>
            </Card3D>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">System Security & Operations Audit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Weekly Backup Status</span>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> AES-256 Encrypted on Google Drive
                </p>
                <span className="text-[10px] text-slate-500">Last verified: 28 Oct 2026</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Single Active Login Enforcement</span>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Enforcing Server-Authoritative
                </p>
                <span className="text-[10px] text-slate-500">Prior sessions auto-revoked</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Razorpay Webhook Signature</span>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> HMAC-SHA256 Raw Byte Verified
                </p>
                <span className="text-[10px] text-slate-500">Idempotent fulfillment enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Question Bank & Google Sheets */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <Card3D className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <Badge variant="emerald">Master Question Ingestion</Badge>
              <h2 className="text-xl font-bold text-white">Google Sheets & CSV Importer</h2>
              <p className="text-xs text-slate-400">
                Idempotent question bank consolidation with duplicate detection, source row tracking, and review staging.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Google Sheets Read-Only URL / Source ID</label>
                <input
                  type="text"
                  placeholder="https://docs.google.com/spreadsheets/d/1.../edit?usp=sharing"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Auto-Normalizes Subject/Topic
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Hash Duplicate Detection
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Read-Only Source Protection
                </span>
              </div>

              <Button
                variant="primary"
                size="md"
                className="gap-2"
                isLoading={importState === 'importing'}
                onClick={handleSimulateImport}
              >
                <Upload className="w-4 h-4" />
                Validate & Import Sheet
              </Button>

              {importState === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                  <p className="font-bold">Import Batch #IMP-2026-10 Completed Successfully:</p>
                  <p>• 150 Master Questions processed from Sheet Tab 1</p>
                  <p>• 148 Accepted & Staged for Review</p>
                  <p>• 2 Exact Duplicates detected and skipped</p>
                </div>
              )}
            </div>
          </Card3D>
        </div>
      )}

      {/* Tab 3: AI Factory */}
      {activeTab === 'ai-factory' && (
        <div className="space-y-6">
          <Card3D className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <Badge variant="gold">AI Question Factory</Badge>
                <h2 className="text-xl font-bold text-white">Paper Generation & Model Routing</h2>
                <p className="text-xs text-slate-400">Configurable blueprint ratios and multi-provider fallback chain.</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={aiJobStatus === 'running' ? 'emerald' : 'slate'}>
                  Job Status: {aiJobStatus}
                </Badge>
                <Button
                  variant={aiJobStatus === 'running' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => setAiJobStatus(aiJobStatus === 'running' ? 'paused' : 'running')}
                  className="gap-1.5"
                >
                  {aiJobStatus === 'running' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {aiJobStatus === 'running' ? 'Pause Pipeline' : 'Resume Pipeline'}
                </Button>
              </div>
            </div>

            {/* Configurable Ratios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">Agriculture Exam Ratio</h4>
                <p className="text-slate-400">
                  Target: <strong>{aiAgriRatio.master}% Master Bank</strong> / <strong>{aiAgriRatio.ai}% Syllabus-Grounded AI</strong>
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={aiAgriRatio.master}
                    onChange={(e) => setAiAgriRatio({ master: Number(e.target.value), ai: 100 - Number(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm">Non-Agriculture Exam Ratio</h4>
                <p className="text-slate-400">
                  Target: <strong>100% Syllabus/PYQ-Grounded AI Generation</strong>
                </p>
                <Badge variant="emerald">Strict Rule Enforced</Badge>
              </div>
            </div>

            {/* Provider Status */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Multi-Provider Fallback Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Google Gemini</span>
                    <span className="text-emerald-400 font-semibold">Primary</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Status: Healthy (180ms latency)</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Groq Llama 3</span>
                    <span className="text-emerald-400 font-semibold">Fast Fallback</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Status: Standby</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">OpenAI GPT-4o</span>
                    <span className="text-amber-400 font-semibold">Validation Tier</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Independent Verification Active</p>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      )}

      {/* Tab 4: Admin Copilot */}
      {activeTab === 'copilot' && (
        <div className="space-y-6">
          <Card3D className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <Badge variant="gold">Assisted Operations</Badge>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" />
                Admin Contextual AI Copilot
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assisted queries, question review summaries, and draft configuration. Strict safety rules: Cannot modify payments, student scores, or production code without explicit 2-factor human confirmation.
              </p>
            </div>

            <form onSubmit={handleRunCopilot} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Analyze all flagged question reports for IBPS AFO Grand Mock 01 and draft corrections..."
                  value={copilotPrompt}
                  onChange={(e) => setCopilotPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 pr-28 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="absolute right-2 top-2 gap-1.5"
                  isLoading={isCopilotExecuting}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Analyze
                </Button>
              </div>
            </form>

            {copilotResponse && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                  <span className="font-bold text-white">Intent: {copilotResponse.intent}</span>
                  <Badge variant="emerald">{copilotResponse.riskLevel}</Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {copilotResponse.recommendation}
                </p>

                {copilotResponse.stagedDiff && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                    <span className="text-slate-400 uppercase font-bold">Staged Question Correction Diff:</span>
                    <p className="text-rose-400">- {copilotResponse.stagedDiff.original}</p>
                    <p className="text-emerald-400">+ {copilotResponse.stagedDiff.corrected}</p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Audit trail logged • Requester: Super Admin</span>
                  <Button variant="primary" size="sm">
                    Approve Staged Patch
                  </Button>
                </div>
              </div>
            )}
          </Card3D>
        </div>
      )}

      {/* Tab 5: Question Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Flagged Student Reports</h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="rose">Reported Typo</Badge>
                    <span className="text-slate-400 font-mono">Q-ID: q-4 (Plant Pathology)</span>
                  </div>
                  <p className="text-slate-300">
                    &ldquo;Option A spelling appears inconsistent with standard ICAR entomology nomenclature.&rdquo;
                  </p>
                  <span className="text-[10px] text-slate-500">Reported by Aspirant • 28 Oct 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">Reject</Button>
                  <Button variant="primary" size="sm">Accept & Fix</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
