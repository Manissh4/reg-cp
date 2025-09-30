import React from 'react';
import ComplaintOptions from './ComplaintOptions';
import ComplaintForm from './ComplaintForm';

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="bg-[rgba(0,0,0,0.3)] z-10 flex min-h-[360px] w-full max-md:max-w-full" />
      <div className="bg-[rgba(217,217,217,1)] flex mt-[-243px] w-0 shrink-0 h-[322px] max-md:mt-[-200px]" />
      <div className="bg-white shadow-[0px_6px_30px_-12px_rgba(85,74,74,0.25)] self-center z-10 flex mt-[-299px] w-full max-w-[1200px] flex-col items-stretch justify-center p-6 rounded-2xl max-md:max-w-full max-md:mt-[-200px] max-md:px-5 mx-auto">
        <div className="w-full max-md:max-w-full">
          <div className="flex w-[351px] max-w-full flex-col items-stretch">
            <h1 className="text-[rgba(19,49,108,1)] text-[32px] font-semibold leading-none text-center">
              अपनी <span style={{color: 'rgba(255,117,1,1)'}}>शिकायत</span> यहाँ दर्ज करें
            </h1>
            <p className="text-[#212121] text-lg font-normal leading-loose mt-2">
              विकल्प चुनें जिससे आप शिकायत करना चाहें
            </p>
          </div>
          <div className="w-full mt-6 max-md:max-w-full">
            <ComplaintOptions />
            <ComplaintForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
