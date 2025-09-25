//// Timeline Component

type Step = {
  label: string;
  status: "completed" | "current" | "upcoming";
  badge?: string;
  badgeColor?: string;
  date?: string;
  time?: string;
};

type TimelineProps = {
  steps: Step[];
};

export function Timeline({ steps }: TimelineProps) {
  const completedSteps = steps.filter((s) => s.status === "completed").length;

  return (
    <div className="w-auto rounded-lg p-6 mt-15">
      <div className="flex justify-between items-start relative gap-x-16">
        <div className="absolute top-20 left-[10%] right-[10%] h-[2px] z-0 bg-gray-200">
          <div
            className="h-[2px] bg-[#3C9718]"
            style={{
              width: `${(completedSteps / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center relative z-10 "
          >
            <div className="h-10 flex items-end mb-6">
              {step.badge && (
                <span
                  className={`flex items-center justify-center rounded-md border px-3 py-1.5 text-sm ${
                    step.badgeColor || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {step.badge}
                </span>
              )}
            </div>

            {/* Step Circle */}
            {step.status === "completed" ? (
              <div className="h-8 w-8 rounded-full bg-[#3C9718] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : step.status === "current" ? (
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center bg-white"
                style={{
                  background:
                    "conic-gradient(#e5e7eb 0% 30%, #3C9718 80% 100%)",
                  padding: "2px",
                }}
              >
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#DDDDDD]"></div>
                </div>
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                <div className="h-2 w-2 rounded-full bg-[#DDDDDD]"></div>
              </div>
            )}

            <p className="mt-2 font-medium text-sm leading-[22px] tracking-wide text-[#212121]">
              {step.label}
            </p>

            {step.date && (
              <p className="text-sm font-normal leading-[20px] tracking-[0.25px] text-[#727272]">
                {step.date}
              </p>
            )}
            {step.time && (
              <p className="text-sm font-normal leading-[20px] tracking-[0.25px] text-[#727272]">
                {step.time}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

    
