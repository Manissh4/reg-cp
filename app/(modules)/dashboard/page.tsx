"use client";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import { GrievanceCard } from "@/components/grievance-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewFeedbackModal } from "@/components/view-feedback";
import { Filter, ListFilter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import AISimilarityAlert from "./aiSmartCheck";
import { AtrFormModal } from "./atrResolution";
import AtrReview from "./reviewATR";

export default function TrackGrievancePage() {
  const [viewFeedbackModalOpen, setViewFeedbackModalOpen] = useState(false);
  const [isAtrOpen, setIsAtrOpen] = useState(false);
  const [isAtrReviewOpen, setAtrReviewOpen] = useState(false);
  const [isAiAlertOpen, setAiAlertOpen] = useState(false);
  const { setHeader } = useHeaderContext();

  const grievancesData = [
    {
      id: "1278901",
      similarityScore: "62% Similarity",
      mismatch: "Subject and Description show moderate differences.",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
    },
    {
      id: "1278904",
      similarityScore: "51% Similarity",
      mismatch: "Subject and Description show moderate differences.",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
    },
  ];

  useEffect(() => {
    setHeader({
      title: "List of Appeal Grievance",
      leftIcon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
            fill="#FF7501"
          />
          <path
            d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
            fill="#FF7501"
          />
          <path
            d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
            fill="#FF7501"
          />
        </svg>
      ),
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);

  const handleViewGrievanceClick = (grievanceId: string) => {
    console.log(grievanceId);
    setViewFeedbackModalOpen(true);
  };
  const grievances = [
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
      feedbackStatus: "Awaited",
      feedbackStatusColor: "orange" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Submitted",
      date: "22 Jul 2024",
      statusColor: "green" as const,
      feedbackStatus: "Awaited",
      feedbackStatusColor: "orange" as const,
    },
  ];

  const sampleFeedbackData = {
    id: "1278901",
    ministry: "Ministry of Finance",
    dateOfResolution: "22 Jul 2024",
    feedbackDate: "17 Aug 2024",
    feedbackStatus: "Submitted",
    satisfactionLevel: "Not Satisfied",
    comments:
      "I am still getting threating calls from the bank and the goons are visiting my home",
  };

  return (
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
            <Button className="bg-[#235e90] hover:bg-[#517f9f] text-white ">
              <Plus className="w-4 h-4 mr-2" />
              Lodge Grievance
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {grievances.map((grievance, index) => (
            <GrievanceCard
              key={index}
              {...grievance}
              reopenedDate="18 Aug 2024"
              remainingDays="26 days"
              buttonOne={{
                label: "View Feedback",
                borderColor: "#FF7501",
                textColor: "#FF7501",
                backgroundColor: "transparent",
              }}
              onButtonOneClick={() => handleViewGrievanceClick(grievance.id)}
              buttonTwo={{
                label: "View ATR",
                borderColor: "#1E3C72",
                textColor: "#1E3C72",
                backgroundColor: "transparent",
              }}
              onButtonTwoClick={() => setIsAtrOpen(true)}
            />
          ))}
        </div>
      </main>
      <ViewFeedbackModal
        isOpen={viewFeedbackModalOpen}
        onClose={() => setViewFeedbackModalOpen(false)}
        grievanceData={sampleFeedbackData}
      />
      <AISimilarityAlert
        isOpen={isAiAlertOpen}
        onClose={() => setAiAlertOpen(false)}
        grievances={grievancesData}
        onProceedAnyway={(ids) => {
          console.log("Proceed anyway for", ids);
          setAiAlertOpen(false);
        }}
        onRemove={(ids) => {
          console.log("Removed grievances:", ids);
          setAiAlertOpen(false);
        }}
      />
      <AtrFormModal open={isAtrOpen} onClose={() => setIsAtrOpen(false)} />
      <AtrReview
        open={isAtrReviewOpen}
        onClose={() => setAtrReviewOpen(false)}
      />
    </div>
  );
}
