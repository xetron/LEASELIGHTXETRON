import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DashboardCards } from '@/components/dashboard/cards';
import { DashboardChart } from '@/components/dashboard/chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { UpcomingPayments } from '@/components/dashboard/upcoming-payments';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  // This would normally fetch real data from the database
  const dashboardData = {
    activeLeases: 12,
    pendingClassification: 3,
    upcomingPayments: 5,
    journalEntries: 87,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user.email?.split('@')[0] || 'User'}
        </p>
      </div>
      
      <DashboardCards data={dashboardData} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardChart className="col-span-4" />
        <div className="col-span-3 space-y-6">
          <UpcomingPayments />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}