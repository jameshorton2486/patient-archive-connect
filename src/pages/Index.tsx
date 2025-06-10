
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

export default function Index() {
  const [activeView, setActiveView] = useState('dashboard');
  const [user] = useState('Dr. Sarah Johnson');

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <LinearDashboard />;
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
  };

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
}
