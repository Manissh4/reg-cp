import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface GrievanceCardProps {
  id: string;
  subject: string;
  ministry: string;
  category: string;
  status: string;
  date: string;
  statusColor: "orange" | "green" | "red" | "new";
  onView?: () => void;
  showTick?: boolean;
  checked?: boolean;
  onCheck?: (checked: boolean) => void; 
}

export function GrievanceCard({
  id,
  subject,
  ministry,
  category,
  status,
  date,
  statusColor,
  onView,
  showTick = false,
  checked,
  onCheck,
}: GrievanceCardProps) {
  // local internal state for uncontrolled usage (fallback)
  const [internalChecked, setInternalChecked] = useState<boolean>(!!checked);

  // if parent controls checked via prop, prefer that; keep internal in sync when prop changes
  useEffect(() => {
    if (typeof checked === "boolean") {
      setInternalChecked(checked);
    }
  }, [checked]);

  // effective checked
  const isChecked = typeof checked === "boolean" ? checked : internalChecked;

  const handleToggle = (next: boolean) => {
    // if parent didn't control it, update local state
    if (typeof checked !== "boolean") {
      setInternalChecked(next);
    }
    // inform parent
    onCheck && onCheck(next);
  };

  const borderColors = {
    orange: "border-l-[#ff7501]",
    green: "border-l-[#3c9718]",
    red: "border-l-[#b7131a]",
    new: "border-l-[#938BB6]",
  };

  const statusColors = {
    orange: "bg-[#fef1e7] text-[#b77224] border-[#ff7501]",
    green: "bg-[#edf7e6] text-[#3c9718] border-[#3c9718]",
    red: "bg-[#ffeeea] text-[#b7131a] border-[#b7131a]",
    new: "bg-[#F4F3F9] text-[#5D3F6A] border-[#938BB6]",
  };

  return (
    <div
      className={`relative bg-white rounded-lg border border-[#dddddd] border-l-4 ${borderColors[statusColor]} p-6 mb-4`}
    >
      {showTick && (
        <div className="absolute top-3 right-3">
          <Checkbox
            className="w-5 h-5 rounded-sm border border-[#cfcfcf] bg-white hover:shadow-sm focus:outline-none data-[state=checked]:bg-blue-900 data-[state=checked]:text-white"
            checked={isChecked}
            onCheckedChange={(val: boolean | "indeterminate") => {
              const b = typeof val === "boolean" ? val : false;
              handleToggle(b);
            }}
            aria-pressed={isChecked}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <div>
              <div className="text-xs text-[#727272] mb-1 ">Grievance ID</div>
              <div className="inline-block relative">
                <span className="text-[#ff7501] font-semibold relative z-10 px-1 bg-white">
                  {id}
                </span>
                <div className="absolute left-0 right-0 bottom-0 border-b border-[#ff7501]" />
              </div>
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
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance Status</div>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium border font-heading text-base16 ${
                showTick ? "rounded-md opacity-70" : "rounded-full"
              } ${statusColors[statusColor]}`}
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
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className={`text-right ${showTick ? "pr-18" : ""}`}>
            <div className="text-xs text-[#727272] mb-1">
              Date of Submission
            </div>
            <div className="text-[#48454e] font-medium">{date}</div>
          </div>
          <Button
            variant="outline"
            className="border-[#235e90] text-[#235e90] hover:bg-[#235e90] hover:text-white bg-transparent"
            onClick={() => onView && onView()}
          >
            View Grievance
          </Button>
        </div>
      </div>
    </div>
  );
}
