"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useTheme } from "next-themes";

const assetData = [
  { name: "Land and Buildings", value: 450000 },
  { name: "Equipment", value: 250000 },
  { name: "Vehicles", value: 150000 },
  { name: "IT Assets", value: 100000 },
  { name: "Other", value: 50000 },
];

const liabilityData = [
  { name: "Operating Leases", value: 350000 },
  { name: "Finance Leases", value: 450000 },
  { name: "Short-term Leases", value: 100000 },
  { name: "Variable Lease Expenses", value: 50000 },
];

export function AccountingHeader() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Financial Summary</TabsTrigger>
            <TabsTrigger value="assets">Lease Assets</TabsTrigger>
            <TabsTrigger value="liabilities">Lease Liabilities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">ASC 842 Financial Impact</h3>
                    <p className="text-sm text-muted-foreground">Current reporting period</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Right-of-use Assets</p>
                        <p className="text-2xl font-bold">$1,000,000</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          +5.2% from last period
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Lease Liabilities</p>
                        <p className="text-2xl font-bold">$950,000</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          +3.8% from last period
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Weighted Avg. Lease Term</p>
                        <p className="text-2xl font-bold">4.6 years</p>
                        <p className="text-sm text-muted-foreground">
                          Across all active leases
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Discount Rate (Avg.)</p>
                        <p className="text-2xl font-bold">4.2%</p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          +0.3% from last period
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Lease Classification</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Finance', value: 65 },
                          { name: 'Operating', value: 35 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        <Cell key="cell-0" fill="hsl(var(--chart-1))" />
                        <Cell key="cell-1" fill="hsl(var(--chart-2))" />
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
                          borderColor: isDark ? '#4A5568' : '#E2E8F0',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assets" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Lease Asset Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {assetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)}
                        contentStyle={{
                          backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
                          borderColor: isDark ? '#4A5568' : '#E2E8F0',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Asset Details</h3>
                <div className="space-y-4">
                  {assetData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Right-of-use Assets</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(assetData.reduce((sum, item) => sum + item.value, 0))}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        As of {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="liabilities" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Lease Liability Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={liabilityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {liabilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)}
                        contentStyle={{
                          backgroundColor: isDark ? '#2D3748' : '#FFFFFF',
                          borderColor: isDark ? '#4A5568' : '#E2E8F0',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Liability Details</h3>
                <div className="space-y-4">
                  {liabilityData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Lease Liabilities</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(liabilityData.reduce((sum, item) => sum + item.value, 0))}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current</p>
                          <p className="text-lg font-medium">$245,000</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Non-current</p>
                          <p className="text-lg font-medium">$705,000</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}