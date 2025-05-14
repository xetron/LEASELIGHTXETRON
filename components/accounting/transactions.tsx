"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewJournalEntryForm } from "@/components/accounting/new-entry-form";

// Mock data - in a real app this would come from the API
const transactions = [
  {
    id: "JE001",
    date: "2025-01-15",
    description: "Initial recognition of office lease",
    leaseId: "L001",
    debitAccount: "Right-of-use Asset",
    creditAccount: "Lease Liability",
    amount: 240000,
    status: "posted",
  },
  {
    id: "JE002",
    date: "2025-01-31",
    description: "Monthly lease payment - Office",
    leaseId: "L001",
    debitAccount: "Lease Liability",
    creditAccount: "Cash",
    amount: 5000,
    status: "posted",
  },
  {
    id: "JE003",
    date: "2025-01-31",
    description: "Interest expense - Office lease",
    leaseId: "L001",
    debitAccount: "Interest Expense",
    creditAccount: "Lease Liability",
    amount: 800,
    status: "posted",
  },
  {
    id: "JE004",
    date: "2025-01-31",
    description: "Depreciation - Office ROU asset",
    leaseId: "L001",
    debitAccount: "Depreciation Expense",
    creditAccount: "Accumulated Depreciation",
    amount: 4000,
    status: "posted",
  },
  {
    id: "JE005",
    date: "2025-02-01",
    description: "Initial recognition of vehicle fleet",
    leaseId: "L003",
    debitAccount: "Right-of-use Asset",
    creditAccount: "Lease Liability",
    amount: 90000,
    status: "posted",
  },
  {
    id: "JE006",
    date: "2025-02-15",
    description: "Initial recognition of warehouse lease",
    leaseId: "L002",
    debitAccount: "Right-of-use Asset",
    creditAccount: "Lease Liability",
    amount: 360000,
    status: "pending",
  },
  {
    id: "JE007",
    date: "2025-02-28",
    description: "Monthly lease payment - Office",
    leaseId: "L001",
    debitAccount: "Lease Liability",
    creditAccount: "Cash",
    amount: 5000,
    status: "pending",
  },
  {
    id: "JE008",
    date: "2025-02-28",
    description: "Monthly lease payment - Vehicles",
    leaseId: "L003",
    debitAccount: "Lease Liability",
    creditAccount: "Cash",
    amount: 2500,
    status: "pending",
  },
];

export function AccountingTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (searchTerm === "" ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.leaseId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || transaction.status === statusFilter)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="posted">Posted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Journal Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
            </DialogHeader>
            <NewJournalEntryForm onSuccess={() => setIsNewEntryOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entry ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Lease ID</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead aria-label="Actions"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.leaseId}</TableCell>
                    <TableCell>{transaction.debitAccount}</TableCell>
                    <TableCell>{transaction.creditAccount}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "posted" ? "outline" : "secondary"
                        }
                      >
                        {transaction.status === "posted" ? "Posted" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit entry</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {transaction.status === "pending" ? (
                            <DropdownMenuItem>Post to ledger</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Reverse entry</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No journal entries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> entries
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
}