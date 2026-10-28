import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Send, HelpCircle, AlertCircle, FileText } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  const getContent = () => {
    switch (path) {
      case 'about':
        return {
          title: 'About Learning Point',
          subtitle: 'Our Mission & Vision for Competitive Examination Candidates',
          body: (
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Learning Point</strong> is a premier educational platform specifically tailored for Indian competitive-exam aspirants, with an authoritative specialization in Agriculture (IBPS AFO, NABARD, ICAR, UPSSSC AGTA) alongside broader central and state government recruitment exams.
              </p>
              <h3 className="text-lg font-bold text-white">Pedagogical Philosophy</h3>
              <p>
                We believe that success in competitive examinations is not achieved through passive rote memorization, but through active, time-pressured practice on rigorously grounded syllabus papers with detailed conceptual explanations.
              </p>
              <h3 className="text-lg font-bold text-white">Platform Standards</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Server-authoritative timers that prepare students for actual computer-based test conditions.</li>
                <li>Authentic marking schemes (-0.25 negative marks) to train realistic risk-management strategies.</li>
                <li>Option shuffling on practice reattempts to test deep conceptual understanding.</li>
                <li>Zero fabricated reviews, zero misleading score claims, and verified pedagogical sources.</li>
              </ul>
            </div>
          ),
        };

      case 'contact':
        return {
          title: 'Help & Contact Support',
          subtitle: 'Have a question about a course, test series, or technical issue? Get in touch with our team.',
          body: (
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Email Support</h4>
                  <p className="text-xs text-slate-400">For enrollment inquiries, technical bugs, or billing support:</p>
                  <p className="text-sm font-semibold text-emerald-400">support@learningpoint.in</p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <Send className="w-5 h-5 text-sky-400" />
                  <h4 className="text-base font-bold text-white">Official Telegram Community</h4>
                  <p className="text-xs text-slate-400">Join our channel for daily updates and current affairs:</p>
                  <a href="https://t.me/agrilearningpoint" target="_blank" rel="noreferrer" className="text-sm font-semibold text-sky-400 hover:underline">
                    t.me/agrilearningpoint
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-white">Reporting Exam Question Discrepancies</h4>
                <p className="text-xs text-slate-400">
                  If you notice a typo, ambiguous phrasing, or incorrect option in any test question, please use the direct <strong>Report Question</strong> button inside the test results screen. Our academic review team inspects flagged items within 48 hours.
                </p>
              </div>
            </div>
          ),
        };

      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          subtitle: 'Clear answers on accounts, tests, scoring, payments, and validity.',
          body: (
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">How do test reattempts work?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every enrolled test provides 1 Authoritative Ranked Attempt plus 5 Practice Reattempts. The initial attempt establishes your rank on the All-India Leaderboard. The subsequent 5 attempts feature option shuffling and immediate score feedback.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">Is negative marking applied?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Yes, exams configured with negative marking strictly deduct 0.25 marks for every incorrect response, mirroring standard IBPS and central competitive examination rules.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">Can I share my account with a friend?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No. Learning Point enforces a Single Active Login policy. When a student logs in on a new device or browser, the previous session is automatically revoked.
                </p>
              </div>
            </div>
          ),
        };

      case 'updates':
        return {
          title: 'Exam Updates & Notifications',
          subtitle: 'Official announcements regarding syllabus changes, examination schedules, and new test papers.',
          body: (
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">New Release</Badge>
                  <span className="text-xs text-slate-400">October 2026</span>
                </div>
                <h4 className="text-base font-bold text-white">IBPS AFO Mains Grand Mock Series Released</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete bilingual 60-question mock tests updated with the latest Ministry of Agriculture data, MSP revisions, and recent ICAR crop releases are now live.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="gold">Announcement</Badge>
                  <span className="text-xs text-slate-400">October 2026</span>
                </div>
                <h4 className="text-base font-bold text-white">UPSSSC AGTA Special Practice Series</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Targeted section mocks for UP Special Agriculture and General Science are now accessible to all registered aspirants.
                </p>
              </div>
            </div>
          ),
        };

      case 'terms':
        return {
          title: 'Terms of Service',
          subtitle: 'Governing the use of Learning Point educational services, software, and content.',
          body: (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>Welcome to Learning Point. By registering for or using our services, you agree to these Terms of Service.</p>
              <h4 className="font-bold text-white">1. Account Security & Single Session Rule</h4>
              <p className="text-xs text-slate-300">Each account is strictly for individual student use. Sharing credentials, running scraping scripts, or distributing copyrighted questions/test material will result in immediate entitlement revocation without refund.</p>
              <h4 className="font-bold text-white">2. Content Ownership</h4>
              <p className="text-xs text-slate-300">All questions, explanations, blueprints, and materials are proprietary to Learning Point or licensed educational partners. Unauthorized reproduction is strictly prohibited.</p>
            </div>
          ),
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'Commitment to data minimization, student privacy, and compliance with the Indian DPDP Act 2023.',
          body: (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>We respect student privacy. We collect only the information necessary to provide authentication, test execution, and billing.</p>
              <h4 className="font-bold text-white">1. Information We Collect</h4>
              <p className="text-xs text-slate-300">Mobile number, name, encrypted passwords, test attempt answers, and transaction receipts. We do not sell student data or share test histories with third-party advertisers.</p>
              <h4 className="font-bold text-white">2. Data Security & Storage</h4>
              <p className="text-xs text-slate-300">All student databases are secured with Row Level Security (RLS) and encrypted backups stored on redundant cloud infrastructure.</p>
            </div>
          ),
        };

      case 'refund-policy':
        return {
          title: 'Refund & Cancellation Policy',
          subtitle: 'Transparent terms regarding course enrollments and subscription purchases.',
          body: (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>Due to the immediate digital unlocking of test banks, study notes, and video resources upon purchase, enrollments are generally non-refundable once content has been accessed or test attempts have commenced.</p>
              <h4 className="font-bold text-white">Technical Issues & Duplicate Transactions</h4>
              <p className="text-xs text-slate-300">If you experienced a double payment or an unverified transaction error where funds were debited without course activation, contact support@learningpoint.in with your Razorpay payment ID. Verified double charges are reversed within 5-7 business days.</p>
            </div>
          ),
        };

      case 'payment-policy':
        return {
          title: 'Payment Terms & Security',
          subtitle: 'Details regarding payment methods, taxes, and Razorpay processing.',
          body: (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>All payments are securely processed via Razorpay in Indian Rupees (INR). We support UPI (Google Pay, PhonePe, Paytm), Net Banking, and major Debit/Credit cards.</p>
              <h4 className="font-bold text-white">Tax Disclosures</h4>
              <p className="text-xs text-slate-300">All displayed course prices clearly indicate GST tax inclusion before checkout. No hidden charges are added at the time of payment confirmation.</p>
            </div>
          ),
        };

      case 'disclaimer':
      default:
        return {
          title: 'Exam Disclaimer',
          subtitle: 'Independent educational platform statement.',
          body: (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>Learning Point is an independent private educational and technology organization. We are not affiliated with, endorsed by, or an official representative of the Institute of Banking Personnel Selection (IBPS), National Bank for Agriculture and Rural Development (NABARD), Indian Council of Agricultural Research (ICAR), or any Union or State Public Service Commission.</p>
              <p className="text-xs text-slate-400">All exam names, trademarks, and logos belong to their respective statutory bodies and are used purely for nominative reference and educational relevance.</p>
            </div>
          ),
        };
    }
  };

  const { title, subtitle, body } = getContent();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <Badge variant="emerald">Learning Point Policies & Information</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
        {body}
      </div>
    </div>
  );
};
