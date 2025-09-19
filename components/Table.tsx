import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

type TableProps = {
    columns: { key: string; label: string }[];
    data: Record<string, any>[];
};

export const AppTable: React.FC<TableProps> = ({ columns, data }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const allSelected = selected.length === data.length && data.length > 0;

    const toggleSelectAll = () => {
        setSelected(allSelected ? [] : data.map((_, idx) => idx));
    };

    const toggleSelectRow = (idx: number) => {
        setSelected(selected.includes(idx) ? selected.filter(i => i !== idx) : [...selected, idx]);
    };

    return (
        <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left bg-[#EEF1F6] text-base text-label-dark">
                    <tr>
                        <th className="p-3">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleSelectAll}
                                className="cursor-pointer w-4 h-4 accent-[#613AF5] border-[#868686]"
                            />
                        </th>
                        <th style={{ width: "16px" }} />
                        {columns.map(col => (
                            <th key={col.key} className="p-3 font-medium text-base">{col.label}</th>
                        ))}
                        <th className="p-3" />
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td className="p-3 border-b border-[#DDDDDD]">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(idx)}
                                    onChange={() => toggleSelectRow(idx)}
                                    className="cursor-pointer w-4 h-4 accent-[#613AF5] border-[#868686]"
                                />
                            </td>
                            <td className="min-w-4 border-b border-[#DDDDDD]" />
                            {columns.map(col => (
                                <td key={col.key} className="p-3 border-b border-[#DDDDDD] font-normal text-sm">
                                    {col.key === "status" ? (
                                        <span className="flex items-center gap-2">
                                            <span
                                                className={`inline-block w-3 h-3 rounded-full ${row[col.key] === "Active" ? "bg-success" : "bg-error"
                                                    }`}
                                            ></span>
                                            {row[col.key]}
                                        </span>
                                    ) : (
                                        row[col.key]
                                    )}
                                </td>
                            ))}
                            <td className="p-3 border-b border-[#DDDDDD]">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <MoreVertical size={18} className="text-[#405261] cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-72 px-0 py-2 rounded-[16px]">
                                        <div className="flex flex-col gap-4">
                                            <div className="border-b border-[#DDDDDD] py-2 pl-4 pr-6 flex items-center gap-4 cursor-pointer">
                                                <Image src='/edit.png' alt="edit" width={24} height={24} />
                                                <p className="font-medium text-base text-label-dark">Edit Department</p>
                                            </div>
                                            <div className="border-b border-[#DDDDDD] py-2 pl-4 pr-6 flex items-center gap-4 cursor-pointer text-error">
                                                <Image src='/trash.png' alt="edit" width={24} height={24} />
                                                <p className="font-medium text-base">Deactivate Department</p>
                                            </div>
                                            <div className="border-b border-[#DDDDDD] py-2 pl-4 pr-6 flex items-center gap-4 cursor-pointer">
                                                <GoPlus className="text-label-dark" size={24} />
                                                <p className="font-medium text-base text-label-dark">Add Category</p>
                                            </div>
                                            <div className="py-2 pl-4 pr-6 flex items-center gap-4 cursor-pointer">
                                                <GoPlus size={24} className="text-label-dark" />
                                                <p className="font-medium text-base text-label-dark">Add Employee</p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppTable;