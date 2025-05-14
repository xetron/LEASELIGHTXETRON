import { AccountingTransactions } from '@/components/accounting/transactions';
import { AccountingHeader } from '@/components/accounting/header';

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
        <p className="text-muted-foreground">
          Manage journal entries and accounting operations
        </p>
      </div>
      
      <AccountingHeader />
      <AccountingTransactions />
    </div>
  );
}