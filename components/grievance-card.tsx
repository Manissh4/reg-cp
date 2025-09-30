"use client";

import { Button } from "@/components/ui/button";

interface GrievanceCardProps {
  id: string;
  subject: string;
  ministry: string;
  category: string;
  date: string;
  status: string;
  statusColor: "orange" | "green" | "red";
  feedbackStatus?: string;
  feedbackStatusColor?: "orange" | "green" | "red";
  reopenedDate?: string;
  remainingDays?: string;
  buttonOne?: {
    label: string;
    borderColor?: string;
    textColor?: string;
    backgroundColor?: string;
  };
  onButtonOneClick?: () => void;
  buttonTwo?: {
    label: string;
    borderColor?: string;
    textColor?: string;
    backgroundColor?: string;
  };
  onButtonTwoClick?: () => void;
}

export function GrievanceCard({
  id,
  subject,
  ministry,
  category,
  status,
  date,
  statusColor,
  feedbackStatus,
  feedbackStatusColor,
  reopenedDate,
  remainingDays,
  buttonOne,
  onButtonOneClick,
  onButtonTwoClick,
  buttonTwo,
}: GrievanceCardProps) {
  const borderColors = {
    orange: "border-l-[#ff7501]",
    green: "border-l-[#3c9718]",
    red: "border-l-[#b7131a]",
  };

  const statusColors = {
    orange: "bg-[#fef1e7] text-[#b77224] border-[#ff7501]",
    green: "bg-[#edf7e6] text-[#3c9718] border-[#3c9718]",
    red: "bg-[#ffeeea] text-[#b7131a] border-[#b7131a]",
  };

  return (
    <div
      className={`bg-white rounded-lg border border-[#dddddd] border-l-4 ${borderColors[statusColor]} p-6 mb-4`}
    >
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance ID</div>
            <div className="inline-block relative">
              <span className="text-[#ff7501] font-semibold relative z-10 px-1 bg-white">
                {id}
              </span>
              <div className="absolute left-0 right-0 bottom-0 border-b border-[#ff7501]" />
            </div>
          </div>

          <div>
            <div className="text-xs text-[#727272] mb-1">
              Ministry/Department
            </div>
            <div className="text-[#48454e] font-medium font-heading text-base16">
              {ministry}
            </div>
          </div>

          {reopenedDate && (
            <div>
              <div className="text-xs text-[#727272] mb-1">Reopened Date</div>
              <div className="text-[#48454e] font-medium font-heading text-base16">
                {reopenedDate}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1 w-fit">
            <span className="block text-[#727272] text-sm font-normal leading-5">
              Grievance Status
            </span>
            <span
              className={`inline-block rounded-md border px-4 py-1.5 text-sm font-normal leading-5  ${statusColors[statusColor]}`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance Subject</div>
            <div className="text-[#48454e] font-medium font-heading text-base16">
              {subject}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#727272] mb-1">Category</div>
            <div className="text-[#48454e] font-heading text-base16">
              {category}
            </div>
          </div>
          {remainingDays && (
            <div>
              <div className="text-xs text-[#727272] mb-1">
                Remaining days for action
              </div>
              <div className="text-[#48454e] font-medium font-heading text-base16">
                {remainingDays}
              </div>
            </div>
          )}
          {feedbackStatus && (
            <div className="flex flex-col gap-1 w-fit">
              <span className="block text-[#727272] text-sm font-normal leading-5">
                Feedback Status
              </span>
              <span
                className={`inline-block rounded-md border px-4 py-1.5 text-sm font-normal leading-5  ${
                  feedbackStatusColor ? statusColors[feedbackStatusColor] : ""
                }`}
              >
                {feedbackStatus}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="text-right">
            <div className="text-xs text-[#727272] mb-1">
              Date of Submission
            </div>
            <div className="text-[#48454e] font-medium">{date}</div>
          </div>
          <div className="flex gap-2">
            {buttonOne && (
              <Button
                variant="outline"
                style={{
                  borderColor: buttonOne.borderColor,
                  color: buttonOne.textColor,
                  backgroundColor: buttonOne.backgroundColor,
                }}
                onClick={onButtonOneClick}
              >
                {buttonOne.label}
              </Button>
            )}

            {buttonTwo && (
              <Button
                variant="outline"
                style={{
                  borderColor: buttonTwo.borderColor,
                  color: buttonTwo.textColor,
                  backgroundColor: buttonTwo.backgroundColor,
                }}
                onClick={onButtonTwoClick}
              >
                {buttonTwo.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
