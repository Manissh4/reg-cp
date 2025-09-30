"use client"
import React, { useState } from 'react';

interface GrievanceOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

const GrievanceForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [grievanceText, setGrievanceText] = useState<string>('');

  const grievanceOptions: GrievanceOption[] = [
    {
      id: 'voice',
      title: 'Use mic and speak',
      subtitle: 'हिंदी, தமிழ், తెలుగు, অসমীয়া & more',
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/f30cccd4-ac62-4b69-8a7c-24f9ee385020?placeholderIfAbsent=true',
      color: 'rgba(19,49,108,1)'
    },
    {
      id: 'upload',
      title: 'Upload complaint letter',
      subtitle: 'PDF, JPG, PNG supported',
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/5180179fa7e8efa2208671bb433dd828142e00f4?placeholderIfAbsent=true',
      color: 'rgba(245,135,61,1)'
    },
    {
      id: 'chatbot',
      title: 'Smart AI chatbot',
      subtitle: 'Chat easily with AI',
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/832796234e14577accc701bb85ab2a097eb3aef7?placeholderIfAbsent=true',
      color: '#212121'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting grievance:', { selectedOption, grievanceText });
    // Handle form submission logic here
  };

  const handleTrackGrievance = () => {
    console.log('Tracking grievance');
    // Handle track grievance logic here
  };

  return (
    <section className="ml-5 max-md:w-full max-md:ml-0">
      <div className="flex w-full flex-col items-stretch max-md:max-w-full max-md:mt-10">
        <div className="bg-[rgba(255,255,255,0.95)] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex w-full flex-col overflow-hidden items-stretch p-6 rounded-lg max-md:max-w-full max-md:px-5">
          <div className="self-center flex items-center gap-7 text-[28px] text-[rgba(19,49,108,1)] font-semibold text-center leading-none flex-wrap max-md:max-w-full">
            <h2 className="self-stretch my-auto">
              <span style={{fontWeight: 700}}>Lodge Your </span>
              <span style={{fontWeight: 700, color: 'rgba(255,117,1,1)'}}>
                Grievance
              </span>
              <span style={{fontWeight: 700}}> here</span>
            </h2>
            <img
              src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/c89e7b99445b0ab086ac1d54a70c704dac235fde?placeholderIfAbsent=true"
              alt="Separator"
              className="object-contain w-0 stroke-[2px] stroke-[#DDD] self-stretch shrink-0 my-auto"
            />
<div
  className="w-8 h-0 border-t-2 bg-[#DDD] rotate-90"
/>
            <h2 className="self-stretch my-auto">
              अपनी <span style={{color: 'rgba(255,117,1,1)'}}>शिकायत</span>{" "}
              यहाँ दर्ज करें
            </h2>
          </div>
          <h3 className="text-[#212121] text-center text-lg font-semibold leading-loose self-center mt-4">
            Choose 1 option out of these 4
          </h3>
          
          <form onSubmit={handleSubmit}>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
  {grievanceOptions.map((option) => (
    <div key={option.id} className="self-stretch">
      <button
        type="button"
        onClick={() => setSelectedOption(option.id)}
        className={`bg-white border-slate-200 flex flex-col items-center px-[26px] py-4 rounded-lg border-solid border-2 w-full transition-all hover:border-blue-300 ${
          selectedOption === option.id ? 'border-blue-500 bg-blue-50' : ''
        }`}
      >
        <img
          src={option.icon}
          alt={option.title}
          className="aspect-[1] object-contain w-[72px]"
        />
        <div className="text-[rgba(2,8,23,1)] text-lg font-semibold leading-none mt-4">
          {option.title}
        </div>
        <div
          className="text-xs font-normal leading-none mt-2"
          style={{ color: option.color }}
        >
          {option.subtitle}
        </div>
      </button>
    </div>
  ))}
</div>

            
            <div className="bg-white border-slate-200 border flex flex-col overflow-hidden text-lg text-[#212121] font-semibold leading-none mt-6 rounded-md border-solid max-md:max-w-full">
              <textarea
                value={grievanceText}
                onChange={(e) => setGrievanceText(e.target.value)}
                placeholder="Or just type your grievance here..."
                className="w-full h-32 p-4 border-none outline-none resize-none text-[#212121] placeholder-[#212121]"
                rows={4}
              />
            </div>
            
          <div className="flex items-center gap-4 mt-6 w-full max-md:flex-col">
  {/* Submit Grievance */}
  <button
    type="submit"
    className="flex-1 text-white bg-[#FF7501] py-3.5 rounded-md hover:bg-[#e6690a] transition-colors font-semibold text-base"
  >
    Submit Grievance
  </button>

  {/* OR text */}
  <div className="text-[#212121] text-sm font-normal leading-none text-center px-2">
    or
  </div>

  {/* Track Grievance */}
  <button
    type="button"
    onClick={handleTrackGrievance}
    className="flex-1 bg-white text-[rgba(245,135,61,1)] py-3.5 rounded-md border-[rgba(245,135,61,1)] border-2 hover:bg-[rgba(245,135,61,0.1)] transition-colors font-semibold text-base"
  >
    Track Grievance
  </button>
</div>

          </form>
        </div>
        
        <div className="self-center flex w-80 max-w-full items-center gap-[40px_60px] text-lg text-white font-semibold text-center leading-none mt-10">
          <button className="bg-[rgba(255,255,255,0.1)] border self-stretch flex min-w-60 w-80 flex-col items-stretch justify-center my-auto px-8 py-3.5 rounded-xl border-[rgba(255,255,255,0.2)] border-solid hover:bg-[rgba(255,255,255,0.2)] transition-colors max-md:px-5">
            <div className="flex items-center gap-5">
              <img
                src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/806b3fbc590c76d1f981d3081a03bbd9bf29beb3?placeholderIfAbsent=true"
                alt="WhatsApp"
                className="aspect-[1] object-contain w-[60px] self-stretch shrink-0 my-auto rounded-[9374px]"
              />
              <div className="self-stretch my-auto">
                Lodge via WhatsApp
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GrievanceForm;
