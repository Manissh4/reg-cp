"use client";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import MeetingCard from "@/components/meeting-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, ListFilter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateReviewMeetingModal } from "./createMeetingModal";
import { ReviewMeetingAgenda } from "./reviewMeetingAgenda";
import { EditReviewMeetingModal } from "./editReviewMeetingModal";
import { ReviewMeetingDetailsModal } from "./reviewMeetingDetailsModal";
import { RecordProceeding } from "./recordProceedings";
import MeetingProceedings from "./viewProceedings";

export default function ResolvedGrievancePage() {
  const { setHeader } = useHeaderContext();
  const [activeTab, setActiveTab] = useState("Scheduled Meetings");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [reviewMeetingAgenda, setReviewMeetingAgenda] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [proceedingModalOpen, setProceedingModalOpen] = useState(false);
  const [viewProceedingsModalOpen, setViewProceedingsModalOpen] =
    useState(false);

  const handleCreateSubmit = (data: any) => {
    setCreateModalOpen(false);
  };

  const handleReviewMeetingAgenda = (data: any) => {
    setReviewMeetingAgenda(false);
  };

  const handleEditSubmit = (data: any) => {
    setEditModalOpen(false);
  };

  useEffect(() => {
    setHeader({
      title: "Review Meetings",
      leftIcon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.9981 14.6297C11.9381 14.6197 11.8681 14.6197 11.8081 14.6297C10.4281 14.5797 9.32812 13.4497 9.32812 12.0497C9.32812 10.6197 10.4781 9.46973 11.9081 9.46973C13.3381 9.46973 14.4881 10.6297 14.4881 12.0497C14.4781 13.4497 13.3781 14.5897 11.9981 14.6297Z"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.08875 17.7794C7.67875 18.7194 7.67875 20.2594 9.08875 21.1994C10.6888 22.2694 13.3087 22.2694 14.9087 21.1994C16.3187 20.2594 16.3187 18.7194 14.9087 17.7794C13.3187 16.7194 10.6888 16.7194 9.08875 17.7794Z"
            stroke="#FF7501"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);

  const tabs = [
    "Scheduled Meetings",
    "Concluded Meetings",
    "Proceeding Recorded",
    "Cancelled Meetings",
  ];

  const handleEditAgenda = (meetingId: string) => {
    console.log("Edit agenda for meeting:", meetingId);
  };

  const handleRecordOutcome = (meetingId: string) => {
    console.log("Record outcome for meeting:", meetingId);
  };

  const meetings = [
    {
      meetingId: "1278901",
      chairperson: "Secretary",
      dateOfMeeting: "17 Jul 2025",
      ministry: "Health & Family Welfare",
      grievancesAddressed: "1278901, 1278902, 1278903, 1278904",
    },
    {
      meetingId: "1278902",
      chairperson: "Secretary",
      dateOfMeeting: "17 Jul 2025",
      ministry: "Health & Family Welfare",
      grievancesAddressed: "1278901, 1278902, 1278903, 1278904",
    },
    {
      meetingId: "1278903",
      chairperson: "Secretary",
      dateOfMeeting: "17 Jul 2025",
      ministry: "Health & Family Welfare",
      grievancesAddressed: "1278901, 1278902, 1278903, 1278904",
    },
  ];

  const grievancesData = [
    {
      id: "GR-1",
      title: "Issue regarding aadhar card delay",
      resolved: "Mahone Sahoo",
      template: "Yes",
      description: "Lorem ipsum dolor sit amet...",
      attachments: ["file1.jpg", "file2.jpg"],
    },
    {
      id: "GR-2",
      title: "Delay in passport processing",
      resolved: "Rina Das",
      template: "No",
      description: "Short description here.",
      attachments: ["passport.jpg"],
    },
  ];

  return (
    <>
      <div className="p-6 bg-gray-100">
        <div className="w-full h-14">
          <div className="flex items-center w-full h-14 bg-white pl-10 pr-4 pt-4 pb-0 rounded-2xl">
            <div className="flex items-start gap-10 flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex flex-col items-center gap-3 bg-transparent border-none cursor-pointer ${
                    activeTab === tab ? "text-black" : "text-black"
                  }`}
                >
                  <div className="text-black text-center text-base font-normal leading-6 tracking-[0.5px]">
                    {tab}
                  </div>
                  {activeTab === tab && (
                    <div className="w-[193px] h-1 bg-[#FF7501] rounded-[12px_12px_0_0]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-100">
        <main className="flex-1 p-6 bg-[#FFFFFF] border rounded-2xl ">
          <div className="mb-6 flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#727272] w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-white border-[#dddddd]"
              />
            </div>

            <div className="flex items-center gap-4 ml-4 ">
              <Button
                variant="outline"
                className="border-[#dddddd] text-[#727272] hover:bg-[#f5f7fa] bg-transparent font-heading text-base16"
              >
                <ListFilter className="w-4 h-4 mr-2 text-orange-500" />
                Sort
              </Button>
              <Button
                variant="outline"
                className="border-[#dddddd] text-[#727272] hover:bg-[#f5f7fa] bg-transparent font-heading text-base16"
              >
                <Filter className="w-4 h-4 mr-2 text-orange-500" />
                Filter
              </Button>
              <Button
                className="bg-[#235e90] hover:bg-[#517f9f] text-white "
                onClick={() => setCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Review Meeting
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-6">
              {meetings.map((meeting) => (
                <MeetingCard
                  key={meeting.meetingId}
                  meetingId={meeting.meetingId}
                  chairperson={meeting.chairperson}
                  dateOfMeeting={meeting.dateOfMeeting}
                  ministry={meeting.ministry}
                  grievancesAddressed={meeting.grievancesAddressed}
                  onEditAgenda={() => handleEditAgenda(meeting.meetingId)}
                  onRecordOutcome={() => handleRecordOutcome(meeting.meetingId)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <CreateReviewMeetingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <ReviewMeetingAgenda
        isOpen={reviewMeetingAgenda}
        onClose={() => setReviewMeetingAgenda(false)}
        onSubmit={handleReviewMeetingAgenda}
      />

      <EditReviewMeetingModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <ReviewMeetingDetailsModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        meetingNumber={"1278901"}
        meetingDate={"17 Jul 2025"}
        chairpersonName={"Secretary"}
      />

      <RecordProceeding
        open={proceedingModalOpen}
        onClose={() => setProceedingModalOpen(false)}
      />

      <MeetingProceedings
        isOpen={viewProceedingsModalOpen}
        onClose={() => setViewProceedingsModalOpen(false)}
        grievances={grievancesData}
      />
    </>
  );
}
