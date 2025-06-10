
import React, { useState } from 'react';
import { ApplicationShell } from './components/layout/ApplicationShell';
import { Dashboard } from './components/dashboards/Dashboard';
import { ClientIntake } from './components/ClientIntake';
import { IntelligentClientIntake } from './components/IntelligentClientIntake';
import { SecureIntakeForm } from './components/SecureIntakeForm';
import { PatientList } from './components/PatientList';
import { ProviderList } from './components/ProviderList';
import { MedicalRecords } from './components/MedicalRecords';
import { Appointments } from './components/Appointments';
import { DocumentGeneration } from './components/DocumentGeneration';
import { AutomatedDocumentGenerator } from './components/AutomatedDocumentGenerator';
import { AIDocumentProcessing } from './components/AIDocumentProcessing';
import { DocumentDistribution } from './components/DocumentDistribution';
import { DeadlineManagement } from './components/DeadlineManagement';
import { DenialManagement } from './components/DenialManagement';
import { PredictiveAnalytics } from './components/PredictiveAnalytics';
import { IntegrationEcosystem } from './components/IntegrationEcosystem';
import { DesignSystemPreview } from './components/DesignSystemPreview';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [user] = useState('Dr. Sarah Wilson');

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleGoBack = () => {
    setActiveView('dashboard');
  };

  const handleAddPatient = () => {
    console.log('Add patient clicked');
  };

  const handleAddProvider = () => {
    console.log('Add provider clicked');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'design-system':
        return <DesignSystemPreview />;
      case 'client-intake':
        return <ClientIntake onBack={handleGoBack} />;
      case 'intelligent-intake':
        return <IntelligentClientIntake onBack={handleGoBack} />;
      case 'secure-intake':
        return <SecureIntakeForm onBack={handleGoBack} />;
      case 'patient-list':
        return <PatientList onAddPatient={handleAddPatient} />;
      case 'provider-list':
        return <ProviderList onAddProvider={handleAddProvider} />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'appointments':
        return <Appointments />;
      case 'document-generation':
        return <DocumentGeneration />;
      case 'automated-generator':
        return <AutomatedDocumentGenerator />;
      case 'ai-processing':
        return <AIDocumentProcessing />;
      case 'document-distribution':
        return <DocumentDistribution />;
      case 'deadline-management':
        return <DeadlineManagement />;
      case 'denial-management':
        return <DenialManagement />;
      case 'predictive-analytics':
        return <PredictiveAnalytics />;
      case 'integration-ecosystem':
        return <IntegrationEcosystem />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <ApplicationShell
        activeView={activeView}
        onViewChange={setActiveView}
        user={user}
        onLogout={handleLogout}
      >
        {renderContent()}
      </ApplicationShell>
    </div>
  );
}

export default App;
