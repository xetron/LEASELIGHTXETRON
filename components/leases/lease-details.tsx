"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign, Building, Clock, Tag } from 'lucide-react';

interface Lease {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  classification: string;
  monthlyPayment: number;
  lessor: string;
  status: string;
}

interface LeaseDetailsProps {
  lease: Lease;
  onClose: () => void;
}

export function LeaseDetails({ lease, onClose }: LeaseDetailsProps) {
  const startDate = new Date(lease.startDate);
  const endDate = new Date(lease.endDate);
  
  // Calculate lease term in months
  const leaseTerm = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth());
  
  // Calculate total lease value
  const totalValue = lease.monthlyPayment * leaseTerm;
  
  // Calculate present value (simplified for demo)
  const presentValue = Math.round(totalValue * 0.9);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {lease.name}
          </DialogTitle>
          <DialogDescription>
            Lease ID: {lease.id} | Lessor: {lease.lessor}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Label>Term</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p>{startDate.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p>{endDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Term: {leaseTerm} months
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <Label>Lessor Information</Label>
                      </div>
                      <p>{lease.lessor}</p>
                      <p className="text-sm text-muted-foreground">
                        Contract #: CT-{lease.id}-2025
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Label>Financial Details</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p>${lease.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Amount</p>
                          <p>${(lease.monthlyPayment * 12).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Value</p>
                          <p>${totalValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Present Value</p>
                          <p>${presentValue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <Label>Classification</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lease.classification === 'Finance' ? 'default' : 'outline'}>
                          {lease.classification}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          ASC 842 Compliant
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label>Lease Timeline</Label>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -translate-y-1/2"></div>
                    <div className="relative flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary z-10"></div>
                        <p className="text-xs mt-2 text-muted-foreground">Start</p>
                        <p className="text-xs font-medium">{startDate.toLocaleDateString()}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-muted-foreground z-10"></div>
                        <p className="text-xs mt-2 text-muted-foreground">Midpoint</p>
                        <p className="text-xs font-medium">
                          {new Date(
                            startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-muted-foreground z-10"></div>
                        <p className="text-xs mt-2 text-muted-foreground">End</p>
                        <p className="text-xs font-medium">{endDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button>Edit Lease</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="classification" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-lg">Classification: </Label>
                      <Badge variant={lease.classification === 'Finance' ? 'default' : 'outline'} className="text-base px-3 py-1">
                        {lease.classification}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Reclassify
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Classification Criteria:</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                        <p>Present value ≥ 90% of fair value</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Yes
                        </Badge>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                        <p>Lease term ≥ 75% of economic life</p>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          No
                        </Badge>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                        <p>Transfer of ownership at end of lease</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Yes
                        </Badge>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                        <p>Bargain purchase option exists</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Yes
                        </Badge>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                        <p>Asset is specialized with no alternative use</p>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          No
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Financial Impact:</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Balance Sheet Impact</h5>
                        <p className="text-sm text-muted-foreground">
                          Right-of-use asset: ${presentValue.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Lease liability: ${presentValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-1">Income Statement Impact</h5>
                        <p className="text-sm text-muted-foreground">
                          Interest expense: $3,240/year
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Depreciation expense: ${Math.round(presentValue / (leaseTerm / 12)).toLocaleString()}/year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Payment Schedule</h3>
                    <Button variant="outline" size="sm">
                      Export Schedule
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Interest</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...Array(5)].map((_, i) => {
                          const date = new Date(startDate);
                          date.setMonth(date.getMonth() + i);
                          const status = i < 2 ? 'Paid' : i === 2 ? 'Due' : 'Scheduled';
                          
                          return (
                            <TableRow key={i}>
                              <TableCell>{date.toLocaleDateString()}</TableCell>
                              <TableCell>${lease.monthlyPayment.toLocaleString()}</TableCell>
                              <TableCell>${Math.round(lease.monthlyPayment * 0.8).toLocaleString()}</TableCell>
                              <TableCell>${Math.round(lease.monthlyPayment * 0.2).toLocaleString()}</TableCell>
                              <TableCell>
                                ${Math.round(presentValue - (Math.round(lease.monthlyPayment * 0.8) * i)).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant={
                                  status === 'Paid' ? 'outline' : 
                                  status === 'Due' ? 'destructive' : 
                                  'secondary'
                                }>
                                  {status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="link">
                      Show All Payments
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Payments</p>
                          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Payments Made</p>
                          <p className="text-2xl font-bold">${(lease.monthlyPayment * 2).toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Remaining Balance</p>
                          <p className="text-2xl font-bold">
                            ${(totalValue - lease.monthlyPayment * 2).toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button>Record Payment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

function Table({ ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table 
        className="w-full caption-bottom text-sm" 
        {...props} 
      />
    </div>
  );
}

function TableHeader({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="[&_tr]:border-b" {...props} />;
}

function TableBody({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />;
}

function TableHead({ ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
      {...props}
    />
  );
}

function TableRow({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      {...props}
    />
  );
}

function TableCell({ ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props} />;
}