
import { SecureIntakeForm } from '@/components/SecureIntakeForm';
import { useNavigate } from 'react-router-dom';

export default function SecureFormPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  return <SecureIntakeForm onBack={handleBack} />;
}
