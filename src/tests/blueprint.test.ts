import { describe, it, expect } from 'vitest';

export function calculateQuestionDistribution(
  examType: 'agriculture' | 'non_agriculture',
  totalQuestions: number,
  customAgriRatio = { master: 40, ai: 60 }
) {
  if (examType === 'non_agriculture') {
    return {
      masterBankCount: 0,
      aiGeneratedCount: totalQuestions,
      sourceType: '100% Syllabus/PYQ-Grounded AI Generation',
    };
  }

  const masterBankCount = Math.round((totalQuestions * customAgriRatio.master) / 100);
  const aiGeneratedCount = totalQuestions - masterBankCount;

  return {
    masterBankCount,
    aiGeneratedCount,
    sourceType: `${customAgriRatio.master}% Master Bank / ${customAgriRatio.ai}% AI Generated`,
  };
}

describe('AI Question Factory Blueprint Distribution Rules', () => {
  it('enforces 40% Master Bank and 60% AI for standard 60-question Agriculture exam (IBPS AFO)', () => {
    const dist = calculateQuestionDistribution('agriculture', 60);
    expect(dist.masterBankCount).toBe(24);
    expect(dist.aiGeneratedCount).toBe(36);
    expect(dist.masterBankCount + dist.aiGeneratedCount).toBe(60);
  });

  it('enforces 40% Master Bank and 60% AI for 100-question Agriculture exam', () => {
    const dist = calculateQuestionDistribution('agriculture', 100);
    expect(dist.masterBankCount).toBe(40);
    expect(dist.aiGeneratedCount).toBe(60);
  });

  it('enforces 100% AI generation for Non-Agriculture examinations', () => {
    const dist = calculateQuestionDistribution('non_agriculture', 50);
    expect(dist.masterBankCount).toBe(0);
    expect(dist.aiGeneratedCount).toBe(50);
  });
});
