import { describe, it, expect } from 'vitest';
import { parseCSVToRows, validateSheetRows } from '../lib/sheets/importer';

describe('Google Sheets Question Bank Importer', () => {
  const sampleCSV = `Question,Option A,Option B,Option C,Option D,Answer,Explanation,Subject,Topic
"What is the optimum soil pH for wheat cultivation?","4.5 - 5.0","6.0 - 7.5","8.5 - 9.0","3.5 - 4.0","B","Wheat grows best in neutral to slightly alkaline well-drained loamy soils.","Agronomy","Cereal Crops"
"Which crop is known as the King of Cereals?","Rice","Wheat","Maize","Barley","B","Wheat is termed the King of Cereals whereas Maize is Queen.","Agronomy","Cereal Crops"
"Incomplete question without options","","","","","","","Agronomy","Test"
"What is the optimum soil pH for wheat cultivation?","4.5 - 5.0","6.0 - 7.5","8.5 - 9.0","3.5 - 4.0","B","Duplicate test","Agronomy","Cereal Crops"`;

  it('parses CSV rows with comma and quote preservation', () => {
    const rows = parseCSVToRows(sampleCSV);
    expect(rows.length).toBe(4);
    expect(rows[0].statement).toBe('What is the optimum soil pH for wheat cultivation?');
    expect(rows[0].optionB).toBe('6.0 - 7.5');
    expect(rows[0].correctAnswer).toBe('B');
  });

  it('detects missing options and duplicate questions', () => {
    const rows = parseCSVToRows(sampleCSV);
    const report = validateSheetRows(rows);

    expect(report.totalRows).toBe(4);
    expect(report.validQuestions).toBe(2);
    expect(report.duplicateCount).toBe(1); // 4th row is duplicate of 1st row
    expect(report.rejectedRows.length).toBe(1); // 3rd row rejected due to missing options
  });
});
