export interface ExamCategory {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  badge: string;
  icon: string;
  courseCount: number;
  testCount: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  examSlug: string;
  tagline: string;
  description: string;
  price: number;
  offerPrice: number;
  validityDays: number;
  testsCount: number;
  materialsCount: number;
  features: string[];
  isFeatured?: boolean;
}

export interface TestSeries {
  id: string;
  slug: string;
  title: string;
  exam: string;
  questionsCount: number;
  durationMinutes: number;
  isFree: boolean;
  attemptsAllowed: number;
  syllabus: string[];
  markingScheme: {
    correct: number;
    wrong: number;
  };
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'cat-1',
    slug: 'ibps-afo',
    title: 'IBPS AFO (Agriculture Field Officer)',
    shortDesc: 'Comprehensive preparation for Prelims and Mains specialized in Agriculture.',
    badge: 'BANKING',
    icon: 'Building2',
    courseCount: 3,
    testCount: 25,
  },
  {
    id: 'cat-2',
    slug: 'nabard-grade-a',
    title: 'NABARD Grade A & B',
    shortDesc: 'Agriculture & Rural Development (ARD) and Economic & Social Issues (ESI).',
    badge: 'REGULATORY',
    icon: 'Landmark',
    courseCount: 2,
    testCount: 20,
  },
  {
    id: 'cat-3',
    slug: 'icar-jrf-srf',
    title: 'ICAR JRF / SRF',
    shortDesc: 'Postgraduate entrance tests for Agronomy, Horticulture, Soil Science and Genetics.',
    badge: 'RESEARCH',
    icon: 'GraduationCap',
    courseCount: 4,
    testCount: 30,
  },
  {
    id: 'cat-4',
    slug: 'upsssc-agta',
    title: 'UPSSSC AGTA / Cane Supervisor',
    shortDesc: 'Uttar Pradesh Agriculture Technical Assistant exam syllabus & mock series.',
    badge: 'STATE AGRI',
    icon: 'Award',
    courseCount: 2,
    testCount: 18,
  },
  {
    id: 'cat-5',
    slug: 'state-agri-exams',
    title: 'State PSC Agriculture Exams',
    shortDesc: 'BPSC BAO, RPSC AAO, MP RAEO, MPSC Agriculture services.',
    badge: 'STATE PSC',
    icon: 'BookOpen',
    courseCount: 3,
    testCount: 22,
  },
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'ibps-afo-2026-complete-batch',
    title: 'IBPS AFO 2026: Complete Mains & Interview Mastery Batch',
    category: 'Banking / Agriculture',
    examSlug: 'ibps-afo',
    tagline: 'All-inclusive Agriculture syllabus with daily mock tests and PYQ deep dive.',
    description: 'Designed specifically for Agriculture graduates aiming for IBPS AFO. Covers Agronomy, Soil Science, Horticulture, Plant Pathology, Entomology, Agricultural Economics, Animal Husbandry, and latest Government Schemes.',
    price: 3999,
    offerPrice: 1999,
    validityDays: 365,
    testsCount: 45,
    materialsCount: 120,
    isFeatured: true,
    features: [
      'Comprehensive topic-wise study modules',
      '45 Full-Length & Sectional Mock Tests',
      'Detailed bilingual explanations with references',
      '5 Practice reattempts with shuffled options',
      'Special Government Schemes & Current Affairs compendium',
    ],
  },
  {
    id: 'course-2',
    slug: 'nabard-ard-special-batch',
    title: 'NABARD Grade A: Complete ARD & ESI Foundation',
    category: 'Regulatory Body',
    examSlug: 'nabard-grade-a',
    tagline: 'Focused preparation for Phase 1 & Phase 2 Agriculture & Rural Development.',
    description: 'Master the ARD dynamic and static syllabus with curated study notes, data reports (Union Budget, Economic Survey, NABARD Annual Report), and exam-oriented practice tests.',
    price: 4999,
    offerPrice: 2499,
    validityDays: 180,
    testsCount: 30,
    materialsCount: 95,
    isFeatured: true,
    features: [
      'Complete ARD Static & Dynamic Coverage',
      'Phase 2 Descriptive writing guidance & test series',
      'Monthly Current Affairs & Scheme Digests',
      'All-India Ranking Leaderboard',
    ],
  },
  {
    id: 'course-3',
    slug: 'upsssc-agta-super-batch',
    title: 'UPSSSC AGTA 2026: Targeted Selection Batch',
    category: 'State Agriculture',
    examSlug: 'upsssc-agta',
    tagline: 'Targeted syllabus coverage for Uttar Pradesh Krishi Takneeki Sahayak.',
    description: 'Aligned strictly with the latest UPSSSC AGTA exam blueprint. Focuses on UP Special Agriculture, Computer Knowledge, General Awareness, and Core Agricultural Sciences.',
    price: 1999,
    offerPrice: 999,
    validityDays: 365,
    testsCount: 25,
    materialsCount: 80,
    isFeatured: true,
    features: [
      '100% UPSSSC syllabus mapping',
      'Bilingual mock test papers with -0.25 negative marking',
      'Detailed Hindi & English explanations',
      'Offline PDF notes access',
    ],
  },
];

export const TEST_SERIES: TestSeries[] = [
  {
    id: 'test-1',
    slug: 'ibps-afo-full-mock-01',
    title: 'IBPS AFO Mains 2026: All-India Grand Mock Test 01',
    exam: 'IBPS AFO Mains',
    questionsCount: 60,
    durationMinutes: 45,
    isFree: true,
    attemptsAllowed: 6, // 1 ranked + 5 practice
    syllabus: ['Agronomy', 'Soil Science', 'Horticulture', 'Animal Husbandry', 'Agri Schemes'],
    markingScheme: { correct: 1, wrong: 0.25 },
  },
  {
    id: 'test-2',
    slug: 'agri-current-affairs-monthly-mock',
    title: 'Agricultural Current Affairs & Govt. Schemes Mock Test',
    exam: 'All Agri Competitive Exams',
    questionsCount: 50,
    durationMinutes: 35,
    isFree: true,
    attemptsAllowed: 6,
    syllabus: ['MSP Updates', 'PM-KISAN', 'PMFBY', 'KCC', 'Latest ICAR Varieties'],
    markingScheme: { correct: 1, wrong: 0.25 },
  },
  {
    id: 'test-3',
    slug: 'nabard-ard-sectional-mock-01',
    title: 'NABARD Grade A: ARD Sectional Speed Mock 01',
    exam: 'NABARD Grade A',
    questionsCount: 40,
    durationMinutes: 30,
    isFree: false,
    attemptsAllowed: 6,
    syllabus: ['Rural Banking', 'Irrigation Systems', 'Post Harvest Management'],
    markingScheme: { correct: 1, wrong: 0.25 },
  },
];
