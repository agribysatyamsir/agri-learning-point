// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { ExamsPage } from '../pages/ExamsPage';
import { CoursesPage } from '../pages/CoursesPage';
import { TestSeriesPage } from '../pages/TestSeriesPage';
import { FreeTestsPage } from '../pages/FreeTestsPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { StudentDashboardPage } from '../pages/StudentDashboardPage';
import { ExamRunnerPage } from '../pages/ExamRunnerPage';
import { ExamResultsPage } from '../pages/ExamResultsPage';
import { AdminPage } from '../pages/AdminPage';
import { LegalPage } from '../pages/LegalPage';
import { AuthProvider } from '../context/AuthContext';

describe('Comprehensive Section Verification across Learning Point Platform', () => {
  afterEach(() => {
    cleanup();
  });

  it('1. HomePage renders Hero, Exam Categories, Featured Courses, Test Series, and FAQs', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Master Your Exam With/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Explore Courses/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Try Free Mock Test/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Choose Your Target Exam/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Featured Courses & Batches/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Structured Test Series/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/How Learning Point Works/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Frequently Asked Questions/i).length).toBeGreaterThan(0);
  });

  it('2. ExamsPage renders all streams and blueprints', () => {
    render(
      <MemoryRouter>
        <ExamsPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Exam Categories & Syllabi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NABARD Grade A & B/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ICAR JRF \/ SRF/i).length).toBeGreaterThan(0);
  });

  it('3. CoursesPage renders course listings and search controls', () => {
    render(
      <MemoryRouter>
        <CoursesPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Courses & Batches/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Search courses or exams.../i)).toBeDefined();
    expect(screen.getAllByText(/IBPS AFO 2026: Complete Mains & Interview Mastery Batch/i).length).toBeGreaterThan(0);
  });

  it('4. TestSeriesPage renders mock exams with durations and marking schemes', () => {
    render(
      <MemoryRouter>
        <TestSeriesPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Online Test Series/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/IBPS AFO Mains 2026: All-India Grand Mock Test 01/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1 Ranked \+ 5 Practice/i).length).toBeGreaterThan(0);
  });

  it('5. FreeTestsPage renders free practice papers accessible to all students', () => {
    render(
      <MemoryRouter>
        <FreeTestsPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Free Mock Tests/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Agricultural Current Affairs & Govt. Schemes Mock Test/i).length).toBeGreaterThan(0);
  });

  it('6. LoginPage renders 10-digit mobile number, password, and single-device notice', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Student Login/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/10-Digit Mobile Number/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Single active device policy enforced/i).length).toBeGreaterThan(0);
  });

  it('7. RegisterPage renders registration form with target exam selector', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Create Your Account/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Full Name/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Primary Target Exam/i).length).toBeGreaterThan(0);
  });

  it('8. StudentDashboardPage renders active enrolled courses, validity, and receipts', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <StudentDashboardPage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Welcome back/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Active Enrolled Courses/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Receipts & Invoices/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Active Session Verified/i).length).toBeGreaterThan(0);
  });

  it('9. ExamRunnerPage renders timer, question statement, options, and submit control', () => {
    render(
      <MemoryRouter>
        <ExamRunnerPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/IBPS AFO Mains 2026: Grand Mock Test 01/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Question 1 of 5/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mark for Review/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Submit Paper/i).length).toBeGreaterThan(0);
  });

  it('10. ExamResultsPage renders authoritative score, -0.25 negative marks, explanations, and report modal', () => {
    render(
      <MemoryRouter>
        <ExamResultsPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Authoritative Examination Score/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rank Snapshot/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Correct Answers/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Incorrect Answers/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Start Practice Reattempt #1/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Approved Conceptual Explanation:/i).length).toBeGreaterThan(0);
  });

  it('11. AdminPage renders operations center, question importer, AI Factory, and Copilot', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Learning Point Admin & AI Control/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TOTP MFA Active/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Total Registered Students/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AES-256 Encrypted on Google Drive/i).length).toBeGreaterThan(0);
  });

  it('12. LegalPage renders Terms, Privacy, and Policies', () => {
    render(
      <MemoryRouter initialEntries={['/terms']}>
        <LegalPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Terms of Service/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1. Account Security & Single Session Rule/i).length).toBeGreaterThan(0);
  });
});
