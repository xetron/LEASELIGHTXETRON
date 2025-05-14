"use client";

import { useTheme } from 'next-themes';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - in a real app this would come from the API
const data = [
  { month: 'Jan', operating: 4000, finance: 2400 },
  { month: 'Feb', operating: 3000, finance: 2210 },
  { month: 'Mar', operating: 2000, finance: 2290 },
  { month: 'Apr', operating: 2780, finance: 2000 },
  { month: 'May', operating: 1890, finance: 2181 },
  { month: 'Jun', operating: 2390, finance: 2500 },
  { month: 'Jul', operating: 3490, finance: 2100 },
];

const quarterlyData = [
  { quarter: 'Q1', operating: 9000, finance: 6900 },
  { quarter: 'Q2', operating: 7060, finance: 6681 },
  { quarter: 'Q3', operating: 8560, finance: 6500 },
  { quarter: 'Q4', operating: 9100, finance: 7100 },
];

interface DashboardChartProps {
  className?: string;
}

export function DashboardChart({ className }: DashboardChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Lease Liabilities</CardTitle>
        <CardDescription>
          Overview of lease liabilities by classification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2D3748' : '#E2E8F0'} />
                  <XAxis dataKey="month" stroke={isDark ? '#A0AEC0' : '#4A5568'} />
                  <YAxis stroke={isDark ? '#A0AEC0' : '#4A5568'} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
                      borderColor: isDark ? '#4A5568' : '#E2E8F0',
                      color: isDark ? '#FFFFFF' : '#000000',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="finance"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="operating"
                    stackId="1"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={quarterlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2D3748' : '#E2E8F0'} />
                  <XAxis dataKey="quarter" stroke={isDark ? '#A0AEC0' : '#4A5568'} />
                  <YAxis stroke={isDark ? '#A0AEC0' : '#4A5568'} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
                      borderColor: isDark ? '#4A5568' : '#E2E8F0',
                      color: isDark ? '#FFFFFF' : '#000000',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="finance"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="operating"
                    stackId="1"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}