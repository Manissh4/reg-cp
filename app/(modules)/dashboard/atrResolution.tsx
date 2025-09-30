"use client";

import type React from "react";

import { useCallback, useMemo, useRef, useState } from "react";
import DetailedInfoModal from "@/components/DetailedInfoModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type GrievanceStatus = "resolved" | "partially" | "cannot";

interface AtrFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function AtrFormModal({ open, onClose }: AtrFormModalProps) {
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<GrievanceStatus>("resolved");
  const [remarks, setRemarks] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [groName, setGroName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileAdd = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles((prev) => {
      const next = [...prev];
      for (let i = 0; i < newFiles.length; i++) {
        // prevent duplicates by name+size
        const f = newFiles.item(i)!;
        if (!next.some((x) => x.name === f.name && x.size === f.size)) {
          next.push(f);
        }
      }
      return next;
    });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFileAdd(e.dataTransfer.files);
    },
    [onFileAdd]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(date && remarks.trim() && groName && designation);
  }, [date, remarks, groName, designation]);

  const handleSubmit = useCallback(() => {
    // Replace with server action or API call if needed
    console.log("[v0] ATR payload:", {
      date,
      status,
      remarks,
      files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      groName,
      designation,
    });
    onClose();
  }, [date, status, remarks, files, groName, designation, onClose]);

  if (!open) return null;

  return (
    <DetailedInfoModal
      title="ATR (Action Taken Report)"
      cancelButton
      actionButtonText="Submit"
      cancelButtonText="Cancel"
      handleCancel={onClose}
      handleAction={handleSubmit}
      handleModalClose={onClose}
      footer
      footerButtonAlignment="end"
      maxWidth="max-w-3xl"
      maxHeight="max-h-[90vh]"
    >
      <form className="space-y-6">
        {/* Resolution Details section */}
        <section aria-labelledby="resolution-details" className="space-y-4">
          <h2
            id="resolution-details"
            className="text-sm font-medium text-muted-foreground"
          >
            Resolution Details
          </h2>

          {/* Date of Resolution */}
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-sm">
              Date of Resolution <span className="text-destructive">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Grievance Status */}
          <div className="grid gap-2">
            <Label className="text-sm">Grievance Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(v) => setStatus(v as GrievanceStatus)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md border p-3",
                  status === "resolved" ? "border-primary" : "border-border"
                )}
              >
                <RadioGroupItem id="gs-resolved" value="resolved" />
                <Label htmlFor="gs-resolved" className="font-normal">
                  Resolved
                </Label>
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 rounded-md border p-3",
                  status === "partially" ? "border-primary" : "border-border"
                )}
              >
                <RadioGroupItem id="gs-partially" value="partially" />
                <Label htmlFor="gs-partially" className="font-normal">
                  Partially Resolved
                </Label>
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 rounded-md border p-3",
                  status === "cannot" ? "border-primary" : "border-border"
                )}
              >
                <RadioGroupItem id="gs-cannot" value="cannot" />
                <Label htmlFor="gs-cannot" className="font-normal">
                  Cannot be Resolved
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Actions taken / Remarks */}
          <div className="grid gap-2">
            <Label htmlFor="remarks" className="text-sm">
              Actions taken for Resolution and Closing Remarks{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="remarks"
              placeholder="Describe the steps taken and final remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-[140px] resize-y"
              required
            />
          </div>

          {/* Upload Documents */}
          <div className="grid gap-2">
            <Label className="text-sm">Upload Documents</Label>
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="rounded-md border border-dashed p-6 text-center grid place-items-center gap-2"
              aria-label="Drag and drop files here to upload"
            >
              <Upload className="h-5 w-5 opacity-70" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Please Drop or upload your files here
              </p>
              <Input
                ref={inputRef}
                type="file"
                multiple
                className="mt-2 w-full max-w-sm"
                onChange={(e) => onFileAdd(e.target.files)}
              />
            </div>

            {/* File chips */}
            {files.length > 0 && (
              <ul className="mt-2 grid gap-2">
                {files.map((f, idx) => (
                  <li
                    key={f.name + idx}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <span className="truncate text-sm">{f.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(idx)}
                      aria-label={`Remove ${f.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* GRO Name and Designation */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm">GRO Name</Label>
              <Select value={groName} onValueChange={setGroName}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select GRO Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anand-lal">Anand Lal</SelectItem>
                  <SelectItem value="priya-sharma">Priya Sharma</SelectItem>
                  <SelectItem value="rahul-mehta">Rahul Mehta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm">Designation</Label>
              <Select value={designation} onValueChange={setDesignation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior-executive">
                    Senior Executive
                  </SelectItem>
                  <SelectItem value="assistant-manager">
                    Assistant Manager
                  </SelectItem>
                  <SelectItem value="officer">Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Footer actions replicated to support Enter key if needed */}
        <div className="sr-only">
          <Button
            type="submit"
            disabled={!canSubmit}
            onClick={(e) => {
              e.preventDefault();
              if (canSubmit) handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </DetailedInfoModal>
  );
}
