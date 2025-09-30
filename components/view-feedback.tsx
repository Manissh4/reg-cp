"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ViewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  grievanceData: {
    id: string;
    ministry: string;
    dateOfResolution: string;
    feedbackDate: string;
    feedbackStatus: string;
    satisfactionLevel: string;
    comments: string;
  };
}

export function ViewFeedbackModal({
  isOpen,
  onClose,
  grievanceData,
}: ViewFeedbackModalProps) {
  const handleDownloadPDF = () => {
    console.log("Download PDF clicked");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#48454e]">
            View Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance ID</div>
            <div className="text-[#48454e] font-medium">{grievanceData.id}</div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">
              Department/Ministry
            </div>
            <div className="text-[#48454e] font-medium">
              {grievanceData.ministry}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">
              Date of Resolution
            </div>
            <div className="text-[#48454e] font-medium">
              {grievanceData.dateOfResolution}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">Feedback Date</div>
            <div className="text-[#48454e] font-medium">
              {grievanceData.feedbackDate}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">Feedback Status</div>
            <div className="text-[#48454e] font-medium">
              {grievanceData.feedbackStatus}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">
              Satisfaction Level
            </div>
            <div className="text-[#48454e] font-medium">
              {grievanceData.satisfactionLevel}
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">Comments</div>
            <div className="text-[#48454e] font-medium bg-gray-50 p-3 rounded border text-sm">
              {grievanceData.comments}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleDownloadPDF}
            className="bg-[#235e90] hover:bg-[#1a4a73] text-white flex items-center gap-2"
          >
            <Download size={16} />
            Download as PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
