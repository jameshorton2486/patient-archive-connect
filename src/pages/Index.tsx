
import { LinearDashboard } from "@/components/LinearDashboard";

console.log('Index.tsx: Starting Index component initialization');

export default function Index() {
  console.log('Index.tsx: Rendering Index component - redirecting to LinearDashboard');
  
  return <LinearDashboard />;
}

console.log('Index.tsx: Index component defined successfully');
