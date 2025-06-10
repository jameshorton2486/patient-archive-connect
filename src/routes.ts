
// Central route configuration
export const ROUTES = {
  dashboard: "/dashboard",
  clientIntake: "/client-intake",
  smartIntake: "/smart-intake",
  secureForm: "/secure-form",
  patients: "/patients",
  providers: "/providers",
  records: "/records",
  appointments: "/appointments",
  documents: "/documents",
  autoGenerate: "/auto-generate",
  aiProcessing: "/ai-processing",
  distribution: "/distribution",
  deadlines: "/deadlines",
  denials: "/denials",
  analytics: "/analytics",
  integrations: "/integrations",
  designSystemPreview: "/design-system-preview"
} as const;

export type RouteKey = keyof typeof ROUTES;

// Route metadata for breadcrumbs and SEO
export const ROUTE_META = {
  [ROUTES.dashboard]: {
    title: "Dashboard – Legal Records",
    breadcrumb: "Dashboard",
    description: "Legal case management dashboard"
  },
  [ROUTES.clientIntake]: {
    title: "Client Intake – Legal Records",
    breadcrumb: "Client Intake",
    description: "New client intake form"
  },
  [ROUTES.smartIntake]: {
    title: "Smart Intake – Legal Records",
    breadcrumb: "Smart Intake",
    description: "AI-powered client intake"
  },
  [ROUTES.secureForm]: {
    title: "Secure Form – Legal Records",
    breadcrumb: "Secure Form",
    description: "Secure client intake form"
  },
  [ROUTES.patients]: {
    title: "Patients – Legal Records",
    breadcrumb: "Patients",
    description: "Patient management"
  },
  [ROUTES.providers]: {
    title: "Providers – Legal Records",
    breadcrumb: "Providers",
    description: "Healthcare provider management"
  },
  [ROUTES.records]: {
    title: "Medical Records – Legal Records",
    breadcrumb: "Medical Records",
    description: "Medical records management"
  },
  [ROUTES.appointments]: {
    title: "Appointments – Legal Records",
    breadcrumb: "Appointments",
    description: "Appointment scheduling"
  },
  [ROUTES.documents]: {
    title: "Documents – Legal Records",
    breadcrumb: "Documents",
    description: "Document generation"
  },
  [ROUTES.autoGenerate]: {
    title: "Auto Generate – Legal Records",
    breadcrumb: "Auto Generate",
    description: "Automated document generation"
  },
  [ROUTES.aiProcessing]: {
    title: "AI Processing – Legal Records",
    breadcrumb: "AI Processing",
    description: "AI document processing"
  },
  [ROUTES.distribution]: {
    title: "Distribution – Legal Records",
    breadcrumb: "Distribution",
    description: "Document distribution"
  },
  [ROUTES.deadlines]: {
    title: "Deadlines – Legal Records",
    breadcrumb: "Deadlines",
    description: "Deadline management"
  },
  [ROUTES.denials]: {
    title: "Denials – Legal Records",
    breadcrumb: "Denials",
    description: "Denial management"
  },
  [ROUTES.analytics]: {
    title: "Analytics – Legal Records",
    breadcrumb: "Analytics",
    description: "Predictive analytics"
  },
  [ROUTES.integrations]: {
    title: "Integrations – Legal Records",
    breadcrumb: "Integrations",
    description: "Integration ecosystem"
  },
  [ROUTES.designSystemPreview]: {
    title: "Design System – Legal Records",
    breadcrumb: "Design System",
    description: "Component library preview"
  }
} as const;
