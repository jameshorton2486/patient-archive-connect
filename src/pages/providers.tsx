
import { ProviderList } from '@/components/ProviderList';

export default function ProvidersPage() {
  const handleAddProvider = () => {
    console.log('Add provider clicked');
  };

  return <ProviderList onAddProvider={handleAddProvider} />;
}
