
import { DesignSystemPreview } from '@/components/DesignSystemPreview';
import { PageHeader } from '@/components/ui/page-header';
import { ROUTE_META, ROUTES } from '@/routes';

export default function DesignSystemPreviewPage() {
  const meta = ROUTE_META[ROUTES.designSystemPreview];
  
  return (
    <>
      <PageHeader 
        title={meta.title}
        description={meta.description}
        breadcrumb={meta.breadcrumb}
      />
      
      <div className="mb-6 p-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg">
        <p className="text-sm text-[var(--text-secondary)] italic">
          📋 This page is for internal testing of reusable components and design tokens.
        </p>
      </div>
      
      <DesignSystemPreview />
    </>
  );
}
