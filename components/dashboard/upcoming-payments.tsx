import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data - in a real app this would come from the API
const paymentsData = [
  {
    id: 1,
    leaseId: 'L102',
    leaseTitle: 'Office Space Lease',
    amount: 5000,
    dueDate: new Date(2025, 3, 25),
    status: 'upcoming',
  },
  {
    id: 2,
    leaseId: 'L098',
    leaseTitle: 'Vehicle Fleet Lease',
    amount: 2500,
    dueDate: new Date(2025, 3, 28),
    status: 'upcoming',
  },
  {
    id: 3,
    leaseId: 'L076',
    leaseTitle: 'Equipment Lease',
    amount: 4200,
    dueDate: new Date(2025, 4, 5),
    status: 'upcoming',
  },
  {
    id: 4,
    leaseId: 'L088',
    leaseTitle: 'Warehouse Space',
    amount: 7500,
    dueDate: new Date(2025, 4, 12),
    status: 'upcoming',
  },
];

export function UpcomingPayments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>Schedule for the next 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentsData.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {payment.leaseTitle} <span className="text-muted-foreground">#{payment.leaseId}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(payment.dueDate, 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">${payment.amount.toLocaleString()}</p>
                <Badge variant="outline">Due</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}