
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Dashboard } from '@/components/dashboards/Dashboard';
import { ClientIntake } from '@/components/ClientIntake';
import { IntelligentClientIntake } from '@/components/IntelligentClientIntake';
import { MedicalRecords } from '@/components/MedicalRecords';
import { ProviderList } from '@/components/ProviderList';
import { PatientList } from '@/components/PatientList';
import { Appointments } from '@/components/Appointments';
import { DeadlineManagement } from '@/components/DeadlineManagement';
import { DocumentGeneration } from '@/components/DocumentGeneration';
import { DocumentDistribution } from '@/components/DocumentDistribution';
import { AIDocumentProcessing } from '@/components/AIDocumentProcessing';
import { AutomatedDocumentGenerator } from '@/components/AutomatedDocumentGenerator';
import { DenialManagement } from '@/components/DenialManagement';
import { PredictiveAnalytics } from '@/components/PredictiveAnalytics';
import { IntegrationEcosystem } from '@/components/IntegrationEcosystem';
import { SecureIntakeForm } from '@/components/SecureIntakeForm';
import { ResponsiveNavigation } from '@/components/layout/ResponsiveNavigation';

export default function Index() {
  const [user, setUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    | 'dashboard'
    | 'client-intake'
    | 'intelligent-intake'
    | 'medical-records'
    | 'provider-list'
    | 'patient-list'
    | 'appointments'
    | 'deadline-management'
    | 'document-generation'
    | 'document-distribution'
    | 'ai-processing'
    | 'automated-generator'
    | 'denial-management'
    | 'predictive-analytics'
    | 'integration-ecosystem'
    | 'secure-intake'
    | null
  >('dashboard');

  const handleLogin = (role: string) => {
    setUser(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    if (!user) {
      return <LoginForm onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'client-intake':
        return <ClientIntake onBack={() => setCurrentView('dashboard')} />;
      case 'intelligent-intake':
        return <IntelligentClientIntake onBack={() => setCurrentView('dashboard')} />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'provider-list':
        return <ProviderList onAddProvider={() => console.log('Add provider')} />;
      case 'patient-list':
        return <PatientList onAddPatient={() => console.log('Add patient')} />;
      case 'appointments':
        return <Appointments />;
      case 'deadline-management':
        return <DeadlineManagement />;
      case 'document-generation':
        return <DocumentGeneration />;
      case 'document-distribution':
        return <DocumentDistribution />;
      case 'ai-processing':
        return <AIDocumentProcessing />;
      case 'automated-generator':
        return <AutomatedDocumentGenerator />;
      case 'denial-management':
        return <DenialManagement />;
      case 'predictive-analytics':
        return <PredictiveAnalytics />;
      case 'integration-ecosystem':
        return <IntegrationEcosystem />;
      case 'secure-intake':
        return <SecureIntakeForm onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container-app">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveNavigation 
        activeView={currentView} 
        onViewChange={setCurrentView} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="min-h-screen">
        <div className="py-6 lg:py-8">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}
