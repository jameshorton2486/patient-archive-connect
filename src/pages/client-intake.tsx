
import { ClientIntake } from '@/components/ClientIntake';
import { useNavigate } from 'react-router-dom';

export default function ClientIntakePage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  return <ClientIntake onBack={handleBack} />;
}
