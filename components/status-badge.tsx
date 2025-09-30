import React from "react";

interface StatusBadgeProps {
  status: string;
  variant:
    | "taken-up"
    | "additional-info"
    | "partially-resolved"
    | "pending"
    | "resolved";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "taken-up":
        return "text-[#938BB6] bg-[#F4F3F9] border-[#938BB6]";
      case "additional-info":
        return "text-[#B7131A] bg-[#FFEEEA] border-[#B7131A]";
      case "partially-resolved":
        return "text-[#3C9718] bg-[#EDF7E6] border-[#3C9718]";
      case "pending":
        return "text-[#B77224] bg-[#FEF1E7] border-[#B77224]";
      case "resolved":
        return "text-[#3C9718] bg-[#EDF7E6] border-[#3C9718]";
      default:
        return "text-[#727272] bg-gray-100 border-gray-300";
    }
  };

  return (
    <div
      className={`justify-center items-center border flex gap-1 text-sm font-normal tracking-[0.25px] leading-5 px-3 py-1.5 rounded-lg border-solid ${getVariantStyles()}`}
    >
      <span className="self-stretch my-auto">{status}</span>
    </div>
  );
};

export default StatusBadge;
