import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExamsPage } from './pages/ExamsPage';
import { ExamDetailPage } from './pages/ExamDetailPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { TestSeriesPage } from './pages/TestSeriesPage';
import { FreeTestsPage } from './pages/FreeTestsPage';
import { LegalPage } from './pages/LegalPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { ExamRunnerPage } from './pages/ExamRunnerPage';
import { ExamResultsPage } from './pages/ExamResultsPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide Navbar/Footer inside the full-screen examination runner
  const isExamRunner = location.pathname.startsWith('/exam/attempt/');

  if (isExamRunner) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Backward-compatibility redirector for legacy links /exam/:id
const LegacyExamRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // If it starts with 'test-' or 'mock-', route to attempt, else to exams info
  if (id && (id.startsWith('test-') || id.startsWith('mock-'))) {
    return <Navigate to={`/exam/attempt/${id}`} replace />;
  }
  return <Navigate to={`/exams/${id}`} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Streams & Catalogs */}
          <Route path="/" element={<HomePage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exams/:slug" element={<ExamDetailPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:slug" element={<CourseDetailPage />} />
          <Route path="/test-series" element={<TestSeriesPage />} />
          <Route path="/test-series/:slug" element={<TestSeriesPage />} />
          <Route path="/free-tests" element={<FreeTestsPage />} />
          
          {/* Backward compatibility for legacy /exam/:id */}
          <Route path="/exam/:id" element={<LegacyExamRedirect />} />

          {/* Policy and Informational Routes */}
          <Route path="/about" element={<LegalPage />} />
          <Route path="/contact" element={<LegalPage />} />
          <Route path="/faq" element={<LegalPage />} />
          <Route path="/updates" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/refund-policy" element={<LegalPage />} />
          <Route path="/payment-policy" element={<LegalPage />} />
          <Route path="/disclaimer" element={<LegalPage />} />

          {/* Student Auth & Dashboard */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />

          {/* Unambiguous Examination Runner & Results */}
          <Route path="/exam/attempt/:testId" element={<ExamRunnerPage />} />
          <Route path="/exam/results/:attemptId" element={<ExamResultsPage />} />

          {/* Admin Control Center */}
          <Route path="/admin" element={<AdminPage />} />

          {/* 404 Not Found Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
