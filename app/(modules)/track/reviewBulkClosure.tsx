"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  status: string;
  subject: string;
  href?: string;
};

export type BulkClosureReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  items: Item[];
  defaultSelectedIds?: string[];
  onConfirm?: (selectedIds: string[]) => void;
};

export function BulkClosureReviewDialog({
  open,
  onOpenChange,
  groupId,
  items,
  defaultSelectedIds = [],
  onConfirm,
}: BulkClosureReviewDialogProps) {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(defaultSelectedIds)
  );

  React.useEffect(() => {
    // reset selection when dialog is reopened with different defaults
    if (open) {
      setSelected(new Set(defaultSelectedIds));
    }
  }, [open, defaultSelectedIds.join("|")]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearAll = () => setSelected(new Set());

  const confirm = () => {
    onConfirm?.(Array.from(selected));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-balance">
            {"Review Bulk Closure Group — "}
            {groupId}
          </DialogTitle>
        </DialogHeader>

        {/* Top bar with group summary and clear action */}
        <div className="mt-2 rounded-lg border bg-secondary/50">
          <div className="flex items-center justify-between px-4 py-2">
            <div className=" mt-2 font-medium">{groupId}</div>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-medium border-0 text-[#FF7501] hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Table */}
          <div className="px-2 pb-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Grievance ID</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-[80px] text-right">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const checked = selected.has(item.id);
                  return (
                    <TableRow key={item.id} className="align-middle">
                      <TableCell className="font-medium">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#FF7501] hover:underline"
                          >
                            {item.id}
                          </a>
                        ) : (
                          <span className="text-primary">{item.id}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.status}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "block truncate text-pretty",
                            "max-w-64 md:max-w-96"
                          )}
                        >
                          {item.subject}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center justify-end">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggle(item.id)}
                            aria-label={`Select grievance ${item.id}`}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button onClick={confirm} className="bg-blue-900">
            Reopen Grievance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BulkClosureReviewDialog;
