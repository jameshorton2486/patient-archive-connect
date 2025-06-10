
import { PatientList } from '@/components/PatientList';

export default function PatientsPage() {
  const handleAddPatient = () => {
    console.log('Add patient clicked');
  };

  return <PatientList onAddPatient={handleAddPatient} />;
}
