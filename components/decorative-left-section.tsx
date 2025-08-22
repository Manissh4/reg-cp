import Image from "next/image";

export function DecorativeLeftSection() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="text-white flex-1/3 flex justify-center items-center">
        <div className="bg-[#FFFFFF] rounded-2xl py-4 px-6 flex items-center justify-center min-w-[180px] min-h-[70px]">
          <Image src="/logo.png" alt="CPGRAMS Logo" width={180} height={70} />
        </div>
      </div>
      <div className="text-white flex-2/3 relative w-full flex justify-center items-center">
        <div className="max-w-[266px] max-h-[198px] bg-[#FFFFFF] rounded-2xl w-[266px] h-[198px] absolute top-0 left-1/5 z-10"></div>
        <div className="min-w-[131px] min-h-[131px] bg-[#DEDBEC] rounded-full absolute left-1/2"></div>
        <div className="min-w-[96px] min-h-[96px] bg-[#FFFFFF] rounded-full absolute right-1/4 top-1/4"></div>
        <div className="max-w-[156px] max-h-[165px] w-[156px] h-[165px] bg-[#FFFFFF] rounded-2xl absolute bottom-1/12"></div>
        <div className="min-w-[100px] min-h-[100px] bg-[#FFFFFF] rounded-full absolute bottom-1/4 left-1/6"></div>
      </div>
    </div>
  )
}
