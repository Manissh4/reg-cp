import React from 'react';

const ComplaintOptions = () => {
  return (
    <div className="w-full max-md:max-w-full">
      <div className="flex items-center gap-6 flex-wrap max-md:max-w-full">
        <div className="self-stretch min-w-60 overflow-hidden w-[368px] my-auto rounded-2xl">
          <button className="bg-[rgba(251,233,237,1)] shadow-[0px_6px_30px_-12px_rgba(85,74,74,0.25)] border-slate-200 border flex flex-col pt-5 pb-[76px] px-5 rounded-2xl border-solid w-full text-left hover:shadow-lg transition-shadow">
            <div className="w-[183px] max-w-full">
              <div className="text-[rgba(2,8,23,1)] text-base font-semibold">
                माइक पर बोलें अपनी शिकायतें दर्ज करने के लिए{" "}
              </div>
              <div className="text-[rgba(19,49,108,1)] text-sm font-normal mt-2">
                हिंदी, தமிழ், తెలుగు, অসমীয়া अन्य
              </div>
            </div>
          </button>
        </div>
        <div className="self-stretch min-w-60 overflow-hidden w-[368px] my-auto rounded-2xl">
          <button className="bg-[rgba(237,247,230,1)] shadow-[0px_6px_30px_-12px_rgba(85,74,74,0.25)] border-slate-200 border flex w-full gap-[13px] pt-5 px-4 rounded-2xl border-solid text-left hover:shadow-lg transition-shadow">
            <div>
              <div className="text-[rgba(2,8,23,1)] text-base font-semibold">
                लिखित पत्र अपलोड कर अपनी शिकायत दर्ज करें
              </div>
              <div className="text-[rgba(19,49,108,1)] text-sm font-normal mt-2">
                PDF, JPG, PNG फ़ॉर्मेट ही मान्य हैं
              </div>
            </div>
            <div className="rotate-[4.336808689942018e-19rad] bg-white shadow-[0px_5px_27px_-11px_rgba(85,74,74,0.09)] border-slate-200 border relative flex items-start gap-[9px] p-3.5 rounded-[14px] border-solid">
              <div className="z-0 w-[111px] my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/fc648705c78a426c9c94607a2d44cf80c4aba0cd?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[43px]"
                  alt="Document icon"
                />
                <div className="flex w-full flex-col mt-[13px]">
                  <div className="bg-slate-200 flex min-h-[11px] w-[58px] rounded-[5px]" />
                  <div className="bg-slate-200 self-stretch flex min-h-[11px] w-full mt-[7px] rounded-[5px]" />
                  <div className="bg-slate-200 self-stretch flex min-h-[11px] w-full mt-[7px] rounded-[5px]" />
                  <div className="bg-slate-200 flex min-h-[11px] w-[82px] mt-[7px] rounded-[5px]" />
                  <div className="bg-slate-200 flex min-h-[11px] w-24 mt-[7px] rounded-[5px]" />
                  <div className="bg-slate-200 flex min-h-0 w-9 mt-[7px] rounded-[5px]" />
                </div>
              </div>
              <div className="bg-[rgba(60,151,24,0.5)] absolute z-0 flex w-[164px] shrink-0 h-1 -translate-x-2/4 translate-y-[0%] left-2/4 top-[11px]" />
            </div>
          </button>
        </div>
        <div className="self-stretch min-w-60 overflow-hidden w-[368px] my-auto rounded-2xl">
          <button className="bg-[rgba(238,243,254,1)] shadow-[0px_6px_30px_-12px_rgba(85,74,74,0.25)] border-slate-200 border flex flex-col pt-5 pb-[95px] px-5 rounded-2xl border-solid w-full text-left hover:shadow-lg transition-shadow">
            <div className="w-[183px] max-w-full">
              <div className="text-[rgba(2,8,23,1)] text-base font-semibold">
                स्मार्ट एआई चैटबॉट से बात करें और अपनी शिकायत
              </div>
              <div className="text-[rgba(19,49,108,1)] text-sm font-normal mt-2">
                एआई से आसानी से बात करें
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintOptions;
