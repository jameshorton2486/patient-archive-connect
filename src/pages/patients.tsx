
import { PatientList } from '@/components/PatientList';
import { PageHeader } from '@/components/ui/page-header';
import { ROUTE_META, ROUTES } from '@/routes';

export default function PatientsPage() {
  const meta = ROUTE_META[ROUTES.patients];
  
  const handleAddPatient = () => {
    console.log('Add patient clicked');
  };

  return (
    <div>
      <PageHeader 
        title={meta.title}
        description={meta.description}
        breadcrumb={meta.breadcrumb}
      />
      <PatientList onAddPatient={handleAddPatient} />
    </div>
  );
}
