"use client";

import React, { useMemo, useState } from "react";
import { ChevronsRight, CheckCircle, CircleCheck, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {DynamicModal} from "./dynamic-modal"; 

type ForwardType = "internal" | "external";

const assignableGros = [
  "Select GRO",
  "Alex Johnson",
  "Priya Singh",
  "Martin Lopez",
];
const ministries = [
  "Select Ministry / Department",
  "Ministry of Health",
  "Ministry of Finance",
];
const categories = [
  "Select Category",
  "Infrastructure",
  "Public Services",
  "Compliance",
];

type ForwardGrievanceDialogProps = {
  grievanceId?: string | null;
  onSuccess?: (result: {
    id?: string;
    forwardType: ForwardType;
    assignee?: string;
    referenceId?: string;
  }) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ForwardGrievanceDialog({
  grievanceId,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: ForwardGrievanceDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof controlledOpen === "boolean" && typeof onOpenChange === "function";
  const open = isControlled ? controlledOpen! : internalOpen;
  const setOpen = (v: boolean) => {
    if (isControlled) onOpenChange!(v);
    else setInternalOpen(v);
  };

  const [forwardType, setForwardType] = useState<ForwardType>("internal");
  const [gro, setGro] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [remarks, setRemarks] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | undefined>(undefined);

  const groOptions = useMemo(() => assignableGros.slice(1), []);
  const departmentOptions = useMemo(() => ministries.slice(1), []);
  const categoryOptions = useMemo(() => categories.slice(1), []);

  function resetForm() {
    setGro("");
    setDepartment("");
    setCategory("");
    setRemarks("");
    setForwardType("internal");
  }

  function handleOnOpenChange(next: boolean) {
    if (!next) resetForm();
    setOpen(next);
  }

  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    setConfirmOpen(true);
    setOpen(false);
  }

  async function performForward() {
    setIsSubmitting(true);
    try {
      const payload = {
        grievanceId,
        forwardType,
        assignee: gro,
        department: forwardType === "external" ? department : undefined,
        category: forwardType === "external" ? category : undefined,
        remarks,
      };

      await new Promise((r) => setTimeout(r, 600));

      const fakeRef = `FWD-${Math.floor(Math.random() * 90000 + 10000)}`;
      setReferenceId(fakeRef);

      setIsSubmitting(false);
      setConfirmOpen(false);
      setOpen(false);
      setSuccessOpen(true);

      onSuccess?.({
        id: grievanceId ?? undefined,
        forwardType,
        assignee: gro,
        referenceId: fakeRef,
      });

      resetForm();
    } catch (err) {
      setIsSubmitting(false);
      setConfirmOpen(false);
      console.error("forward failed", err);
    }
  }

  const confirmTitle =
    forwardType === "internal"
      ? "Grievance Forward Initiated"
      : "Grievance Forward Initiated";
  const confirmDescription =
    forwardType === "internal"
      ? "Are you sure you want to forward this grievance internally for processing?"
      : "Are you sure you want to forward this grievance externally for processing?";

  const successTitle =
    forwardType === "internal"
      ? "Grievance Forwarded Successfully"
      : "Grievance Forwarded Successfully";
  const successDescription =
    forwardType === "internal"
      ? "Your grievance has been successfully forwarded for internal processing."
      : `Your grievance has been successfully forwarded for external processing.`;

  return (
    <>
      <Dialog open={open} onOpenChange={handleOnOpenChange}>
        {/* If uncontrolled, render a trigger button; if controlled we assume parent will open */}
      
        <DialogContent className="sm:max-w-lg space-y-6 p-6">
          <DialogHeader className="text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary rounded-full p-2">
                <ChevronsRight className="size-5" />
              </span>
              <div className="space-y-1">
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Forward Grievance
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <form className="space-y-6" onSubmit={onSubmitForm}>
            <span>Please choose Forward Option</span>

            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <Input
                  type="radio"
                  name="forwardType"
                  value="internal"
                  checked={forwardType === "internal"}
                  onChange={() => setForwardType("internal")}
                  className="h-5 w-5 accent-blue-900 "
                  aria-checked={forwardType === "internal"}
                  id="forward-internal"
                />
                <span className={forwardType === "internal" ? "text-foreground font-medium text-sm" : "text-muted-foreground text-sm"}>
                  Internal Forward
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <Input
                  type="radio"
                  name="forwardType"
                  value="external"
                  checked={forwardType === "external"}
                  onChange={() => setForwardType("external")}
                  aria-checked={forwardType === "external"}
                  className="h-5 w-5 accent-blue-900 "
                  id="forward-external"
                />
                <span className={forwardType === "external" ? "text-foreground font-medium text-sm" : "text-muted-foreground text-sm"}>
                  External Forward
                </span>
              </label>
            </div>

            {forwardType === "external" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Ministry / Department <span className="text-red-500">*</span>
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger className="w-full justify-between">
                      <SelectValue placeholder={ministries[0]} />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full justify-between">
                      <SelectValue placeholder={categories[0]} />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Assign GRO <span className="text-red-500">*</span>
                </Label>
                <Select value={gro} onValueChange={setGro}>
                  <SelectTrigger className="w-full justify-between">
                    <SelectValue placeholder={assignableGros[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {groOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Enter Remarks <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  placeholder="Write your remarks here..."
                  className="min-h-28 rounded-md border border-input bg-card/60"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="border border-red-600 text-red-600 bg-white hover:bg-red-50">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="bg-blue-900 text-white hover:bg-[#1e40af] px-6"
                disabled={!gro || !remarks.trim() || (forwardType === "external" && (!department || !category))}
              >
                Forward
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation modal (DynamicModal) */}
      <DynamicModal
        open={confirmOpen}
        onClose={() => {
          if (!isSubmitting) setConfirmOpen(false);
        }}
        title={confirmTitle}
        description={confirmDescription}
        icon={<ChevronsRight />}
        tone="info"
        actions={[
          {
            label: "Cancel",
            variant: "secondary",
            onClick: () => {},
          },
          {
            label: isSubmitting ? "Forwarding..." : "Yes, Forward",
            variant: "primary",
            onClick: performForward,
            dismissOnClick: false,
            autoFocus: true,
          },
        ]}
      />

      {/* Success modal */}
      <DynamicModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title={successTitle}
        description={successDescription}
        icon={<Check className=" w-9 h-9 rounded-full bg-green-600" />}
        tone="success"
        actions={[
          {
            label: "Done",
            variant: "primary",
            onClick: () => {
              setSuccessOpen(false);
              setReferenceId(undefined);
            },
            autoFocus: true,
          },
        ]}
      />
    </>
  );
}

export default ForwardGrievanceDialog;
