import { describe, it, expect } from 'vitest';

export function calculateScore(
  questions: { id: string; correctOptionId: string }[],
  answers: Record<string, string>,
  markingScheme = { correct: 1.0, wrong: 0.25 }
) {
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  questions.forEach((q) => {
    const selected = answers[q.id];
    if (!selected) {
      unattempted++;
    } else if (selected === q.correctOptionId) {
      correct++;
    } else {
      wrong++;
    }
  });

  const positiveMarks = correct * markingScheme.correct;
  const negativeMarks = wrong * markingScheme.wrong;
  const finalScore = Number((positiveMarks - negativeMarks).toFixed(2));

  return { correct, wrong, unattempted, positiveMarks, negativeMarks, finalScore };
}

describe('Examination Scoring Logic with Negative Marking', () => {
  const sampleQuestions = [
    { id: 'q1', correctOptionId: 'opt-a' },
    { id: 'q2', correctOptionId: 'opt-b' },
    { id: 'q3', correctOptionId: 'opt-c' },
    { id: 'q4', correctOptionId: 'opt-d' },
  ];

  it('calculates full score when all questions answered correctly', () => {
    const answers = { q1: 'opt-a', q2: 'opt-b', q3: 'opt-c', q4: 'opt-d' };
    const result = calculateScore(sampleQuestions, answers);
    expect(result.correct).toBe(4);
    expect(result.wrong).toBe(0);
    expect(result.finalScore).toBe(4.0);
  });

  it('correctly deducts 0.25 for wrong answers', () => {
    // 3 correct (3.0 marks) - 1 wrong (0.25 marks) = 2.75 marks
    const answers = { q1: 'opt-a', q2: 'opt-b', q3: 'opt-c', q4: 'opt-wrong' };
    const result = calculateScore(sampleQuestions, answers);
    expect(result.correct).toBe(3);
    expect(result.wrong).toBe(1);
    expect(result.finalScore).toBe(2.75);
  });

  it('does not penalize unattempted questions', () => {
    // 2 correct (2.0 marks), 1 wrong (-0.25 marks), 1 unattempted (0.0) = 1.75 marks
    const answers = { q1: 'opt-a', q2: 'opt-b', q3: 'opt-wrong' };
    const result = calculateScore(sampleQuestions, answers);
    expect(result.correct).toBe(2);
    expect(result.wrong).toBe(1);
    expect(result.unattempted).toBe(1);
    expect(result.finalScore).toBe(1.75);
  });
});
