"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import SuccessModal from "@/components/SucessModal";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  onReopen: (feedback: FeedbackData) => void;
  grievanceId?: string;
}

interface FeedbackData {
  resolution: "resolved" | "not-resolved" | "partially-resolved";
  satisfaction: "satisfied" | "not-satisfied";
  remarks: string;
}

type ModalState = "feedback" | "submit" | "reopen";

export function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  onReopen,
}: FeedbackModalProps) {
  const [resolution, setResolution] = useState<FeedbackData["resolution"] | "">(
    ""
  );
  const [satisfaction, setSatisfaction] = useState<
    FeedbackData["satisfaction"] | ""
  >("");
  const [remarks, setRemarks] = useState("");
  const [modalState, setModalState] = useState<ModalState>("feedback");

  const isValid = resolution && satisfaction;

  const resetAndClose = () => {
    setResolution("");
    setSatisfaction("");
    setRemarks("");
    setModalState("feedback");
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ resolution, satisfaction, remarks });
    setModalState("submit");
  };

  const handleReopen = () => {
    if (!isValid) return;
    onReopen({ resolution, satisfaction, remarks });
    setModalState("reopen");
  };

  if (modalState === "submit") {
    return (
      <SuccessModal
        handleModalClose={resetAndClose}
        handleAction={resetAndClose}
        title="Feedback submitted successfully"
        message="Your feedback has been submitted successfully."
        ActionButtonText="Dashboard"
        titleIcon={<CheckCircle className="text-green-600 w-5 h-5" />}
        actionButtonVariant="primary"
      />
    );
  }

  if (modalState === "reopen") {
    return (
      <SuccessModal
        handleModalClose={resetAndClose}
        handleAction={resetAndClose}
        title="Grievance cannot be reopened"
        message="This grievance cannot be reopened as the prescribed time limit has expired. For any further assistance, please contact the concerned department."
        ActionButtonText="Go Back"
        titleIcon={<AlertTriangle className="text-yellow-600 w-5 h-5" />}
        actionButtonVariant="secondary"
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 py-4 border-[#dddddd]">
          <DialogTitle className="text-lg font-medium text-[#48454e] flex items-center gap-2">
            <img src="/category.png" alt="Feedback" className="w-5 h-5" />
            Provide Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 space-y-6">
          {/* Resolution Status */}
          <div>
            <h3 className="text-sm font-medium text-[#48454e] mb-3">
              How was your grievance resolved?
            </h3>
            <div className="flex gap-6">
              {["resolved", "not-resolved", "partially-resolved"].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="resolution"
                    value={val}
                    checked={resolution === val}
                    onChange={(e) =>
                      setResolution(
                        e.target.value as FeedbackData["resolution"]
                      )
                    }
                    className="w-4 h-4 text-[#235e90] border-[#dddddd] focus:ring-[#235e90]"
                  />
                  <span className="text-sm text-[#48454e]">
                    {val
                      .replace("-", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Satisfaction */}
          <div>
            <h3 className="text-sm font-medium text-[#48454e] mb-3">
              Are you satisfied with the resolution?
            </h3>
            <div className="flex gap-6">
              {["satisfied", "not-satisfied"].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="satisfaction"
                    value={val}
                    checked={satisfaction === val}
                    onChange={(e) =>
                      setSatisfaction(
                        e.target.value as FeedbackData["satisfaction"]
                      )
                    }
                    className="w-4 h-4 text-[#235e90] border-[#dddddd] focus:ring-[#235e90]"
                  />
                  <span className="text-sm text-[#48454e]">
                    {val
                      .replace("-", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <h3 className="text-sm font-medium text-[#48454e] mb-3">
              Enter Remarks
            </h3>
            <Textarea
              placeholder="Write your remarks here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-[100px] border-[#dddddd] focus:border-[#235e90] focus:ring-[#235e90] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-[#dddddd] flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleReopen}
            disabled={!isValid}
            className="border-[#dddddd] text-[#727272] hover:bg-[#f5f7fa] bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reopen
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="bg-[#235e90] hover:bg-[#517f9f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
