"use client";

import Accordion from "@/components/common-accordion";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import DetailedInfoModal from "@/components/DetailedInfoModal";

import { Box, Filter, ListFilter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TrackGrievanceModal } from "./track-grievance-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GrievanceCard } from "@/components/grievance-card";

export default function TrackGrievancePage() {
  const { setHeader } = useHeaderContext();

  useEffect(() => {
    setHeader({
      title: "Track Grievance",
      leftIcon: <Box className="w-6 h-6 text-orange-600" />,
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [grievances, setGrievances] = useState<any[]>([
    {
      id: "1278901",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "In Progress",
        date: "22 Jul 2024",
        statusColor: "orange",
        enrollmentId: "ENR-123456",
        grievanceSummary:
          "I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago. ...",
        estimatedResolution: "2 Days 16 Hrs",
        supportingDocuments: [
          { fileName: "Aadhaar Card.pdf", fileSize: "1.5 MB" },
        ],
        additionalDocuments: [],
        additionalComment: "",
        isUploaded: false,
      },
      timeline: [
        {
          label: "NO",
          status: "completed",
          badge: "Taken Up",
          date: "12 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-blue-100 text-blue-700",
        },
        {
          label: "Grievance Committee",
          status: "completed",
          badge: "Additional Information Requested",
          date: "13 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-red-100 text-red-700",
        },
        {
          label: "GRO",
          status: "completed",
          badge: "Partially Resolved",
          date: "14 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-green-100 text-green-700",
        },
        {
          label: "GRO",
          status: "current",
          badge: "Pending",
          date: "15 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-orange-100 text-orange-700",
        },
      ],
      remarks: {
        byAuthority:
          "I am writing to bring to your attention the undue delay...",
        internalNotes: [
          {
            author: "GRO - Arjun",
            date: "12 Jun 2024",
            note: "Requested supporting doc.",
          },
          {
            author: "Committee",
            date: "13 Jun 2024",
            note: "Escalated to GRO.",
          },
        ],
      },
    },
     {
      id: "1278901",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "In Progress",
        date: "22 Jul 2024",
        statusColor: "orange",
        enrollmentId: "ENR-123456",
        grievanceSummary:
          "I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago. ...",
        estimatedResolution: "2 Days 16 Hrs",
        supportingDocuments: [
          { fileName: "Aadhaar Card.pdf", fileSize: "1.5 MB" },
        ],
        additionalDocuments: [],
        additionalComment: "",
        isUploaded: false,
      },
      timeline: [
        {
          label: "NO",
          status: "completed",
          badge: "Taken Up",
          date: "12 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-blue-100 text-blue-700",
        },
        {
          label: "Grievance Committee",
          status: "completed",
          badge: "Additional Information Requested",
          date: "13 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-red-100 text-red-700",
        },
        {
          label: "GRO",
          status: "completed",
          badge: "Partially Resolved",
          date: "14 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-green-100 text-green-700",
        },
        {
          label: "GRO",
          status: "current",
          badge: "Pending",
          date: "15 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-orange-100 text-orange-700",
        },
      ],
      remarks: {
        byAuthority:
          "I am writing to bring to your attention the undue delay...",
        internalNotes: [
          {
            author: "GRO - Arjun",
            date: "12 Jun 2024",
            note: "Requested supporting doc.",
          },
          {
            author: "Committee",
            date: "13 Jun 2024",
            note: "Escalated to GRO.",
          },
        ],
      },
    }, {
      id: "1278901",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "In Progress",
        date: "22 Jul 2024",
        statusColor: "orange",
        enrollmentId: "ENR-123456",
        grievanceSummary:
          "I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago. ...",
        estimatedResolution: "2 Days 16 Hrs",
        supportingDocuments: [
          { fileName: "Aadhaar Card.pdf", fileSize: "1.5 MB" },
        ],
        additionalDocuments: [],
        additionalComment: "",
        isUploaded: false,
      },
      timeline: [
        {
          label: "NO",
          status: "completed",
          badge: "Taken Up",
          date: "12 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-blue-100 text-blue-700",
        },
        {
          label: "Grievance Committee",
          status: "completed",
          badge: "Additional Information Requested",
          date: "13 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-red-100 text-red-700",
        },
        {
          label: "GRO",
          status: "completed",
          badge: "Partially Resolved",
          date: "14 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-green-100 text-green-700",
        },
        {
          label: "GRO",
          status: "current",
          badge: "Pending",
          date: "15 Jun 2024",
          time: "3:00 pm",
          badgeColor: "bg-orange-100 text-orange-700",
        },
      ],
      remarks: {
        byAuthority:
          "I am writing to bring to your attention the undue delay...",
        internalNotes: [
          {
            author: "GRO - Arjun",
            date: "12 Jun 2024",
            note: "Requested supporting doc.",
          },
          {
            author: "Committee",
            date: "13 Jun 2024",
            note: "Escalated to GRO.",
          },
        ],
      },
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editableDraft, setEditableDraft] = useState<any | null>(null);

  const [trackModalOpen, setTrackModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTrackModalOpen(true);
    }
  }, [isLoggedIn]);

  function openGrievance(g: any) {
    setSelectedId(g.id);
    setEditableDraft(JSON.parse(JSON.stringify(g)));
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setSelectedId(null);
    setEditableDraft(null);
  }

  function handleUpdate() {
    if (!editableDraft) {
      closeModal();
      return;
    }

    const prepared = (() => {
      const d = JSON.parse(JSON.stringify(editableDraft));

      d.info.additionalDocuments = d.info.additionalDocuments ?? [];
      d.info.additionalComment = d.info.additionalComment ?? "";

      d.info.isUploaded = true;

      return d;
    })();

    setGrievances((prev) =>
      prev.map((g) => (g.id === prepared.id ? prepared : g))
    );
    closeModal();
  }

  function handleUpload() {
    if (!editableDraft) return;

    setEditableDraft((d: any) => {
      d.info.supportingDocuments = d.info.supportingDocuments ?? [];
      d.info.additionalDocuments = d.info.additionalDocuments ?? [];

      const pending = d.info.additionalDocuments.map((x: any) => ({
        fileName: x.fileName,
        fileSize: x.fileSize,
        raw: x.raw,
      }));

      d.info.supportingDocuments = [...d.info.supportingDocuments, ...pending];
      d.info.additionalDocuments = [];
      d.info.isUploaded = true;

      return { ...d };
    });
  }
  function handleDraftFileAdd(files: FileList | null) {
    if (!editableDraft || !files) return;
    const arr = Array.from(files).map((f) => ({
      fileName: f.name,
      fileSize: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
      raw: f,
    }));
    setEditableDraft((d: any) => {
      d.info.additionalDocuments = d.info.additionalDocuments ?? [];
      d.info.additionalDocuments = [...d.info.additionalDocuments, ...arr];
      return { ...d };
    });
  }

  function handleDraftFileRemove(index: number) {
    if (!editableDraft) return;
    setEditableDraft((d: any) => {
      d.info.additionalDocuments = d.info.additionalDocuments ?? [];
      d.info.additionalDocuments.splice(index, 1);
      return { ...d };
    });
  }

  function handleDraftCommentChange(val: string) {
    if (!editableDraft) return;
    setEditableDraft((d: any) => {
      d.info.additionalComment = val;
      return { ...d };
    });
  }

  const createAccordionItems = (grievance: any) => {
    const baseItems = [
      {
        id: "grievance-info",
        title: "Grievance Information",
        ...grievance.info,
        type: "info",
      },
    ];

    if (!isLoggedIn) {
      baseItems.push({
        id: "personal-info",
        title: "Personal Information",
        type: "personal",
      });
    }
    if (isLoggedIn) {
      baseItems.push(
        {
          id: "action-timeline",
          title: "Action History Timeline",
          timeline: grievance.timeline,
          type: "timeline",
        },
        {
          id: "remarks",
          title: "Remarks",
          remarks: grievance.remarks,
          type: "remarks",
        },
        {
          id: "additional-info",
          title: "Additional Information",
          type: "additional",
          additionalDocuments: grievance.info.additionalDocuments ?? [],
          additionalComment: grievance.info.additionalComment ?? "",
          isUploaded: grievance.info.isUploaded ?? false,
        }
      );
    }

    return baseItems;
  };

  function handleTrackSubmit({
    grievanceId,
    mobileNumber,
  }: {
    grievanceId: string;
    mobileNumber: string;
  }) {
    const found = grievances.find((g) => g.id === grievanceId);
    if (found) {
      openGrievance(found);
      return;
    }

    const dummy = {
      id: grievanceId,
      info: {
        subject: `Grievance ${grievanceId} (tracked)`,
        ministry: "Unknown / Tracked",
        category: "General",
        status: "Pending",
        date: new Date().toLocaleDateString(),
        statusColor: "orange",
        enrollmentId: `ENR-${Math.floor(Math.random() * 900000 + 100000)}`,
        grievanceSummary: `Grievance tracked by mobile ${mobileNumber}. No details available in demo.`,
        estimatedResolution: "TBD",
        supportingDocuments: [],
        additionalDocuments: [],
        additionalComment: "",
        isUploaded: false,
      },
      timeline: [
        {
          label: "Tracked",
          status: "current",
          badge: "Tracked via portal",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          badgeColor: "bg-orange-100 text-orange-700",
        },
      ],
      remarks: {
        byAuthority: "",
        internalNotes: [],
      },
    };

    setGrievances((prev) => [dummy, ...prev]);
    openGrievance(dummy);
  }

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
          <main className=" ">
            <div className="space-y-4">
              {grievances.map((grievance, index) => (
                <GrievanceCard
                  key={grievance.id + index}
                  id={grievance.id}
                  subject={grievance.info.subject}
                  ministry={grievance.info.ministry}
                  category={grievance.info.category}
                  status={grievance.info.status}
                  date={grievance.info.date}
                  statusColor={grievance.info.statusColor}
                  onView={() => openGrievance(grievance)}
                />
              ))}
            </div>
          </main>

          <TrackGrievanceModal
            open={trackModalOpen}
            onOpenChange={setTrackModalOpen}
            onTrack={handleTrackSubmit}
          />

          {modalOpen && editableDraft && (
            <DetailedInfoModal
              title={`Grievance ${editableDraft.id}`}
              actionButtonText={
                isLoggedIn ? "Update" : "Log in to view all information"
              }
              handleAction={handleUpdate} // commit the draft
              handleModalClose={closeModal}
              cancelButton={true}
              maxWidth="max-w-4xl"
              maxHeight="max-h-[80vh]"
            >
              <div className="space-y-4">
                <Accordion
                  items={createAccordionItems(editableDraft)}
                  defaultOpen={
                    isLoggedIn
                      ? ["grievance-info"]
                      : ["grievance-info", "personal-info"]
                  }
                  allowMultiple={true}
                  additional={{
                    draft: editableDraft,
                    onAddFiles: handleDraftFileAdd,
                    onRemoveFile: handleDraftFileRemove,
                    onCommentChange: handleDraftCommentChange,
                    onUpload: handleUpload,
                  }}
                />
              </div>
            </DetailedInfoModal>
          )}
        </div>
      </main>
    </div>
  );
}
