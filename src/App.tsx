
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/components/layout/ApplicationShell";
import { LinearDashboard } from "@/components/LinearDashboard";
import { LinearClientForm } from "@/components/LinearClientForm";
import { DenialManagement } from "@/components/DenialManagement";
import { PatientList } from "@/components/PatientList";
import { PatientForm } from "@/components/PatientForm";
import { ProviderList } from "@/components/ProviderList";
import { MedicalRecords } from "@/components/MedicalRecords";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { SecureIntakeForm } from "@/components/SecureIntakeForm";
import { useState } from "react";

console.log('App.tsx: Starting application initialization');

const queryClient = new QueryClient();

const App = () => {
  console.log('App.tsx: Rendering App component');
  
  const [activeView, setActiveView] = useState('dashboard');
  const [user] = useState('Dr. Sarah Johnson');

  const handleLogout = () => {
    console.log('App.tsx: Logging out...');
    // Add logout logic here
  };

  const renderActiveView = () => {
    console.log('App.tsx: Rendering active view:', activeView);
    
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
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ApplicationShell
          activeView={activeView}
          onViewChange={setActiveView}
          user={user}
          onLogout={handleLogout}
        >
          {renderActiveView()}
        </ApplicationShell>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

console.log('App.tsx: App component defined successfully');

export default App;
