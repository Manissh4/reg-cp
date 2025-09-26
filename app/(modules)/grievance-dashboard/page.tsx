"use client";

import Accordion from "@/components/common-accordion";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import DetailedInfoModal from "@/components/DetailedInfoModal";

import {
  Box,
  ChevronLeft,
  FileText,
  Filter,
  ListFilter,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GrievanceCard } from "@/components/grievance-card";
import { CustomInput } from "@/components/ui/custom-input";
import { ForwardGrievanceDialog } from "./Take-up-modal";
import SuccessModal from "@/components/SucessModal";
import { useRouter } from "next/navigation";

export default function NewGrievancePage() {
  const { setHeader } = useHeaderContext();
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false);
  const [showATRModal, setShowATRModal] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setHeader({
      title: "New-Grievance",
      leftIcon: <ChevronLeft className="w-6 h-6 text-orange-600" />,
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);

  const [grievances, setGrievances] = useState<any[]>([
    {
      id: "1278901",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "New",
        date: "22 Jul 2024",
        statusColor: "new",
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
        dateOfResolution: "30 Jul 2024",
        actionsAndRemarks:
          "GRO contacted the issuing authority. Awaiting update.",
        groName: "Arjun Kumar",
        assigneeName: "Suresh Patel",
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
      id: "1278902",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "New",
        date: "22 Jul 2024",
        statusColor: "new",
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
      timeline: [],
      remarks: {},
    },
    {
      id: "1278903",
      info: {
        subject: "Issue regarding Aadhar Card Delay",
        ministry: "Health & Family Welfare",
        category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
        status: "New",
        date: "22 Jul 2024",
        statusColor: "new",
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
      timeline: [],
      remarks: {},
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editableDraft, setEditableDraft] = useState<any | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggleSelect(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      if (checked) {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      } else {
        return prev.filter((x) => x !== id);
      }
    });
  }

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

  const renderSupportingDocs = (
    docs: { fileName: string; fileSize?: string }[],
    onRemove?: (i: number) => void
  ) => (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Additional Documents
      </h4>
      <div className="flex flex-wrap gap-3">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <FileText className="h-5 w-5 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {doc.fileName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const anySelected = selectedIds.length > 0;

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

            <CustomInput
              label="Bulk Action"
              type="buttonDropdown"
              disabled={!anySelected}
              dropdownOptions={[
                { label: "Take-Up", value: "takeup" },
                { label: "Forward", value: "forward" },
                { label: "Work on it", value: "Test" },
              ]}
              onDropdownSelect={(val) => {
                if (val === "forward") {
                  setForwardDialogOpen(true);

                }

                console.log("selected action:", val);
              }}
            />
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
                  showTick={true}
                  checked={selectedIds.includes(grievance.id)}
                  onCheck={(checked) => toggleSelect(grievance.id, checked)}
                />
              ))}
            </div>
          </main>

          {modalOpen && editableDraft && (
            <DetailedInfoModal
              title={`${editableDraft.id}- ${editableDraft.info.subject}`}
              maxWidth="max-w-4xl"
              handleModalClose={closeModal}
              footer={false}
              maxHeight="max-h-[90vh] "
            >
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Grievance Information
                  </h3>
                  <div>
                    <CustomInput
                      label="Take-Up"
                      type="buttonDropdown"
                      dropdownOptions={[
                        { label: "Take-Up", value: "takeup" },
                        { label: "Forward", value: "forward" },
                        { label: "Work on it", value: "Test" },
                        { label: "Resolve", value: "resolve" },
                      ]}
                      onDropdownSelect={(val) => {
                        if (val === "forward") {
                          if (editableDraft?.id) {
                            setForwardDialogOpen(true);
                          } else {
                            console.warn("No grievance selected to forward");
                          }
                          return;
                        } else if (val === "resolve") {
                          setShowATRModal(true);
                        }

                        console.log("selected action:", val);
                      }}
                    />
                  </div>
                </div>
                <div className="border-t border-gray-300 mx-1" />

                <div className="space-y-5 mt-4">
                  {(() => {
                    const info = editableDraft.info ?? {};

                    return (
                      <>
                        {info.subject && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Subject
                            </h4>
                            <p className="text-sm text-gray-900">
                              {info.subject}
                            </p>
                          </div>
                        )}

                        {info.date && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Date of Submission
                            </h4>
                            <p className="text-sm text-gray-900">{info.date}</p>
                          </div>
                        )}

                        {info.ministry && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Ministry / Department
                            </h4>
                            <p className="text-sm text-gray-900">
                              {info.ministry}
                            </p>
                          </div>
                        )}

                        {info.category && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Category
                            </h4>
                            <p className="text-sm text-gray-900">
                              {info.category}
                            </p>
                          </div>
                        )}

                        {info.status && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Grievance Status
                            </h4>
                            <span className="inline-block px-5 py-1 text-xs font-medium border font-heading text-base16  rounded-md opacity-70 bg-[#F4F3F9] text-[#5D3F6A] border-[#938BB6]">
                              {info.status}
                            </span>
                          </div>
                        )}

                        {info.grievanceSummary && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Grievance Summary
                            </h4>
                            <p className="text-sm text-gray-900 leading-relaxed">
                              {info.grievanceSummary}
                            </p>
                          </div>
                        )}

                        {info.estimatedResolution && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Estimated Time Remaining for resolution
                            </h4>
                            <p className="text-sm text-red-600 font-bold">
                              {info.estimatedResolution}
                            </p>
                          </div>
                        )}

                        {info.actionsAndRemarks && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Actions taken for Resolution and Closing Remarks
                            </h4>
                            <p className="text-sm text-gray-900 leading-relaxed">
                              {info.actionsAndRemarks}
                            </p>
                          </div>
                        )}

                        {info.supportingDocuments &&
                          info.supportingDocuments.length > 0 &&
                          renderSupportingDocs(info.supportingDocuments)}
                      </>
                    );
                  })()}
                </div>
              </div>

            </DetailedInfoModal>
          )}

        </div>
        <ForwardGrievanceDialog
          open={forwardDialogOpen}
          onOpenChange={setForwardDialogOpen}
          grievanceId={editableDraft?.id}
          onSuccess={(result) => {
            setGrievances((prev) =>
              prev.map((g) => {
                if (g.id !== editableDraft?.id) return g;
                const copy = JSON.parse(JSON.stringify(g));
                copy.timeline = copy.timeline ?? [];
                copy.timeline.unshift({
                  label: "Forwarded",
                  status: "completed",
                  badge:
                    result.forwardType === "internal"
                      ? "Forwarded (Internal)"
                      : "Forwarded (External)",
                  date: new Date().toLocaleDateString(),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  badgeColor: "bg-blue-100 text-blue-700",
                });
                copy.info.status = "Forwarded";
                copy.info.assignee =
                  result.assignee ?? copy.info.assignee;
                if (result.referenceId) {
                  copy.info.forwardReference = result.referenceId;
                }
                return copy;
              })
            );

            setForwardDialogOpen(false);
          }}
        />{" "}
      </main>
      {showATRModal &&
        <SuccessModal
          title="Start ATR Process"
          titleIcon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 13H12" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 17H16" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          }
          message={`The grievance has been assigned to ${<span className="text-label-dark">Defense</span>} Ministry under ${<span className="text-label-dark">Automobile</span>} Department, and the status is ${<span className="text-label-dark">Under Process.</span>} Do you want to proceed with closure and ATR process?`}
          handleModalClose={() => setShowATRModal(false)}
          ActionButtonText="Yes, Proceed"
          handleAction={() => router.push('/grievance-dashboard/ATR/1')}
          cancelButton
          cancelButtonVariant="dangerSecondary"
          handleCancel={() => setShowATRModal(false)}
        />
      }
    </div>
  );
}
