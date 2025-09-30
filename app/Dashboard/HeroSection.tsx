import React from 'react';

const HeroSection: React.FC = () => {
  const renderDotPattern = () => {
    const rows = 6;
    const dotsPerRow = 23;
    
    return Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex w-full items-center gap-8 mt-10 first:mt-0">
        {Array.from({ length: dotsPerRow }, (_, dotIndex) => (
          <div key={dotIndex} className="bg-white opacity-20 self-stretch flex w-2 shrink-0 h-2 my-auto rounded-[50%]" />
        ))}
      </div>
    ));
  };

  return (
    <section className="w-[34%] max-md:w-full max-md:ml-0">
      <div className="flex flex-col max-md:max-w-full max-md:mt-10">
        <img
          src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/116fff4d3bc89e3c0f02bf2eb9272204717869a0?placeholderIfAbsent=true"
          alt="Government building illustration"
          className="aspect-[1.18] object-contain w-[414px] shadow-[0px_5px_16px_1px_rgba(33,33,33,0.06)] z-10 max-w-full rounded-lg mb-10"
        />
                <div className="relative w-fit ">

        <div className="absolute bottom-28 right-30  w-[272px] max-w-full overflow-hidden">
          {renderDotPattern()}
        </div>
        <div className=" w-[364px] max-w-full">
          <div className=''>
          <h1 className="text-[40px] font-bold leading-[54px] bg-clip-text text-white">
            <span   className ="text-yellow-500"style={{fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'}}>
              Citizen
            </span>
            <span style={{fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'}}>
              {" "}Centric
            </span>
            <br />
            <span style={{fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'}}>
              Governance
            </span>
          </h1>
          <p className="text-gray-300 text-base font-normal leading-8 mt-6">
            Powered by AI, available in your language, and accessible
            anytime, anywhere. A smarter, faster, and more inclusive way
            to raise your voice.
          </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;