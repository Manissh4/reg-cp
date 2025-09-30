import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AgendaForm } from "./agendaSection";
import { ScheduleMeetingForm } from "./scheduleMeetingSection";
import { Separator } from "@/components/ui/separator";
import ReviewMeetingModal from "./reviewMeetingScheduled";
import ReviewMeetingScheduled from "./reviewMeetingScheduled";

interface CreateReviewMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ReviewMeetingAgenda: React.FC<CreateReviewMeetingProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ministry: "",
    feedbackType: "",
    feedbackDuration: "",
    pendencyDuration: "",
    grievanceNumbers: [
      "1278901",
      "1278902",
      "1278903",
      "1278904",
      "1278905",
      "1278937",
    ],
    meetingDate: "",
    chairperson: "",
  });

  const ministryOptions = [
    "Ministry of Health and Family Welfare",
    "Ministry of Education",
    "Ministry of Finance",
    "Ministry of Defense",
    "Ministry of Agriculture",
  ];

  const feedbackTypeOptions = [
    "Both (Resolved and Unresolved)",
    "Performance Review",
    "Policy Feedback",
    "Service Quality",
    "Process Improvement",
  ];

  const durationOptions = [
    "60 minutes",
    "30 minutes",
    "90 minutes",
    "120 minutes",
  ];

  const pendencyOptions = [
    "Last 6 months",
    "Last 3 months",
    "Last 1 month",
    "Last 2 weeks",
  ];

  const chairpersonOptions = [
    "Anmol Sharma",
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
  ];

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      ministry: "",
      feedbackType: "",
      feedbackDuration: "",
      pendencyDuration: "",
      grievanceNumbers: [
        "1278901",
        "1278902",
        "1278903",
        "1278904",
        "1278905",
        "1278937",
      ],
      meetingDate: "",
      chairperson: "",
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    setIsModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Review Meeting Agenda
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <AgendaForm
              formData={formData}
              onFieldChange={handleFieldChange}
              ministryOptions={ministryOptions}
              feedbackTypeOptions={feedbackTypeOptions}
              durationOptions={durationOptions}
              pendencyOptions={pendencyOptions}
            />

            <Separator />

            <ScheduleMeetingForm
              grievanceNumbers={formData.grievanceNumbers}
              meetingDate={formData.meetingDate}
              chairperson={formData.chairperson}
              onFieldChange={handleFieldChange}
              chairpersonOptions={chairpersonOptions}
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#1E3C72] hover:bg-[#1E3C72]/90 text-white"
            >
              Create Review Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ReviewMeetingScheduled
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetingDate="17 Jul 2025"
        chairperson="Secretary"
        grievanceNumbers={[
          "1278901",
          "1278902",
          "1278903",
          "1278904",
          "1278906",
          "1278905",
        ]}
      />
    </>
  );
};
