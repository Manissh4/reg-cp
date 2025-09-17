import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function GrievanceCard({
  grievanceId,
  grievanceSubject,
  dateOfSubmission,
  ministry,
  category,
  status,
  feedbackStatus,
  viewLink,
  feedbackLink,
  buttonStatus,
}: {
  grievanceId: string;
  grievanceSubject: string;
  dateOfSubmission: string;
  ministry: string;
  category: string;
  status: string;
  feedbackStatus?: string;
  viewLink: string;
  feedbackLink: string;
  buttonStatus: string;
}) {
  const cardColors: Record<string, string> = {
    New: "bg-[#3C9718]",
    Resolved: "bg-[#3C9718]",
  };

  const statusColors: Record<string, string> = {
    Resolved: "bg-[#EDF7E6] text-[#3C9718] border-[#3C9718]",
  };

  const feedbackColors: Record<string, string> = {
    Awaited: "bg-[#FEF1E7] text-[#B77224] border-[#B77224]",
  };

  const buttonStatusColors: Record<string, string> = {
    Primary: "border-[#3C9718] text-[#3C9718]",
    Secondary: "border-[#FF7501] text-[#FF7501]",
  };

  return (
    <div className="relative flex flex-col  rounded-xl border-t border-r border-b border-[#E0E0E0] bg-white p-4 my-4">
      <div
        className={`absolute top-0 left-0 h-full w-2 rounded-l-xl ${cardColors[status]}`}
      ></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ml-2 ">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[#727272] text-sm font-normal leading-5">
              Grievance ID
            </span>
            <Link
              href={`/grievance/${grievanceId}`}
              className="text-[#FF7501] font-medium text-base underline"
            >
              {grievanceId}
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#727272] text-sm font-normal leading-5">
              Ministry/Department
            </span>
            <p className="text-[#212121] font-medium text-base leading-6">
              {ministry}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-1">
            <span className="text-[#727272] text-sm font-normal leading-5">
              Grievance Subject
            </span>
            <p className="text-[#212121] font-medium text-base leading-6 line-clamp-1">
              {grievanceSubject}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#727272] text-sm font-normal leading-5">
              Category
            </span>
            <p className="text-[#212121] font-medium text-base leading-6">
              {category}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[#727272] text-sm font-normal leading-5">
              Date of Submission
            </span>
            <p className="text-[#212121] font-medium text-base leading-6">
              {dateOfSubmission}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-4 sm:grid-cols-3 ml-2">
        <div className="flex flex-col gap-1 w-fit">
          <span className="block text-[#727272] text-sm font-normal leading-5">
            Grievance Status
          </span>
          <span
            className={`inline-block rounded-md border px-4 py-1.5 text-sm font-normal leading-5  ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-fit">
          {feedbackStatus && (
            <>
              <span className="block text-[#727272] text-sm font-normal leading-5">
                Feedback Status
              </span>
              <span
                className={`inline-block rounded-md border px-4 py-1.5 text-sm font-normal leading-5  ${feedbackColors[feedbackStatus]}`}
              >
                {feedbackStatus}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end items-end sm:justify-self-end">
          {feedbackStatus && (
            <Button
              asChild
              className="bg-[linear-gradient(90deg,#1E3C72_0%,#1E3C72_1%,#2A5298_100%)] 
             text-white text-base font-medium leading-6 px-3 py-2"
            >
              <Link href={feedbackLink}>
                Provide Feedback
                <Image src="/icon.svg" alt="Feedback" width={18} height={18} />
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            className={`border text-base font-medium leading-6 px-3 py-2 ${buttonStatusColors[buttonStatus]}`}
          >
            <Link href={viewLink}>
              View Grievance
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_55282_23213)">
                  <path
                    d="M5.53511 15.7571C5.90261 16.1246 6.49511 16.1246 6.86261 15.7571L13.0951 9.52461C13.3876 9.23211 13.3876 8.75961 13.0951 8.46711L6.86261 2.23461C6.49511 1.86711 5.90261 1.86711 5.53511 2.23461C5.16761 2.60211 5.16761 3.19461 5.53511 3.56211L10.9651 8.99961L5.52761 14.4371C5.16761 14.7971 5.16761 15.3971 5.53511 15.7571Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_55282_23213">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
