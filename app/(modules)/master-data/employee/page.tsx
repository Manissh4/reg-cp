"use client";

import { useHeaderContext } from "@/components/Context/useHeaderContext";
import CustomPagination from "@/components/CustomPagination";
import AppTable from "@/components/Table";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import useMaxHeight from "@/hooks/use-maxHeight";
import { cn } from "@/lib/utils";
import { deptCols, deptData } from "@/utils/TableData";
import { Pencil, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {

    const { setHeader } = useHeaderContext();
    const maxHeight = useMaxHeight(220);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const totalPages = Math.ceil(deptData.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const currentRows = deptData.slice(startIdx, startIdx + rowsPerPage);

    useEffect(() => {
        setHeader({
            title: "Employee View",
            leftIcon:
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.0691 8.95005C12.0291 8.95005 11.9691 8.95005 11.9191 8.95005C10.8691 8.91005 10.0391 8.06005 10.0391 7.00005C10.0391 5.92005 10.9091 5.05005 11.9891 5.05005C13.0691 5.05005 13.9391 5.93005 13.9391 7.00005C13.9491 8.06005 13.1191 8.92005 12.0691 8.95005Z" stroke="#FF7501" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.2475 11.9601C7.9175 12.8501 7.9175 14.3001 9.2475 15.1901C10.7575 16.2001 13.2375 16.2001 14.7475 15.1901C16.0775 14.3001 16.0775 12.8501 14.7475 11.9601C13.2375 10.9601 10.7675 10.9601 9.2475 11.9601Z" stroke="#FF7501" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
            className: "bg-neutral-50 shadow-sm",
        });

        return () => setHeader({});
    }, [setHeader]);

    return (
        <div className="w-full h-full bg-[#F4F3F9] p-6 flex flex-col gap-2">
            <div className="w-full bg-white rounded-2xl px-10 pt-4 flex items-center gap-10">
                <div className="flex flex-col items-center gap-3 cursor-pointer">
                    <p>All Employess</p>
                    <div
                        className={cn("bg-[#FF7501] rounded-tl-[12px] rounded-tr-[12px] min-w-36 min-h-1 transition-all")}
                    ></div>
                </div>
            </div>
            {deptCols.length > 0 ?
                <div className="bg-white rounded-2xl flex flex-col">
                    <div className="w-full flex items-center justify-between p-4">
                        <CustomInput
                            type="search"
                            name="search"
                            placeholder="search"
                            containerClassName="w-full max-w-1/3"
                            className="pl-10 pr-4"
                        />
                        <div className="flex items-center gap-4">
                            <CustomButton
                                value="Edit Column"
                                leftIcon={<Pencil className="text-[#FF7501] w-3.5 h-3.5" />}
                                style="py-3 pr-6 pl-4 bg-transparent border-[#DDDDDD]"
                                variant="default"
                            />
                            <CustomButton
                                value="Create Employee"
                                leftIcon={<Plus className="w-4.5 h-4.5" />}
                                style="py-3 pr-6 pl-4"
                            />
                        </div>
                    </div>
                    <div className="">
                        <AppTable
                            columns={deptCols}
                            data={currentRows}
                            menuItems={[
                                { key: 'editDepartment', icon: <Pencil className="w-6 h-6" />, label: 'Edit Department', handleClick: () => { } },
                                { key: 'deactivateDepartment', icon: <Trash className="w-6 h-6" />, label: 'Deactivate Department', variant: 'danger', handleClick: () => { } },
                                { key: 'addCategory', icon: <Plus className="w-6 h-6" />, label: 'Add Category', handleClick: () => { } },
                                { key: 'addEmployee', icon: <Plus className="w-6 h-6" />, label: 'Add Employee', handleClick: () => { }, className: 'border-none' }
                            ]}
                        />
                    </div>
                    <div className="w-full p-2">
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            maxVisiblePages={6}
                            showPrevNext={true}
                        />
                    </div>
                </div>
                :
                <div className={cn("w-full h-full bg-white rounded-2xl flex items-center justify-center", maxHeight)}>
                    <div className="flex flex-col items-center justify-center gap-10">
                        <svg width="129" height="80" viewBox="0 0 129 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_54137_39282)">
                                <rect width="128" height="80" transform="translate(0.5)" fill="white" fill-opacity="0.01" />
                                <path d="M64.5 79.4062C99.8462 79.4062 128.5 73.1847 128.5 65.5101C128.5 57.8355 99.8462 51.614 64.5 51.614C29.1538 51.614 0.5 57.8355 0.5 65.5101C0.5 73.1847 29.1538 79.4062 64.5 79.4062Z" fill="#F5F5F5" />
                                <path d="M110.5 27.3306L90.208 4.49732C89.234 2.94096 87.812 2 86.314 2H42.686C41.188 2 39.766 2.94096 38.792 4.49534L18.5 27.3326V45.6734H110.5V27.3306Z" stroke="#CED4DA" strokeWidth="2" />
                                <path d="M83.726 33.6256C83.726 30.4394 85.714 27.8091 88.18 27.8071H110.5V63.8119C110.5 68.0263 107.86 71.4805 104.6 71.4805H24.4C21.14 71.4805 18.5 68.0243 18.5 63.8119V27.8071H40.82C43.286 27.8071 45.274 30.4335 45.274 33.6197V33.6633C45.274 36.8495 47.284 39.4223 49.748 39.4223H79.252C81.716 39.4223 83.726 36.8257 83.726 33.6395V33.6256V33.6256Z" fill="#FAFAFA" stroke="#CED4DA" strokeWidth="2" />
                            </g>
                            <defs>
                                <clipPath id="clip0_54137_39282">
                                    <rect width="128" height="80" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="flex flex-col">
                            <p className="text-center font-semibold text-base text-label-dark">{`No Employees Found`}</p>
                            <p className="text-base text-text-hint font-normal">Please add a new employee to view related data.</p>
                        </div>
                        <CustomButton
                            value={`Create Employee`}
                            leftIcon={<Plus className="w-4.5 h-4.5" />}
                            style="py-3 pr-6 pl-4"
                        />
                    </div>
                </div>
            }
        </div>
    )
}