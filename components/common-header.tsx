export function CommonHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 relative overflow-hidden rounded-sm border border-gray-300">
            <div className="h-2 bg-orange-500"></div>
            <div className="h-2 bg-white"></div>
            <div className="h-2 bg-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border border-blue-800 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <span className="text-gray-800 font-medium text-sm">Government of India</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-600 hover:text-gray-800 underline">Skip to Main Content</button>
          <div className="flex items-center gap-1">
            <button className="text-sm text-gray-600 hover:text-gray-800 px-1">A</button>
            <button className="text-base text-gray-600 hover:text-gray-800 px-1">A</button>
            <button className="text-lg text-gray-600 hover:text-gray-800 px-1">A+</button>
          </div>
          <select className="text-sm text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1">
            <option>English</option>
          </select>
        </div>
      </div>
    </header>
  )
}
