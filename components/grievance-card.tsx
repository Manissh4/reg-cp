import { Button } from "@/components/ui/button";

interface GrievanceCardProps {
  id: string;
  subject: string;
  ministry: string;
  category: string;
  status: string;
  date: string;
  statusColor: "orange" | "green" | "red";
}

export function GrievanceCard({
  id,
  subject,
  ministry,
  category,
  status,
  date,
  statusColor,
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
            <div className="text-[#48454e] font-medium font-heading text-base16">{ministry}</div>
          </div>
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance Status</div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border font-heading text-base16 ${statusColors[statusColor]}`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-[#727272] mb-1">Grievance Subject</div>
            <div className="text-[#48454e] font-medium font-heading text-base16">{subject}</div>
          </div>
          <div>
            <div className="text-xs text-[#727272] mb-1">Category</div>
            <div className="text-[#48454e]  font-heading text-base16">{category}</div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="text-right">
            <div className="text-xs text-[#727272] mb-1">
              Date of Submission
            </div>
            <div className="text-[#48454e] font-medium">{date}</div>
          </div>
          <Button
            variant="outline"
            className="border-[#235e90] text-[#235e90] hover:bg-[#235e90] hover:text-white bg-transparent"
          >
            View Grievance
          </Button>
        </div>
      </div>
    </div>
  );
}
