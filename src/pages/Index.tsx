
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientList } from "@/components/PatientList";
import { MedicalRecords } from "@/components/MedicalRecords";
import { Appointments } from "@/components/Appointments";
import { PatientForm } from "@/components/PatientForm";

type ActiveView = 'dashboard' | 'patients' | 'records' | 'appointments' | 'add-patient';

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
