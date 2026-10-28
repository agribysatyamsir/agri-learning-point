// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

import { ExamsPage } from '../pages/ExamsPage';
import { ExamDetailPage } from '../pages/ExamDetailPage';
import { ExamRunnerPage } from '../pages/ExamRunnerPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const LegacyExamRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (id && (id.startsWith('test-') || id.startsWith('mock-'))) {
    return <Navigate to={`/exam/attempt/${id}`} replace />;
  }
  return <Navigate to={`/exams/${id}`} replace />;
};

const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exams/:slug" element={<ExamDetailPage />} />
        <Route path="/exam/:id" element={<LegacyExamRedirect />} />
        <Route path="/exam/attempt/:testId" element={<ExamRunnerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Phase 1: Route Disambiguation & Navigation Integrity Verification', () => {
  afterEach(() => {
    cleanup();
  });

  it('1. /exams/:slug renders ExamDetailPage without collision', () => {
    renderWithRouter('/exams/ibps-afo');
    expect(screen.getAllByText(/IBPS AFO \(Agriculture Field Officer\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Back to All Exams/i).length).toBeGreaterThan(0);
    // Should NOT render ExamRunner CBT controls
    expect(screen.queryByText(/Finish & Submit Exam/i)).toBeNull();
  });

  it('2. /exam/attempt/:testId renders ExamRunnerPage in full-screen mode', () => {
    renderWithRouter('/exam/attempt/test-1');
    expect(screen.getAllByText(/Submit Paper/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Question Palette/i).length).toBeGreaterThan(0);
    // Should NOT render ExamDetailPage back link
    expect(screen.queryByText(/Back to All Exams/i)).toBeNull();
  });

  it('3. Legacy route /exam/ibps-afo gracefully redirects to /exams/ibps-afo', () => {
    renderWithRouter('/exam/ibps-afo');
    expect(screen.getAllByText(/IBPS AFO \(Agriculture Field Officer\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Back to All Exams/i).length).toBeGreaterThan(0);
  });

  it('4. Legacy route /exam/test-1 gracefully redirects to /exam/attempt/test-1', () => {
    renderWithRouter('/exam/test-1');
    expect(screen.getAllByText(/Submit Paper/i).length).toBeGreaterThan(0);
  });

  it('5. Unmatched path renders NotFoundPage (404) with recovery actions', () => {
    renderWithRouter('/unknown-broken-path');
    expect(screen.getAllByText(/Lost in the Exam Fields\?/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Back to Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Browse Courses/i).length).toBeGreaterThan(0);
  });
});
