
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
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <Sidebar activeView={currentView} onViewChange={setCurrentView} user={user} onLogout={handleLogout} />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navigation for Mobile */}
          <div className="lg:hidden">
            <TopNav 
              activeView={currentView} 
              onViewChange={setCurrentView} 
              user={user} 
              onLogout={handleLogout} 
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
