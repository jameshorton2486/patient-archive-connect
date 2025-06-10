import { useState } from "react";
import { ApplicationShell } from "@/components/layout/ApplicationShell";
import { DenialManagement } from "@/components/DenialManagement";
import { PatientList } from "@/components/PatientList";
import { PatientForm } from "@/components/PatientForm";
import { ProviderList } from "@/components/ProviderList";
import { MedicalRecords } from "@/components/MedicalRecords";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { SecureIntakeForm } from "@/components/SecureIntakeForm";
import { LinearDashboard } from "@/components/LinearDashboard";
import { LinearClientForm } from "@/components/LinearClientForm";

console.log('Index.tsx: Starting Index component initialization');

export default function Index() {
  console.log('Index.tsx: Rendering Index component');
  
  const [activeView, setActiveView] = useState('dashboard');
  const [user] = useState('Dr. Sarah Johnson');

  const handleLogout = () => {
    console.log('Index.tsx: Logging out...');
    // Add logout logic here
  };

  const renderActiveView = () => {
    console.log('Index.tsx: Rendering active view:', activeView);
    
    try {
      switch (activeView) {
        case 'dashboard':
          return <LinearDashboard />;
        case 'client-intake':
          return <LinearClientForm onBack={() => setActiveView('dashboard')} />;
        case 'denial-management':
          return <DenialManagement onBack={() => setActiveView('dashboard')} />;
        case 'patient-list':
          return <PatientList onAddPatient={() => setActiveView('patient-form')} />;
        case 'patient-form':
          return <PatientForm onBack={() => setActiveView('patient-list')} />;
        case 'provider-list':
          return <ProviderList onAddProvider={() => console.log('Add provider')} />;
        case 'medical-records':
          return <MedicalRecords />;
        case 'predictive-analytics':
          return <PredictiveAnalytics onBack={() => setActiveView('dashboard')} />;
        case 'secure-intake':
          return <SecureIntakeForm onBack={() => setActiveView('dashboard')} />;
        default:
          return <LinearDashboard />;
      }
    } catch (error) {
      console.error('Index.tsx: Error rendering active view:', error);
      return <div>Error loading view: {activeView}</div>;
    }
  };

  try {
    return (
      <ApplicationShell
        activeView={activeView}
        onViewChange={setActiveView}
        user={user}
        onLogout={handleLogout}
      >
        {renderActiveView()}
      </ApplicationShell>
    );
  } catch (error) {
    console.error('Index.tsx: Error rendering ApplicationShell:', error);
    return <div>Error loading application</div>;
  }
}

console.log('Index.tsx: Index component defined successfully');
