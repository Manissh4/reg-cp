import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    showPrevNext?: boolean;
    className?: string;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 6,
    showPrevNext = true,
    className = ""
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        handlePageChange(Math.max(1, currentPage - 1));
    };

    const handleNext = () => {
        handlePageChange(Math.min(totalPages, currentPage + 1));
    };

    const generatePaginationItems = () => {
        const pages = [];

        if (totalPages <= maxVisiblePages + 1) {
            // Show all pages if total pages is small enough
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === i}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            size={'sm'}
                            className="py-1.5 px-2"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Show max pages with sliding window + ellipsis + last page
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

            // Adjust start page if we're near the end
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            // Always show exactly maxVisiblePages pages before ellipsis (unless we're at the very end)
            endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

            // Add the pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === i}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            size={'sm'}
                            className="py-1.5 px-2"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            // Add ellipsis if there's a gap to the last page
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="ellipsis">
                        <span className="px-3 py-2 text-sm text-gray-500">...</span>
                    </PaginationItem>
                );
            }

            // Always show the last page (unless it's already shown)
            if (endPage < totalPages) {
                pages.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === totalPages}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(totalPages);
                            }}
                            size={'sm'}
                            className="py-1.5 px-2"
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null; // Don't show pagination if there's only one page or no pages
    }

    return (
        <Pagination className="w-full flex justify-end">
            <PaginationContent>
                {showPrevNext && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePrevious();
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                )}

                {generatePaginationItems()}

                {showPrevNext && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNext();
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;