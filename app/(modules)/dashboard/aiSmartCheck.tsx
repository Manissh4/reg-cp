"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GrievanceData {
  id: string;
  similarityScore: string;
  mismatch: string;
  category: string;
}

interface AISimilarityAlertProps {
  isOpen: boolean;
  onClose: () => void;
  grievances: GrievanceData[];
  onProceedAnyway: (selectedIds: string[]) => void;
  onRemove: (selectedIds: string[]) => void;
}

const AISimilarityAlert: React.FC<AISimilarityAlertProps> = ({
  isOpen,
  onClose,
  grievances,
  onProceedAnyway,
  onRemove,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl mx-auto bg-white">
        <DialogHeader>
          <DialogTitle>AI Similarity Check Alert</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            The system has detected that some of the selected grievances have
            low similarity scores based on AI analysis. Please review the
            details below before proceeding with bulk resolution.
          </p>

          {grievances.map((g) => {
            const isSelected = selectedIds.includes(g.id);
            return (
              <div
                key={g.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    Flagged Grievance
                  </h3>
                  <button
                    onClick={() => toggleSelect(g.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Grievance ID</span>
                    <div className="font-medium">{g.id}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Similarity Score</span>
                    <div className="font-medium">{g.similarityScore}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Mismatch</span>
                    <div className="font-medium">{g.mismatch}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Category</span>
                    <div className="font-medium">{g.category}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex gap-3 pt-4 border-t bg-gray-50">
          <Button
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => onProceedAnyway(selectedIds)}
            disabled={selectedIds.length === 0} // disable if nothing selected
          >
            Proceed Anyway
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onRemove(selectedIds)}
            disabled={selectedIds.length === 0} // disable if nothing selected
          >
            Remove Selected Grievance(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AISimilarityAlert;
