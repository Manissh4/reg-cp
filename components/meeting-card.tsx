import React from "react";

interface MeetingCardProps {
  meetingId: string;
  chairperson: string;
  dateOfMeeting: string;
  ministry: string;
  grievancesAddressed: string;
  onEditAgenda?: () => void;
  onRecordOutcome?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meetingId,
  chairperson,
  dateOfMeeting,
  ministry,
  grievancesAddressed,
  onEditAgenda,
  onRecordOutcome,
}) => {
  return (
    <article className="w-full h-[152px] border bg-white rounded-2xl border-solid border-[#DDD] relative p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="flex flex-col gap-1">
          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
            Meeting ID
          </div>
          <div className="overflow-hidden text-[#FF7501] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] underline decoration-solid decoration-auto underline-offset-auto">
            {meetingId}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
            Meetings' Chairperson
          </div>
          <div className="overflow-hidden text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px]">
            {chairperson}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
            Date of Meeting
          </div>
          <div className="overflow-hidden text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px]">
            {dateOfMeeting}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
            Ministry/Department
          </div>
          <div className="overflow-hidden text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px]">
            {ministry}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
            Grievances Addressed
          </div>
          <div className="overflow-hidden text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px]">
            {grievancesAddressed}
          </div>
        </div>

        <div className="flex items-center gap-6 justify-end">
          <button
            onClick={onEditAgenda}
            className="flex h-12 justify-center items-center gap-2 px-0 py-4 rounded-lg bg-transparent border-none cursor-pointer"
          >
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg style="display: flex; width: 18px; height: 18px; justify-content: center; align-items: center;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.94745 4.07931L3.78995 10.5968C3.55745 10.8443 3.33245 11.3318 3.28745 11.6693L3.00995 14.0993C2.91245 14.9768 3.54245 15.5768 4.41245 15.4268L6.82745 15.0143C7.16495 14.9543 7.63745 14.7068 7.86995 14.4518L14.0275 7.93431C15.0925 6.80931 15.5725 5.52681 13.915 3.95931C12.265 2.40681 11.0125 2.95431 9.94745 4.07931Z" stroke="#FF7501" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.92188 5.16699C9.24437 7.23699 10.9244 8.81949 13.0094 9.02949L8.92188 5.16699Z" fill="#FF7501"></path><path d="M8.92188 5.16699C9.24437 7.23699 10.9244 8.81949 13.0094 9.02949" stroke="#FF7501" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                }}
              />
            </div>
            <div className="text-[#FF7501] text-center text-sm font-medium leading-5 tracking-[0.1px]">
              Edit Agenda
            </div>
          </button>

          <button
            onClick={onRecordOutcome}
            className="flex h-12 justify-center items-center gap-2 border p-4 rounded-lg border-solid border-[#1E3C72] bg-transparent cursor-pointer"
          >
            <div className="text-center text-sm font-medium leading-5 tracking-[0.1px] text-[#1E3C72]">
              Record Outcome
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg style="width: 18px; height: 18px;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_55971_32562)"><path d="M5.53438 15.7571C5.90188 16.1246 6.49438 16.1246 6.86188 15.7571L13.0944 9.52461C13.3869 9.23211 13.3869 8.75961 13.0944 8.46711L6.86188 2.23461C6.49438 1.86711 5.90188 1.86711 5.53438 2.23461C5.16688 2.60211 5.16688 3.19461 5.53438 3.56211L10.9644 8.99961L5.52688 14.4371C5.16688 14.7971 5.16688 15.3971 5.53438 15.7571Z" fill="url(#paint0_linear_55971_32562)"></path></g><defs><linearGradient id="paint0_linear_55971_32562" x1="5.25781" y1="8.99586" x2="13.3138" y2="8.99586" gradientUnits="userSpaceOnUse"><stop stop-color="#1E3C72"></stop><stop offset="0.01" stop-color="#1E3C72"></stop><stop offset="1" stop-color="#2A5298"></stop></linearGradient><clipPath id="clip0_55971_32562"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>',
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </article>
  );
};

export default MeetingCard;
