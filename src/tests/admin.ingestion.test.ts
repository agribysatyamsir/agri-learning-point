import { describe, it, expect } from 'vitest';
import { parseCSVToRows, validateSheetRows, RawSheetRow } from '../lib/sheets/importer';
import { addMasterQuestions, MASTER_QUESTIONS } from '../worker/examData';

describe('Admin Portal & Master Question Bank Ingestion', () => {
  describe('Google Sheets / CSV Ingestion Parser', () => {
    it('parses standard CSV with agricultural exam questions', () => {
      const csv = `Question,Option A,Option B,Option C,Option D,Correct Answer,Explanation,Subject,Topic
"What is the family of Chickpea (Cicer arietinum)?","Fabaceae","Poaceae","Solanaceae","Brassicaceae","A","Chickpea belongs to the family Fabaceae (Leguminosae).","Agronomy","Pulses"
"Which hormone is primarily responsible for apical dominance in plants?","Auxin","Gibberellin","Cytokinin","Abscisic Acid","A","Auxin synthesized in the shoot apex promotes apical dominance.","Plant Physiology","Growth Regulators"`;

      const rows = parseCSVToRows(csv);
      expect(rows).toHaveLength(2);
      expect(rows[0].statement).toContain('family of Chickpea');
      expect(rows[0].optionA).toBe('Fabaceae');
      expect(rows[0].correctAnswer).toBe('A');
      expect(rows[0].subject).toBe('Agronomy');
      expect(rows[0].topic).toBe('Pulses');
    });

    it('handles commas within quoted question statements correctly', () => {
      const csv = `Statement,Option A,Option B,Option C,Option D,Answer,Explanation
"In zero tillage, which is common in rice-wheat systems, seed is sown directly into untilled soil with:","Happy Seeder","Rotavator","Disc Plough","Mouldboard Plough","A","Happy Seeder sows wheat seeds directly into standing rice stubble."`;

      const rows = parseCSVToRows(csv);
      expect(rows).toHaveLength(1);
      expect(rows[0].statement).toContain('In zero tillage, which is common');
      expect(rows[0].optionA).toBe('Happy Seeder');
    });
  });

  describe('Validation, Deduplication & Staging Rules', () => {
    it('accurately detects valid questions and skips exact duplicates', () => {
      const rawRows: RawSheetRow[] = [
        {
          statement: 'What is the seed rate of hybrid rice per hectare under Indian conditions?',
          optionA: '12-15 kg/ha',
          optionB: '25-30 kg/ha',
          optionC: '40-45 kg/ha',
          optionD: '60-75 kg/ha',
          correctAnswer: 'A',
          explanation: 'Standard hybrid rice seed rate is 12-15 kg per hectare.',
          subject: 'Agronomy',
          topic: 'Cereal Crops',
          sourceRow: 2,
        },
        // Duplicate statement
        {
          statement: 'What is the seed rate of hybrid rice per hectare under Indian conditions?',
          optionA: '12-15 kg/ha',
          optionB: '25-30 kg/ha',
          optionC: '40-45 kg/ha',
          optionD: '60-75 kg/ha',
          correctAnswer: 'A',
          explanation: 'Standard hybrid rice seed rate is 12-15 kg per hectare.',
          subject: 'Agronomy',
          topic: 'Cereal Crops',
          sourceRow: 3,
        },
      ];

      const report = validateSheetRows(rawRows);
      expect(report.totalRows).toBe(2);
      expect(report.validQuestions).toBe(1);
      expect(report.duplicateCount).toBe(1);
      expect(report.rejectedRows).toHaveLength(0);
    });

    it('rejects rows with missing options or invalid answer keys', () => {
      const invalidRows: RawSheetRow[] = [
        {
          statement: 'Which fungus causes Karnal Bunt in wheat?',
          optionA: 'Tilletia indica',
          optionB: 'Puccinia striiformis',
          optionC: '', // Missing option C
          optionD: 'Ustilago nuda',
          correctAnswer: 'A',
          sourceRow: 4,
        },
        {
          statement: 'Which element is an essential constituent of chlorophyll?',
          optionA: 'Magnesium',
          optionB: 'Iron',
          optionC: 'Manganese',
          optionD: 'Zinc',
          correctAnswer: 'Z', // Invalid answer letter
          sourceRow: 5,
        },
      ];

      const report = validateSheetRows(invalidRows);
      expect(report.validQuestions).toBe(0);
      expect(report.rejectedRows).toHaveLength(2);
      expect(report.rejectedRows[0].reason).toContain('at least 4 options');
      expect(report.rejectedRows[1].reason).toContain('Invalid correct answer format');
    });
  });

  describe('Master Question Bank Edge Store Ingestion', () => {
    it('idempotently merges imported questions into edge question bank', () => {
      const initialCount = MASTER_QUESTIONS.length;

      const newQ = {
        id: 'q_test_ingest_01',
        testId: 'test-1',
        subject: 'Soil Science',
        topic: 'Soil Chemistry',
        statement: 'What is the electrical conductivity (EC) threshold defining a saline soil (at 25°C)?',
        options: [
          { id: 'opt-1', text: '> 4 dS/m' },
          { id: 'opt-2', text: '< 2 dS/m' },
          { id: 'opt-3', text: '> 15 dS/m' },
          { id: 'opt-4', text: '< 0.5 dS/m' },
        ],
        correctOptionId: 'opt-1',
        explanation: 'Saline soils have EC > 4 dS/m, ESP < 15, and pH < 8.5.',
        difficulty: 'medium' as const,
      };

      const addedFirst = addMasterQuestions([newQ]);
      expect(addedFirst).toBe(1);
      expect(MASTER_QUESTIONS.length).toBe(initialCount + 1);

      // Re-adding the identical question must be idempotently ignored
      const addedSecond = addMasterQuestions([newQ]);
      expect(addedSecond).toBe(0);
      expect(MASTER_QUESTIONS.length).toBe(initialCount + 1);
    });
  });
});
