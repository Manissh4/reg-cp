"use client"
import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaint.trim()) {
      console.log('Complaint submitted:', complaint);
      // Handle form submission logic here
      alert('शिकायत सफलतापूर्वक भेजी गई!');
      setComplaint('');
    }
  };

  const handleTrack = () => {
    // Handle complaint tracking logic here
    alert('शिकायत ट्रैकिंग पेज पर रीडायरेक्ट कर रहे हैं...');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white border-slate-200 border flex w-full flex-col overflow-hidden text-sm text-[#212121] font-normal leading-none mt-4 pt-4 pb-24 px-4 rounded-md border-solid max-md:max-w-full max-md:pr-5">
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="यहाँ लिखकर अपनी शिकायत दर्ज करें..."
          className="w-full h-20 resize-none border-none outline-none bg-transparent"
          rows={4}
        />
      </div>
      <div className="flex w-full items-center gap-[17px] text-base font-semibold text-center leading-none flex-wrap mt-8 max-md:max-w-full">
        <button
          type="submit"
          className="justify-center items-center self-stretch flex min-w-60 flex-col text-white flex-1 shrink basis-[0%] my-auto px-[70px] py-3.5 rounded-md bg-[#1E3C72] hover:bg-[#2a4a8a] transition-colors max-md:max-w-full max-md:px-5"
        >
          <div>शिकायत भेजें</div>
        </button>
        <div className="text-[#212121] text-sm font-normal leading-none self-stretch my-auto">
          या
        </div>
        <button
          type="button"
          onClick={handleTrack}
          className="justify-center items-center bg-white self-stretch flex min-w-60 flex-col text-[#FF7501] flex-1 shrink basis-[0%] my-auto px-[70px] py-3.5 rounded-md border-2 border-solid border-[#FF7501] hover:bg-[#FF7501] hover:text-white transition-colors max-md:max-w-full max-md:px-5"
        >
          <div>शिकायत ट्रैक करें</div>
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;