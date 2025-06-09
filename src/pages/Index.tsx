
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientList } from "@/components/PatientList";
import { MedicalRecords } from "@/components/MedicalRecords";
import { Appointments } from "@/components/Appointments";
import { PatientForm } from "@/components/PatientForm";
import { ClientIntake } from "@/components/ClientIntake";
import { ClientList } from "@/components/ClientList";
import { ProviderList } from "@/components/ProviderList";
import { ProviderForm } from "@/components/ProviderForm";
import { DocumentGeneration } from "@/components/DocumentGeneration";
import { DeadlineManagement } from "@/components/DeadlineManagement";

type ActiveView = 'dashboard' | 'patients' | 'records' | 'appointments' | 'add-patient' | 'client-intake' | 'clients' | 'providers' | 'add-provider' | 'document-generation' | 'deadline-management';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientList onAddPatient={() => setActiveView('add-patient')} />;
      case 'records':
        return <MedicalRecords />;
      case 'appointments':
        return <Appointments />;
      case 'add-patient':
        return <PatientForm onBack={() => setActiveView('patients')} />;
      case 'client-intake':
        return <ClientIntake onBack={() => setActiveView('clients')} />;
      case 'clients':
        return <ClientList onAddClient={() => setActiveView('client-intake')} />;
      case 'providers':
        return <ProviderList onAddProvider={() => setActiveView('add-provider')} />;
      case 'add-provider':
        return <ProviderForm onBack={() => setActiveView('providers')} />;
      case 'document-generation':
        return <DocumentGeneration onBack={() => setActiveView('dashboard')} />;
      case 'deadline-management':
        return <DeadlineManagement onBack={() => setActiveView('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-6">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Index;
