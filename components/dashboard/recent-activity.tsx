import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - in a real app this would come from the API
const activityData = [
  {
    id: 1,
    type: 'lease_added',
    title: 'Office Space Lease #L102',
    description: 'New lease document added',
    date: new Date(2025, 3, 15),
    user: 'john.doe@example.com',
  },
  {
    id: 2,
    type: 'classification_changed',
    title: 'Vehicle Lease #L098',
    description: 'Classification changed to Finance',
    date: new Date(2025, 3, 14),
    user: 'jane.smith@example.com',
  },
  {
    id: 3,
    type: 'payment_recorded',
    title: 'Equipment Lease #L076',
    description: 'Payment of $4,200 recorded',
    date: new Date(2025, 3, 12),
    user: 'john.doe@example.com',
  },
  {
    id: 4,
    type: 'report_generated',
    title: 'ASC 842 Disclosure Report',
    description: 'Quarterly report generated',
    date: new Date(2025, 3, 10),
    user: 'jane.smith@example.com',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your leases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.date, { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">By {activity.user.split('@')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}