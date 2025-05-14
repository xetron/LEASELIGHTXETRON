import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/nav';
import { UserAccountNav } from '@/components/dashboard/user-account-nav';
import { DashboardHeader } from '@/components/dashboard/header';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader>
        <UserAccountNav
          user={{
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            image: null,
          }}
        />
      </DashboardHeader>
      <div className="flex-1 container grid flex-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6 py-6">
        <aside className="w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <DashboardNav />
        </aside>
        <main className="flex flex-col">{children}</main>
      </div>
    </div>
  );
}