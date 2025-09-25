// "use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Package, ChevronRight, Box } from "lucide-react";

type TrackGrievanceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrack: (payload: { grievanceId: string; mobileNumber: string }) => void;
  initialGrievanceId?: string;
  initialMobile?: string;
};

export function TrackGrievanceModal({
  open,
  onOpenChange,
  onTrack,
  initialGrievanceId = "1356091",
  initialMobile = "+91-8077992420",
}: TrackGrievanceModalProps) {
  const [grievanceId, setGrievanceId] = useState(initialGrievanceId);
  const [mobileNumber, setMobileNumber] = useState(initialMobile);

  useEffect(() => {
    setGrievanceId(initialGrievanceId);
  }, [initialGrievanceId]);

  useEffect(() => {
    setMobileNumber(initialMobile);
  }, [initialMobile]);

  const handleTrackGrievance = () => {
    onTrack({ grievanceId: grievanceId.trim(), mobileNumber: mobileNumber.trim() });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md bg-card border-border shadow-2xl"
      >
        <div className="flex flex-col space-y-6 p-6 border rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
              <Box className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Track Grievance
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="grievance-id"
                className="text-sm font-medium text-card-foreground"
              >
                Grievance ID
              </Label>
              <Input
                id="grievance-id"
                value={grievanceId}
                onChange={(e) => setGrievanceId(e.target.value)}
                className="h-12 bg-muted border-border text-card-foreground placeholder:text-muted-foreground"
                placeholder="Enter Grievance ID"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mobile-number"
                className="text-sm font-medium text-card-foreground"
              >
                Registered Mobile No.
              </Label>
              <Input
                id="mobile-number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="h-12 bg-muted border-border text-card-foreground placeholder:text-muted-foreground"
                placeholder="Enter Mobile Number"
              />
            </div>
          </div>

          <Button
            onClick={handleTrackGrievance}
            className="h-12 bg-blue-900 text-primary-foreground hover:bg-950 font-medium"
          >
            Track Grievance
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
