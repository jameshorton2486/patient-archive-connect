
import { IntelligentClientIntake } from '@/components/IntelligentClientIntake';
import { useNavigate } from 'react-router-dom';

export default function SmartIntakePage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  return <IntelligentClientIntake onBack={handleBack} />;
}
