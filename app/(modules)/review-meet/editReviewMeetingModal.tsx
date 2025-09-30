import React, { useState } from "react";
import { X } from "lucide-react";
import SuccessModal from "@/components/SucessModal";
import { AgendaForm } from "./agendaSection";
import { ScheduleMeetingForm } from "./scheduleMeetingSection";

interface CreateReviewMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const EditReviewMeetingModal: React.FC<CreateReviewMeetingProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
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
  const [isCancelOpen, setIsCancelOpen] = useState(false);

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
    setIsCancelOpen(true);
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
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        {/* Modal Content */}
        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-bold">Edit - Review Meeting Agenda</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-6 py-6">
            <AgendaForm
              formData={formData}
              onFieldChange={handleFieldChange}
              ministryOptions={ministryOptions}
              feedbackTypeOptions={feedbackTypeOptions}
              durationOptions={durationOptions}
              pendencyOptions={pendencyOptions}
            />

            <div className="border-t" />

            <ScheduleMeetingForm
              grievanceNumbers={formData.grievanceNumbers}
              meetingDate={formData.meetingDate}
              chairperson={formData.chairperson}
              onFieldChange={handleFieldChange}
              chairpersonOptions={chairpersonOptions}
              scheduledDate="2024-09-15"
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end border-t pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50"
            >
              Cancel Meeting
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#1E3C72] hover:bg-[#1E3C72]/90 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {isCancelOpen && (
        <SuccessModal
          handleModalClose={() => setIsCancelOpen(false)}
          handleCancel={() => setIsCancelOpen(false)}
          handleAction={() => {
            console.log("Meeting cancelled");
            setIsCancelOpen(false);
          }}
          title="Cancel the Meeting"
          message="Are you sure you want to cancel this meeting?"
          ActionButtonText="Yes"
          cancelButton
          cancelButtonText="No"
          titleIcon={<X className="text-red-600 w-5 h-5" />}
          actionButtonVariant="primary"
          cancelButtonVariant="danger"
        />
      )}
    </>
  );
};
