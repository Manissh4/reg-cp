export function DecorativeLeftSection() {
  return (
    <div className="flex-1 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] relative overflow-hidden">
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
              <div className="w-5 h-5 bg-green-600 rounded-full"></div>
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-800 leading-tight">NextGen</div>
              <div className="text-lg font-bold text-[#613af5] leading-tight">CPGRAMS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Card with curved line */}
      <div className="absolute top-72 left-16 bg-white rounded-2xl p-4 shadow-2xl w-72 h-44">
        <div className="relative h-full">
          {/* Curved line chart */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 160">
            <path
              d="M20 120 Q80 80 140 90 T260 60"
              stroke="#2dd4bf"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-sm"
            />
            {/* Data points */}
            <circle cx="20" cy="120" r="4" fill="#2dd4bf" />
            <circle cx="80" cy="85" r="4" fill="#2dd4bf" />
            <circle cx="140" cy="90" r="4" fill="#2dd4bf" />
            <circle cx="200" cy="70" r="4" fill="#2dd4bf" />
            <circle cx="260" cy="60" r="4" fill="#2dd4bf" />
          </svg>
          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 3 ? "bg-gray-600" : "bg-gray-300"}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Avatar - positioned more accurately */}
      <div className="absolute top-80 right-24 w-16 h-16 bg-white rounded-full shadow-2xl overflow-hidden border-4 border-white">
        <img src="/professional-indian-man-smiling.png" alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* User Avatar - bottom left */}
      <div className="absolute bottom-32 left-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center">
        <div className="w-8 h-8 bg-[#8b5cf6] rounded-full"></div>
      </div>

      {/* Document Card - better positioning */}
      <div className="absolute bottom-20 left-48 bg-white rounded-xl p-4 shadow-2xl w-52 h-32">
        <div className="space-y-3">
          <div className="h-2 bg-gray-300 rounded w-full"></div>
          <div className="h-2 bg-gray-300 rounded w-4/5"></div>
          <div className="h-2 bg-gray-300 rounded w-3/5"></div>
          <div className="h-2 bg-gray-300 rounded w-4/5"></div>
          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )
}
