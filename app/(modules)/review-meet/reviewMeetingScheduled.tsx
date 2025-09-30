import { FaCheckCircle } from "react-icons/fa";
import SuccessModal from "@/components/SucessModal";

interface ReviewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingDate: string;
  grievanceNumbers: string[];
  chairperson: string;
}

export default function ReviewMeetingScheduled({
  isOpen,
  onClose,
  meetingDate,
  grievanceNumbers,
  chairperson,
}: ReviewMeetingModalProps) {
  if (!isOpen) return null;

  return (
    <SuccessModal
      handleCancel={undefined}
      handleAction={onClose}
      handleModalClose={onClose}
      title="Review Meeting Scheduled"
      titleIcon={<FaCheckCircle className="text-green-600 w-5 h-5" />}
      message={
        <>
          <p className="mb-3">
            A review meeting has been scheduled under the chairmanship of{" "}
            <span className="font-medium">{chairperson}</span> on{" "}
            <span className="font-medium">{meetingDate}</span>.
          </p>
          <p className="mb-2">
            The following grievance(s) are selected for the review meeting:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {grievanceNumbers.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </>
      }
      ActionButtonText="Close"
      cancelButton={false}
      actionButtonVariant="primary"
    />
  );
}
