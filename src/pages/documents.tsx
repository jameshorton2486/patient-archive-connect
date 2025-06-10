
import { DocumentGeneration } from '@/components/DocumentGeneration';
import { PageHeader } from '@/components/ui/page-header';
import { ROUTE_META, ROUTES } from '@/routes';

export default function DocumentsPage() {
  const meta = ROUTE_META[ROUTES.documents];

  return (
    <div>
      <PageHeader 
        title={meta.title}
        description={meta.description}
        breadcrumb={meta.breadcrumb}
      />
      <DocumentGeneration />
    </div>
  );
}
