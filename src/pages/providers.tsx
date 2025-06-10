
import { ProviderList } from '@/components/ProviderList';
import { PageHeader } from '@/components/ui/page-header';
import { ROUTE_META, ROUTES } from '@/routes';

export default function ProvidersPage() {
  const meta = ROUTE_META[ROUTES.providers];
  
  const handleAddProvider = () => {
    console.log('Add provider clicked');
  };

  return (
    <div>
      <PageHeader 
        title={meta.title}
        description={meta.description}
        breadcrumb={meta.breadcrumb}
      />
      <ProviderList onAddProvider={handleAddProvider} />
    </div>
  );
}
