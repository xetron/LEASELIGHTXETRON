"use client";

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeaseDetails } from '@/components/leases/lease-details';

// Mock data - in a real app this would come from the API
const leases = [
  {
    id: 'L001',
    name: 'Office Space - Downtown',
    startDate: '2025-01-15',
    endDate: '2030-01-14',
    classification: 'Operating',
    monthlyPayment: 5000,
    lessor: 'City Properties LLC',
    status: 'active',
  },
  {
    id: 'L002',
    name: 'Warehouse - Industrial Zone',
    startDate: '2024-11-01',
    endDate: '2029-10-31',
    classification: 'Finance',
    monthlyPayment: 7500,
    lessor: 'Industrial Spaces Inc',
    status: 'active',
  },
  {
    id: 'L003',
    name: 'Vehicle Fleet - Delivery Trucks',
    startDate: '2025-02-10',
    endDate: '2028-02-09',
    classification: 'Finance',
    monthlyPayment: 2500,
    lessor: 'Fleet Solutions Co',
    status: 'active',
  },
  {
    id: 'L004',
    name: 'Office Equipment - Printers',
    startDate: '2025-03-01',
    endDate: '2027-02-28',
    classification: 'Operating',
    monthlyPayment: 1200,
    lessor: 'Tech Equipment Lease Ltd',
    status: 'active',
  },
  {
    id: 'L005',
    name: 'Retail Space - Mall Location',
    startDate: '2024-12-01',
    endDate: '2029-11-30',
    classification: 'Finance',
    monthlyPayment: 8500,
    lessor: 'Premium Retail Spaces',
    status: 'active',
  },
  {
    id: 'L006',
    name: 'Heavy Machinery',
    startDate: '2025-04-01',
    endDate: '2028-03-31',
    classification: 'Finance',
    monthlyPayment: 4200,
    lessor: 'Industrial Equipment Inc',
    status: 'pending',
  },
  {
    id: 'L007',
    name: 'Corporate Apartments',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    classification: 'Operating',
    monthlyPayment: 3500,
    lessor: 'Executive Housing Solutions',
    status: 'pending',
  },
];

type Lease = typeof leases[0];

export function LeaseTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);

  const columns: ColumnDef<Lease>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'classification',
      header: 'Classification',
      cell: ({ row }) => {
        const classification = row.getValue('classification') as string;
        return (
          <Badge variant={classification === 'Finance' ? 'default' : 'outline'}>
            {classification}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => new Date(row.getValue('startDate')).toLocaleDateString(),
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => new Date(row.getValue('endDate')).toLocaleDateString(),
    },
    {
      accessorKey: 'monthlyPayment',
      header: 'Monthly Payment',
      cell: ({ row }) => `$${row.getValue<number>('monthlyPayment').toLocaleString()}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={status === 'active' ? 'success' : 'secondary'}>
            {status === 'active' ? 'Active' : 'Pending'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button 
          variant="ghost" 
          onClick={() => setSelectedLease(row.original)}
        >
          View
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: leases,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter leases..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn('classification')?.getFilterValue() as string) ?? ''}
            onValueChange={(value) => 
              table.getColumn('classification')?.setFilterValue(value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Classification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operating">Operating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No leases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 p-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} leases
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </Card>

      {selectedLease && (
        <LeaseDetails 
          lease={selectedLease} 
          onClose={() => setSelectedLease(null)} 
        />
      )}
    </div>
  );
}