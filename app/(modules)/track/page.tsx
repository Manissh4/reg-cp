"use client";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import { GrievanceCard } from "@/components/grievance-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Box, Filter, ListFilter, Plus, Search, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import BulkClosureReviewDialog from "./reviewBulkClosure";

export default function TrackGrievancePage() {
  const { setHeader } = useHeaderContext();
  const [isBulkClosureOpen, setIsBulkClosureOpen] = useState(true);

  useEffect(() => {
    setHeader({
      title: "Track Grievance",
      leftIcon: <Box className="w-6 h-6 text-orange-600" />,
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);
  const grievances = [
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Submitted",
      date: "22 Jul 2024",
      statusColor: "green" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Additional Information Requested",
      date: "22 Jul 2024",
      statusColor: "red" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
    },
    {
      id: "1278901",
      subject: "Issue regarding Aadhar Card Delay",
      ministry: "Health & Family Welfare",
      category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
      status: "Under Process",
      date: "22 Jul 2024",
      statusColor: "orange" as const,
    },
  ];

  const demoItems = [
    {
      id: "1278901",
      status: "Closed",
      subject: "Aadhar Card Deactivation - Address mismatch",
      href: "#",
    },
    {
      id: "1278904",
      status: "Closed",
      subject: "Aadhar Card Deactivation - User reported duplicate",
      href: "#",
    },
    {
      id: "1278907",
      status: "Closed",
      subject: "Aadhar Card Deactivation - Verification failed",
      href: "#",
    },
    {
      id: "1278910",
      status: "Closed",
      subject: "Aadhar Card Deactivation - KYC pending review",
      href: "#",
    },
    {
      id: "1278913",
      status: "Closed",
      subject: "Aadhar Card Deactivation - Document unreadable",
      href: "#",
    },
  ];

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
            <GrievanceCard key={index} {...grievance} />
          ))}
        </div>
      </main>
      <BulkClosureReviewDialog
        open={isBulkClosureOpen}
        onOpenChange={setIsBulkClosureOpen}
        groupId="GRP-239871"
        items={demoItems}
        defaultSelectedIds={["1278904"]}
        onConfirm={(ids) => {
          console.log("[v0] Reopen grievances:", ids);
        }}
      />
    </div>
  );
}
