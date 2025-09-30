"use client";

import React, { useState } from "react";
import { X, FileText, Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  item: {
    title: string;
    resolved: string;
    template: string;
    description: string;
    attachments?: string[];
  };
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => (
  <div className="rounded-lg overflow-hidden bg-gray-50">
    <button
      onClick={onToggle}
      className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-gray-100 focus:outline-none"
    >
      <span className="font-medium text-gray-900">{item.title}</span>
      <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-900 text-white">
        {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
      </span>
    </button>

    {isOpen && (
      <div className="px-5 pb-6 pt-4 border-t border-gray-200 space-y-4 text-sm text-gray-700">
        <div>
          <span className="text-gray-500">Resolved by</span>
          <div className="font-medium text-gray-900">{item.resolved}</div>
        </div>
        <div>
          <span className="text-gray-500">
            Resolved using loiti compliance?
          </span>
          <div className="font-medium text-gray-900">{item.template}</div>
        </div>
        <div>
          <span className="text-gray-500">Description</span>
          <div className="text-gray-700 leading-relaxed">
            {item.description}
          </div>
        </div>
        {(item.attachments ?? []).length > 0 && (
          <div>
            <span className="text-gray-500 block mb-2">Attachments</span>
            <div className="flex flex-wrap gap-2">
              {(item.attachments ?? []).map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded text-xs text-gray-600 border"
                >
                  <FileText className="w-3 h-3" /> {f}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

interface MeetingProceedingsProps {
  isOpen: boolean;
  onClose: () => void;
  grievances: {
    id: string;
    title: string;
    resolved: string;
    template: string;
    description: string;
    attachments?: string[];
  }[];
}

const MeetingProceedings: React.FC<MeetingProceedingsProps> = ({
  isOpen,
  onClose,
  grievances,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    grievances.map((g) => g.id) // all open initially
  );

  if (!isOpen) return null;

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Proceeding for meeting 1283344
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {grievances?.map((g) => (
            <AccordionItem
              key={g.id}
              item={g}
              isOpen={openIds.includes(g.id)}
              onToggle={() => toggleAccordion(g.id)}
            />
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingProceedings;
