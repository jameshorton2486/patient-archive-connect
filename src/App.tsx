
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApplicationShell } from './components/layout/ApplicationShell';

// Import all page components
import DashboardPage from './pages/dashboard';
import ClientIntakePage from './pages/client-intake';
import SmartIntakePage from './pages/smart-intake';
import SecureFormPage from './pages/secure-form';
import PatientsPage from './pages/patients';
import ProvidersPage from './pages/providers';
import RecordsPage from './pages/records';
import AppointmentsPage from './pages/appointments';
import DocumentsPage from './pages/documents';
import AutoGeneratePage from './pages/auto-generate';
import AIProcessingPage from './pages/ai-processing';
import DistributionPage from './pages/distribution';
import DeadlinesPage from './pages/deadlines';
import DenialsPage from './pages/denials';
import AnalyticsPage from './pages/analytics';
import IntegrationsPage from './pages/integrations';
import DesignSystemPreviewPage from './pages/design-system-preview';
import NotFound from './pages/NotFound';

function App() {
  const user = 'Dr. Sarah Wilson';

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Router>
        <ApplicationShell user={user} onLogout={handleLogout}>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Main routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/design-system-preview" element={<DesignSystemPreviewPage />} />
            
            {/* Client Management */}
            <Route path="/client-intake" element={<ClientIntakePage />} />
            <Route path="/smart-intake" element={<SmartIntakePage />} />
            <Route path="/secure-form" element={<SecureFormPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            
            {/* Medical Records */}
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            
            {/* Automation */}
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/auto-generate" element={<AutoGeneratePage />} />
            <Route path="/ai-processing" element={<AIProcessingPage />} />
            <Route path="/distribution" element={<DistributionPage />} />
            
            {/* Management */}
            <Route path="/deadlines" element={<DeadlinesPage />} />
            <Route path="/denials" element={<DenialsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            
            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApplicationShell>
      </Router>
    </div>
  );
}

export default App;
