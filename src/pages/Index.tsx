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
import { AIDocumentEngine } from '@/components/AIEngine';
import { AutomatedDocumentGenerator } from '@/components/AutomatedDocumentGenerator';
import { DenialManagement } from '@/components/DenialManagement';
import { PredictiveAnalytics } from '@/components/PredictiveAnalytics';
import { IntegrationEcosystem } from '@/components/IntegrationEcosystem';
import { SecureIntakeForm } from '@/components/SecureIntakeForm';

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
    | 'ai-engine'
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

  const renderCurrentView = () => {
    if (!user) {
      return <LoginForm onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'client-intake':
        return <ClientIntake />;
      case 'intelligent-intake':
        return <IntelligentClientIntake onBack={() => setCurrentView('dashboard')} />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'provider-list':
        return <ProviderList />;
      case 'patient-list':
        return <PatientList />;
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
      case 'ai-engine':
        return <AIDocumentEngine />;
      case 'automated-generator':
        return <AutomatedDocumentGenerator />;
      case 'denial-management':
        return <DenialManagement />;
      case 'predictive-analytics':
        return <PredictiveAnalytics />;
      case 'integration-ecosystem':
        return <IntegrationEcosystem />;
      case 'secure-intake':
        return <SecureIntakeForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <nav>
            <ul>
              <li>
                <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('client-intake')}>Client Intake</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('intelligent-intake')}>Intelligent Intake</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('medical-records')}>Medical Records</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('provider-list')}>Provider List</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('patient-list')}>Patient List</button>
              </li>
               <li>
                <button onClick={() => setCurrentView('appointments')}>Appointments</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('deadline-management')}>Deadline Management</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('document-generation')}>Document Generation</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('document-distribution')}>Document Distribution</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-processing')}>AI Processing</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-engine')}>AI Engine</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('automated-generator')}>Automated Generator</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('denial-management')}>Denial Management</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('predictive-analytics')}>Predictive Analytics</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('integration-ecosystem')}>Integration Ecosystem</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('secure-intake')}>Secure Intake Form</button>
              </li>
            </ul>
          </nav>
          <main>{renderCurrentView()}</main>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
