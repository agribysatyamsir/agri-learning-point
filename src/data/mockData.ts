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
  medium: string; // 'Bilingual (Hindi + English)' | 'English Medium'
  mode: string; // 'Live + Recorded Classes' | 'Recorded Mastery'
  price: number;
  offerPrice: number;
  validityDays: number;
  testsCount: number;
  materialsCount: number;
  rating: number;
  studentsCount: number;
  features: string[];
  isFeatured?: boolean;
}

export interface Topper {
  id: string;
  name: string;
  exam: string;
  rankOrPost: string;
  year: string;
  testimonial: string;
  avatar: string;
  badge: string;
}

export interface PreviousYearPaper {
  id: string;
  title: string;
  exam: string;
  year: number;
  questionsCount: number;
  durationMinutes: number;
  pdfUrl?: string;
  testId?: string;
  downloadCount: number;
}

export interface CurrentAffairItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  points: string[];
  source: string;
  pdfUrl?: string;
}

export interface JobAlert {
  id: string;
  title: string;
  department: string;
  totalPosts: number;
  qualification: string;
  lastDate: string;
  status: 'Active' | 'Upcoming' | 'Closed';
  notificationUrl?: string;
  applyUrl?: string;
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
  markingScheme: { correct: number; wrong: number };
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
    title: 'IBPS AFO 2026-27: Complete Pre + Mains + Interview Foundation Batch',
    category: 'Banking / Agriculture',
    examSlug: 'ibps-afo',
    tagline: 'Comprehensive Bilingual Batch covering Full Agriculture Syllabus, Daily Live Classes & Test Series.',
    description: 'Designed specifically for Agriculture graduates aiming for IBPS AFO. Covers Agronomy, Soil Science, Horticulture, Plant Pathology, Entomology, Agricultural Economics, Animal Husbandry, General Agriculture, and latest Government Schemes with Satyam Sir.',
    medium: 'Bilingual (Hindi + English)',
    mode: 'Daily Live Classes + Recorded Access',
    price: 4999,
    offerPrice: 2499,
    validityDays: 365,
    testsCount: 65,
    materialsCount: 150,
    rating: 4.9,
    studentsCount: 2420,
    isFeatured: true,
    features: [
      'Daily 2 Hours Live Interactive Classes with Doubt Clearance',
      'Class Notes High-Yield PDF + Printable Summaries',
      '50 Full-Length CBT Mock Tests (-0.25 Negative Marking)',
      'Special Focus on ICAR Data, MSP 2025-26 & Govt. Schemes',
      'Free Mock Interview Guidance Program for cleared students',
    ],
  },
  {
    id: 'course-2',
    slug: 'upsssc-agta-super-batch',
    title: 'UPSSSC AGTA / Cane Supervisor 2026: Targeted Selection Batch',
    category: 'State Agriculture',
    examSlug: 'upsssc-agta',
    tagline: '100% UP Agriculture Technical Assistant syllabus coverage in Hindi & English.',
    description: 'Aligned strictly with the latest UPSSSC AGTA exam blueprint. Focuses on UP Special Agriculture, Soil Management, Agronomy, Computer Knowledge, General Awareness, and Core Agricultural Sciences.',
    medium: 'Bilingual (Hindi + English)',
    mode: 'Live Classes + Recorded Backups',
    price: 2499,
    offerPrice: 1199,
    validityDays: 365,
    testsCount: 35,
    materialsCount: 95,
    rating: 4.8,
    studentsCount: 1850,
    isFeatured: true,
    features: [
      '100% UPSSSC New Syllabus Mapping (Agriculture Special 65 Marks)',
      '35 Bilingual CBT Mock Tests with Instant Analysis',
      'Subject-wise Practice Quizzes & Offline Downloadable PDFs',
      'Previous 10 Years Solved Questions included',
    ],
  },
  {
    id: 'course-3',
    slug: 'state-ado-bao-master-batch',
    title: 'State ADO / AAO / BAO 2026: Comprehensive State PSC Agriculture Batch',
    category: 'State PSC Agriculture',
    examSlug: 'state-agri-exams',
    tagline: 'Dedicated preparation for Haryana ADO, Bihar BAO, MP RAEO, Rajasthan AAO.',
    description: 'Complete syllabus coverage for State Agriculture Department Officers. Intensive conceptual clarity on Crop Production, Seed Technology, Plant Protection, Agricultural Extension, and Soil Fertility.',
    medium: 'Bilingual (Hindi + English)',
    mode: 'Recorded Mastery + Weekly Live Q&A',
    price: 3499,
    offerPrice: 1799,
    validityDays: 365,
    testsCount: 40,
    materialsCount: 110,
    rating: 4.9,
    studentsCount: 1240,
    isFeatured: true,
    features: [
      'Comprehensive State Agriculture Syllabus Coverage',
      '40 Sectional & State-specific Full Mock Tests',
      'Special State Agro-Climatic Zones & Schemes modules',
      'Personal Guidance by Satyam Sir & Expert Panel',
    ],
  },
  {
    id: 'course-4',
    slug: 'nabard-ard-special-batch',
    title: 'NABARD Grade A: Complete ARD & ESI Foundation Batch',
    category: 'Regulatory Body',
    examSlug: 'nabard-grade-a',
    tagline: 'Targeted preparation for Phase 1 & Phase 2 Agriculture & Rural Development.',
    description: 'Master the ARD dynamic and static syllabus with curated study notes, data reports (Union Budget, Economic Survey, Handbooks, NABARD Annual Report), and exam-oriented practice tests.',
    medium: 'English Medium & Bilingual Support',
    mode: 'Live + Recorded Sessions',
    price: 5499,
    offerPrice: 2799,
    validityDays: 180,
    testsCount: 30,
    materialsCount: 95,
    rating: 4.8,
    studentsCount: 890,
    isFeatured: false,
    features: [
      'Complete ARD Static & Dynamic Syllabus Coverage',
      'Phase 2 Descriptive Answer Writing Evaluation',
      'Monthly Rural Economy & Agricultural Current Affairs',
      'All-India Ranking Leaderboard & Performance Metrics',
    ],
  },
  {
    id: 'course-5',
    slug: 'icar-jrf-agronomy-horticulture',
    title: 'ICAR JRF / CUET PG 2026: Agronomy & Horticulture Master Batch',
    category: 'Entrance / Research',
    examSlug: 'icar-jrf-srf',
    tagline: 'Premier preparation for ICAR-JRF, CUET PG Agriculture, and M.Sc. Entrances.',
    description: 'In-depth academic modules for ICAR JRF aspirants. Rigorous focus on Principles of Agronomy, Weed Management, Water Management, Pomology, Olericulture, and Genetics with top reference books breakdown.',
    medium: 'English Medium',
    mode: 'Recorded Video Course + Topic Tests',
    price: 4499,
    offerPrice: 2199,
    validityDays: 365,
    testsCount: 45,
    materialsCount: 130,
    rating: 4.9,
    studentsCount: 760,
    isFeatured: false,
    features: [
      'Covers Ready, Yellamanda Reddy, Chhidda Singh, & Balraj Singh syllabus',
      'Topic-wise High-Difficulty Question Bank',
      'Past 15 Years ICAR Solved Questions with Explanations',
      'M.Sc. Admission & Counselling Mentorship',
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
    slug: 'upsssc-agta-sectional-mock-01',
    title: 'UPSSSC AGTA 2026: Krishi Vigyan Sectional Mock 01',
    exam: 'UPSSSC AGTA',
    questionsCount: 50,
    durationMinutes: 45,
    isFree: true,
    attemptsAllowed: 6,
    syllabus: ['Fasal Utpadan', 'Mrida Vigyan', 'Keet & Rog Prabandhan', 'UP Agri Schemes'],
    markingScheme: { correct: 1, wrong: 0.25 },
  },
  {
    id: 'test-4',
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

export const TOPPERS: Topper[] = [
  {
    id: 'top-1',
    name: 'Pooja Sharma',
    exam: 'IBPS AFO 2024-25',
    rankOrPost: 'All India Rank 12 (Selected in Punjab National Bank)',
    year: '2025',
    testimonial: 'Satyam Sir ke guidance aur mock tests ne mere Mains score ko 38 se 52 tak pahuncha diya. Exact exam pattern questions aur detailed explanations bohot helpful the.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    badge: 'AIR 12',
  },
  {
    id: 'top-2',
    name: 'Rahul Verma',
    exam: 'UPSSSC AGTA / Cane Supervisor',
    rankOrPost: 'Rank 04 (State Topper)',
    year: '2024',
    testimonial: 'Bilingual Hindi-English notes aur regular live classes ne poora syllabus easy bana diya. Agri Learning Point ka test series platform bilkul real CBT jaisa experience deta hai.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    badge: 'Rank 4',
  },
  {
    id: 'top-3',
    name: 'Amit Patel',
    exam: 'Haryana ADO',
    rankOrPost: 'Agricultural Development Officer (Selected)',
    year: '2024',
    testimonial: 'State PSC agriculture level ke deep conceptual questions ke liye Satyam Sir ka content best hai. Daily quiz aur test analysis ne mere negative marks khatam kar diye.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    badge: 'Selected ADO',
  },
  {
    id: 'top-4',
    name: 'Sneha Kulkarni',
    exam: 'ICAR JRF (Agronomy)',
    rankOrPost: 'AIR 28 (IARI New Delhi Allocated)',
    year: '2025',
    testimonial: 'Agronomy aur Soil Science ke standard numericals aur conceptual clarity ke liye Agri Learning Point ka koi tod nahi. Best test series for agricultural entrances.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    badge: 'AIR 28',
  },
];

export const PREVIOUS_YEAR_PAPERS: PreviousYearPaper[] = [
  {
    id: 'pyp-1',
    title: 'IBPS AFO Mains 2024 Official Question Paper with Solutions',
    exam: 'IBPS AFO',
    year: 2024,
    questionsCount: 60,
    durationMinutes: 45,
    testId: 'test-1',
    downloadCount: 14200,
  },
  {
    id: 'pyp-2',
    title: 'IBPS AFO Mains 2023 Solved Agriculture Paper (Memory Based)',
    exam: 'IBPS AFO',
    year: 2023,
    questionsCount: 60,
    durationMinutes: 45,
    testId: 'test-1',
    downloadCount: 18900,
  },
  {
    id: 'pyp-3',
    title: 'UPSSSC AGTA 2018 Krishi Takneeki Sahayak Official Solved Paper',
    exam: 'UPSSSC AGTA',
    year: 2018,
    questionsCount: 100,
    durationMinutes: 90,
    testId: 'test-3',
    downloadCount: 22400,
  },
  {
    id: 'pyp-4',
    title: 'Haryana ADO (Agricultural Development Officer) Official Exam Paper',
    exam: 'Haryana ADO',
    year: 2022,
    questionsCount: 100,
    durationMinutes: 120,
    testId: 'test-1',
    downloadCount: 9800,
  },
  {
    id: 'pyp-5',
    title: 'ICAR JRF 2024 Physical Science & Agronomy Solved Paper',
    exam: 'ICAR JRF',
    year: 2024,
    questionsCount: 120,
    durationMinutes: 120,
    testId: 'test-1',
    downloadCount: 8400,
  },
  {
    id: 'pyp-6',
    title: 'NABARD Grade A (Phase 1) ARD 2024 Solved Questions',
    exam: 'NABARD Grade A',
    year: 2024,
    questionsCount: 40,
    durationMinutes: 30,
    testId: 'test-4',
    downloadCount: 11200,
  },
];

export const CURRENT_AFFAIRS_ITEMS: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    title: 'Cabinet approves Minimum Support Prices (MSP) for Rabi Crops 2025-26',
    date: 'October 2026',
    category: 'Government Schemes & MSP',
    summary: 'The Cabinet Committee on Economic Affairs (CCEA) chaired by the Prime Minister has approved the increase in the Minimum Support Prices (MSP) for all mandated Rabi crops for Marketing Season 2025-26.',
    points: [
      'Wheat MSP increased by ₹150 per quintal, fixed at ₹2,425 per quintal.',
      'Highest absolute increase announced for Mustard and Rapeseed at ₹300 per quintal.',
      'Aligned with the principle of fixing MSP at a level of at least 1.5 times of all-India weighted average cost of production (Cost A2+FL).',
      'Crucial for IBPS AFO, State ADO, and NABARD Grade A examinations.',
    ],
    source: 'Ministry of Agriculture & Farmers Welfare / PIB',
  },
  {
    id: 'ca-2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) 2026: Key Operational Highlights',
    date: 'October 2026',
    category: 'Crop Insurance',
    summary: 'Updated guidelines for crop loss assessment via YES-TECH (Yield Estimation System using Technology) and WIN-WIN (Weather Information Network Data Systems).',
    points: [
      'Farmer premium capped uniformly at 2% for Kharif, 1.5% for Rabi food/oilseeds, and 5% for commercial/horticultural crops.',
      'Integration of Remote Sensing Technology, Drones, and Satellite data for automated yield loss claims.',
      'Aadhaar-seeded direct DBT compensation settlement within 14 days of harvest assessment.',
    ],
    source: 'PMFBY Operational Portal',
  },
  {
    id: 'ca-3',
    title: 'Release of 109 Climate-Resilient and High-Yielding Crop Varieties by ICAR',
    date: 'September 2026',
    category: 'Agricultural Science & Research',
    summary: 'ICAR institutions developed and officially released 109 new field and horticultural crop varieties engineered for drought tolerance, biofortification, and pest resistance.',
    points: [
      'Includes 34 field crop varieties (cereals, pulses, oilseeds, forage) and 75 horticultural varieties (fruits, vegetables, spices).',
      'Zinc and Iron biofortified pearl millet and rice strains targeting nutritional security in semi-arid tracts.',
      'Submergence-tolerant and drought-tolerant paddy varieties specifically designed for eastern rainfed plains.',
    ],
    source: 'Indian Council of Agricultural Research (ICAR)',
  },
  {
    id: 'ca-4',
    title: 'Kisan Credit Card (KCC) Fisheries & Animal Husbandry Integration Updates',
    date: 'September 2026',
    category: 'Agricultural Credit & Banking',
    summary: 'Enhanced subvention limit and collateral-free credit guidelines for allied sectors under the KCC saturation drive.',
    points: [
      'Collateral-free agricultural loan limit maintained at ₹1.60 lakh, with KCC animal husbandry working capital eligible up to ₹2.0 lakh within overall cap.',
      'Effective interest rate of 4% per annum for prompt-repaying farmers (7% base minus 3% prompt repayment incentive).',
      'Targeted saturation across milk cooperative societies and fish farmers under PMMSY.',
    ],
    source: 'Reserve Bank of India (RBI) / NABARD Notifications',
  },
];

export const JOB_ALERTS: JobAlert[] = [
  {
    id: 'job-1',
    title: 'IBPS Specialist Officer (AFO Scale-I) Recruitment 2026-27',
    department: 'Institute of Banking Personnel Selection (Participating Commercial Banks)',
    totalPosts: 850,
    qualification: '4-year B.Sc. (Hons) in Agriculture / Horticulture / Allied Sciences',
    lastDate: '21 November 2026',
    status: 'Active',
    notificationUrl: 'https://www.ibps.in',
  },
  {
    id: 'job-2',
    title: 'UPSSSC Krishi Takneeki Sahayak (AGTA) Group-C Recruitment',
    department: 'Uttar Pradesh Subordinate Services Selection Commission',
    totalPosts: 3446,
    qualification: 'B.Sc. Agriculture / B.Sc. Horticulture / B.Tech Agri Engineering + UP PET Qualified',
    lastDate: '15 December 2026',
    status: 'Active',
    notificationUrl: 'https://upsssc.gov.in',
  },
  {
    id: 'job-3',
    title: 'Haryana HPSC Agricultural Development Officer (Administrative Cadre)',
    department: 'Haryana Public Service Commission (Department of Agriculture & Farmers Welfare)',
    totalPosts: 600,
    qualification: 'B.Sc. (Hons) Agriculture from a recognized University + Hindi/Sanskrit up to Matric',
    lastDate: '30 November 2026',
    status: 'Active',
    notificationUrl: 'https://hpsc.gov.in',
  },
  {
    id: 'job-4',
    title: 'NABARD Assistant Manager (Grade A) in Rural Development Banking Service',
    department: 'National Bank for Agriculture and Rural Development',
    totalPosts: 150,
    qualification: 'Bachelor degree in Agriculture / Forestry / Agribusiness with min 60% marks',
    lastDate: '10 December 2026',
    status: 'Upcoming',
    notificationUrl: 'https://www.nabard.org',
  },
];

export const FACULTIES = [
  {
    id: 'fac-1',
    name: 'Satyam Sir',
    role: 'Founder & Chief Agriculture Mentor',
    specialization: 'Agronomy, Soil Science & Exam Strategy',
    experience: '8+ Years Teaching & 1,500+ Selections',
    education: 'M.Sc. Agriculture (Agronomy), ICAR NET Qualified',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'fac-2',
    name: 'Dr. S. K. Sharma',
    role: 'Senior Faculty',
    specialization: 'Plant Pathology, Entomology & Protection',
    experience: '10+ Years University Teaching',
    education: 'Ph.D. Plant Protection (GBPUAT Pantnagar)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'fac-3',
    name: 'Pooja Verma',
    role: 'Faculty & Content Lead',
    specialization: 'Horticulture, Floriculture & Post-Harvest',
    experience: '6+ Years Competitive Mentorship',
    education: 'M.Sc. Horticulture, Gold Medalist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
];
