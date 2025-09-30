import React from "react";

interface Document {
  id: string;
  name: string;
}

interface DocumentListProps {
  title: string;
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ title, documents }) => {
  return (
    <div className="text-sm font-normal tracking-[0.25px] leading-none">
      <div className="text-[#727272] text-sm leading-5 tracking-[0.25px]">
        {title}
      </div>
      <div className="flex w-full gap-4 text-[#212121] flex-wrap mt-1">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="items-center border flex min-h-[43px] gap-3 overflow-hidden bg-white pl-4 pr-6 py-0 rounded-lg border-solid border-[#C6C6C6] max-md:pr-5"
          >
            <div className="self-stretch flex w-[19px] shrink-0 h-[19px] my-auto">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M4 2h8l3 3v11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M12 2v3h3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <div className="text-[#212121] text-ellipsis text-sm leading-5 tracking-[0.25px] self-stretch my-auto">
              {doc.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
