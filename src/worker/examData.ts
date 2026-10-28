/**
 * Learning Point — Master Question Bank & Authoritative Answer Vault (Server-Side Only)
 * 
 * IMPORTANT: This data is deployed strictly within the Cloudflare Edge Worker.
 * Answer keys and explanations are NEVER exposed to the client prior to final submission.
 */

export interface MasterQuestion {
  id: string;
  testId: string;
  subject: string;
  topic: string;
  statement: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const MASTER_QUESTIONS: MasterQuestion[] = [
  {
    id: 'q-1',
    testId: 'test-1',
    subject: 'Agronomy & Soil Science',
    topic: 'Bio-fertilizers & Nutrient Management',
    statement: 'Which among the following bio-fertilizers is most specifically adapted for atmospheric nitrogen fixation in pulse crops through symbiotic nodulation?',
    options: [
      { id: 'opt-1', text: 'Azotobacter chroococcum' },
      { id: 'opt-2', text: 'Rhizobium leguminosarum' },
      { id: 'opt-3', text: 'Azospirillum brasilense' },
      { id: 'opt-4', text: 'Blue Green Algae (Anabaena)' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Rhizobium forms symbiotic root nodules with leguminous crops to fix atmospheric nitrogen via the nitrogenase enzyme complex. Azotobacter is free-living aerobic, Azospirillum is associative, and Blue Green Algae is predominantly used in wetland paddy ecosystems.',
    difficulty: 'medium',
  },
  {
    id: 'q-2',
    testId: 'test-1',
    subject: 'Agricultural Economics & Schemes',
    topic: 'Government Schemes & Crop Insurance',
    statement: 'Under the Pradhan Mantri Fasal Bima Yojana (PMFBY), what is the uniform maximum premium payable by farmers for all Kharif food and oilseed crops?',
    options: [
      { id: 'opt-1', text: '1.5% of sum insured' },
      { id: 'opt-2', text: '2.0% of sum insured' },
      { id: 'opt-3', text: '5.0% of sum insured' },
      { id: 'opt-4', text: '2.5% of sum insured' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Under PMFBY guidelines, the maximum premium payable by farmers is 2.0% for all Kharif crops, 1.5% for all Rabi foodgrains and oilseeds, and 5.0% for annual commercial/horticultural crops. The remaining actuarial premium is shared equally between the Centre and States.',
    difficulty: 'easy',
  },
  {
    id: 'q-3',
    testId: 'test-1',
    subject: 'Horticulture & Plant Breeding',
    topic: 'Vegetable Production & Pigment Physiology',
    statement: 'What is the optimum temperature range required for lycopene pigment synthesis and deep red color development in tomato fruit?',
    options: [
      { id: 'opt-1', text: '12°C to 15°C' },
      { id: 'opt-2', text: '21°C to 24°C' },
      { id: 'opt-3', text: '32°C to 35°C' },
      { id: 'opt-4', text: '38°C to 42°C' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Lycopene development in tomato is highest within 21°C to 24°C. At temperatures exceeding 27°C, lycopene biosynthesis is substantially inhibited, and above 30°C only yellow carotene is formed.',
    difficulty: 'medium',
  },
  {
    id: 'q-4',
    testId: 'test-1',
    subject: 'Plant Pathology & Entomology',
    topic: 'Plant Vectors & Viral Transmission',
    statement: 'The insect vector primarily responsible for the transmission of Potato Leaf Roll Virus (PLRV) under field conditions is:',
    options: [
      { id: 'opt-1', text: 'Bemisia tabaci (Whitefly)' },
      { id: 'opt-2', text: 'Myzus persicae (Green peach aphid)' },
      { id: 'opt-3', text: 'Nephotettix virescens (Green leafhopper)' },
      { id: 'opt-4', text: 'Thrips palmi' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Potato Leaf Roll Virus (PLRV) is persistently (circulatively) transmitted by the Green peach aphid (Myzus persicae). Whitefly is known for transmitting Gemini viruses (e.g. Tomato Leaf Curl, Yellow Vein Mosaic).',
    difficulty: 'medium',
  },
  {
    id: 'q-5',
    testId: 'test-1',
    subject: 'Animal Husbandry & Dairying',
    topic: 'Indigenous Livestock Breeds',
    statement: 'Which indigenous Indian cattle breed is renowned for having the highest milk yield among desi dairy breeds and originated in the Saurashtra region of Gujarat?',
    options: [
      { id: 'opt-1', text: 'Gir' },
      { id: 'opt-2', text: 'Sahiwal' },
      { id: 'opt-3', text: 'Red Sindhi' },
      { id: 'opt-4', text: 'Tharparkar' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Gir cattle originate in the Gir hills and Kathiawar forest of Gujarat. They are celebrated for heat tolerance, disease resistance, and high milk production (average 2,000–3,100 kg per lactation). Sahiwal originated in the Montgomery district of undivided Punjab.',
    difficulty: 'easy',
  },
  {
    id: 'q-6',
    testId: 'test-1',
    subject: 'Agronomy & Soil Science',
    topic: 'Water Management & Irrigation Stages',
    statement: 'In wheat cultivation under Indian conditions, which growth stage is regarded as the most critical for irrigation, where water stress leads to maximum yield loss?',
    options: [
      { id: 'opt-1', text: 'Crown Root Initiation (CRI) stage' },
      { id: 'opt-2', text: 'Tillering stage' },
      { id: 'opt-3', text: 'Milking stage' },
      { id: 'opt-4', text: 'Dough stage' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Crown Root Initiation (CRI), occurring 21–25 days after sowing (DAS), is the most critical irrigation stage in dwarf wheat. Moisture stress at CRI prevents secondary root development and drastically reduces productive tillers.',
    difficulty: 'easy',
  },
  {
    id: 'q-7',
    testId: 'test-1',
    subject: 'Agronomy & Soil Science',
    topic: 'Soil Mineralogy & Clay Properties',
    statement: 'Black cotton soils (Vertisols) of Central and Western India exhibit pronounced swelling when wet and severe cracking when dry due to the predominance of which clay mineral?',
    options: [
      { id: 'opt-1', text: 'Kaolinite' },
      { id: 'opt-2', text: 'Montmorillonite' },
      { id: 'opt-3', text: 'Illite' },
      { id: 'opt-4', text: 'Chlorite' },
    ],
    correctOptionId: 'opt-2',
    explanation: 'Vertisols contain high percentages of montmorillonite (a 2:1 expanding-type aluminosilicate clay mineral), which has high cation exchange capacity (CEC) and strong shrink-swell dynamics.',
    difficulty: 'medium',
  },
  {
    id: 'q-8',
    testId: 'test-1',
    subject: 'Agricultural Economics & Schemes',
    topic: 'Rural Finance & Institutional Framework',
    statement: 'The National Bank for Agriculture and Rural Development (NABARD) was established in July 1982 on the recommendations of which committee?',
    options: [
      { id: 'opt-1', text: 'B. Sivaraman Committee (CRAFICARD)' },
      { id: 'opt-2', text: 'Narasimham Committee' },
      { id: 'opt-3', text: 'M.S. Swaminathan Committee' },
      { id: 'opt-4', text: 'Kelkar Committee' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'NABARD was established on 12 July 1982 by Act 61 of 1981, based on the recommendations of the Committee to Review Arrangements for Institutional Credit for Agriculture and Rural Development (CRAFICARD) headed by Shri B. Sivaraman.',
    difficulty: 'medium',
  },
  {
    id: 'q-9',
    testId: 'test-1',
    subject: 'Horticulture & Plant Breeding',
    topic: 'Agricultural Biotechnology & Biofortification',
    statement: 'Golden Rice is a genetically engineered variety developed to biosynthesize which micronutrient precursor in the edible endosperm of rice grains?',
    options: [
      { id: 'opt-1', text: 'Beta-carotene (Provitamin A)' },
      { id: 'opt-2', text: 'Ascorbic acid (Vitamin C)' },
      { id: 'opt-3', text: 'Cobalamin (Vitamin B12)' },
      { id: 'opt-4', text: 'Alpha-tocopherol (Vitamin E)' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Golden Rice was biofortified with phytoene synthase (psy) and phytoene desaturase (crtI) genes to produce beta-carotene (provitamin A) in endosperm to combat Vitamin A deficiency (VAD).',
    difficulty: 'easy',
  },
  {
    id: 'q-10',
    testId: 'test-1',
    subject: 'Agricultural Economics & Schemes',
    topic: 'Price Policy & Agricultural Markets',
    statement: 'Minimum Support Prices (MSP) in India for mandated agricultural commodities are officially announced by the Government based on the recommendations of:',
    options: [
      { id: 'opt-1', text: 'Commission for Agricultural Costs and Prices (CACP)' },
      { id: 'opt-2', text: 'NITI Aayog' },
      { id: 'opt-3', text: 'National Agricultural Cooperative Marketing Federation (NAFED)' },
      { id: 'opt-4', text: 'Food Corporation of India (FCI)' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'The Commission for Agricultural Costs and Prices (CACP), an attached office of the Ministry of Agriculture and Farmers Welfare, submits annual price policy reports recommending MSP for 22 mandated crops and FRP for sugarcane.',
    difficulty: 'easy',
  },
];

export function addMasterQuestions(newQuestions: MasterQuestion[]): number {
  let added = 0;
  for (const q of newQuestions) {
    if (!MASTER_QUESTIONS.some((existing) => existing.id === q.id || existing.statement === q.statement)) {
      MASTER_QUESTIONS.push(q);
      added++;
    }
  }
  return added;
}
