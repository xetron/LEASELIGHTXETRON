import { LeaseTable } from '@/components/leases/lease-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function LeasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leases</h1>
          <p className="text-muted-foreground">
            Manage and review all your lease agreements
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href="/dashboard/upload">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lease
            </Button>
          </Link>
        </div>
      </div>
      
      <LeaseTable />
    </div>
  );
}