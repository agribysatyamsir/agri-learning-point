/**
 * Learning Point — Master Question Bank Google Sheets Importer
 * Fetches, parses, normalizes, deduplicates, and stages questions from Google Sheets.
 */

import { turso } from '../turso';

export interface RawSheetRow {
  statement: string;
  statementHi?: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  correctAnswer: string; // 'A', 'B', 'C', 'D', '1', '2'
  explanation?: string;
  explanationHi?: string;
  subject?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  sourceRow?: number;
}

export interface ImportValidationReport {
  totalRows: number;
  validQuestions: number;
  rejectedRows: { row: number; reason: string }[];
  duplicateCount: number;
  stagedQuestions: any[];
}

export async function fetchSheetCSV(sheetId: string): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch Google Sheet CSV: HTTP ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

export function parseCSVToRows(csvText: string): RawSheetRow[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const header = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim().replace(/[^a-z0-9]/g, ''));

  // Find column indices
  const qIdx = header.findIndex((h) => h.includes('question') || h.includes('statement') || h.includes('prashna'));
  const optAIdx = header.findIndex((h) => h.includes('optiona') || h.includes('opta') || h.includes('vikalpa'));
  const optBIdx = header.findIndex((h) => h.includes('optionb') || h.includes('optb') || h.includes('vikalpb'));
  const optCIdx = header.findIndex((h) => h.includes('optionc') || h.includes('optc') || h.includes('vikalpc'));
  const optDIdx = header.findIndex((h) => h.includes('optiond') || h.includes('optd') || h.includes('vikalpd'));
  const ansIdx = header.findIndex((h) => h.includes('correct') || h.includes('answer') || h.includes('uttar') || h.includes('key'));
  const explIdx = header.findIndex((h) => h.includes('explanation') || h.includes('solution') || h.includes('vyakhya'));
  const subIdx = header.findIndex((h) => h.includes('subject') || h.includes('vishay'));
  const topIdx = header.findIndex((h) => h.includes('topic') || h.includes('subtopic'));

  const rows: RawSheetRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (!cols || cols.length === 0) continue;

    rows.push({
      statement: cols[qIdx >= 0 ? qIdx : 0] || '',
      optionA: cols[optAIdx >= 0 ? optAIdx : 1] || '',
      optionB: cols[optBIdx >= 0 ? optBIdx : 2] || '',
      optionC: cols[optCIdx >= 0 ? optCIdx : 3] || '',
      optionD: cols[optDIdx >= 0 ? optDIdx : 4] || '',
      correctAnswer: cols[ansIdx >= 0 ? ansIdx : 5] || '',
      explanation: cols[explIdx >= 0 ? explIdx : 6] || '',
      subject: cols[subIdx >= 0 ? subIdx : 7] || 'Agriculture General',
      topic: cols[topIdx >= 0 ? topIdx : 8] || 'Core Subject',
      sourceRow: i + 1,
    });
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

export function validateSheetRows(rows: RawSheetRow[]): ImportValidationReport {
  const report: ImportValidationReport = {
    totalRows: rows.length,
    validQuestions: 0,
    rejectedRows: [],
    duplicateCount: 0,
    stagedQuestions: [],
  };

  const seenStatements = new Set<string>();

  rows.forEach((r) => {
    const stmt = r.statement?.trim();
    if (!stmt || stmt.length < 5) {
      report.rejectedRows.push({ row: r.sourceRow || 0, reason: 'Question statement missing or too short' });
      return;
    }

    if (!r.optionA || !r.optionB || !r.optionC || !r.optionD) {
      report.rejectedRows.push({ row: r.sourceRow || 0, reason: 'Must have at least 4 options (A, B, C, D)' });
      return;
    }

    const normAns = (r.correctAnswer || '').trim().toUpperCase();
    if (!['A', 'B', 'C', 'D', '1', '2', '3', '4'].includes(normAns)) {
      report.rejectedRows.push({ row: r.sourceRow || 0, reason: `Invalid correct answer format: "${r.correctAnswer}" (Expected A, B, C, D)` });
      return;
    }

    const cleanStmt = stmt.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenStatements.has(cleanStmt)) {
      report.duplicateCount++;
      return;
    }
    seenStatements.add(cleanStmt);

    report.validQuestions++;
    report.stagedQuestions.push(r);
  });

  return report;
}
