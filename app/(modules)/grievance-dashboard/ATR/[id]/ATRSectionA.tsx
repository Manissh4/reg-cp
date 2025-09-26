import React, { useState } from 'react';
import { Timeline } from '@/components/Common-timeline-stepper';

type Step = {
  label: string;
  status: "completed" | "current" | "upcoming";
  badge?: string;
  badgeColor?: string;
  date?: string;
  time?: string;
};

export default function ATRSectionA() {
  const [formData, setFormData] = useState({
    grievanceId: '1278812099',
    submissionDate: '22 June 2025',
    fullName: 'Arpit Tyagi',
    mobileNumber: '8077992420',
    emailAddress: 'arpit.tyagi@example.com',
    location: 'Gurgaon',
    subject: 'Grievance regarding Aadhaar Card Delay',
    description: `I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.
I had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/ Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing." I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.
I had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/ Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing."`,
    summary: `I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.
I had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/ Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing."`,
    ministry: 'Health & Family Welfare',
    assignedMinistry: '--',
    category: 'Hospital / AIIMS / AIIMS, New Delhi, Patient Care',
    assignedCategory: '--',
    officerName: 'Arjun Jattley',
    assignedOfficer: 'Ashish Sharma'
  });

  const [files] = useState([
    { name: 'File new123.jpg', icon: '📄' },
    { name: 'File new123.jpg', icon: '📄' },
    { name: 'File new123.jpg', icon: '📄' }
  ]);

const timeLine: Step[] = [
  {
    label: 'NO',
    status: 'completed',
    badge: 'Taken Up',
    badgeColor: 'border border-[#938BB6] bg-[#F4F3F9] text-[#938BB6]',
    date: '12 Jun 2024',
    time: '3:00 pm'
  },
  {
    label: 'Greivance Committee',
    status: 'completed',
    badge: 'Additional Information Required from Citizen',
    badgeColor: 'border border-error text-error bg-[#FFEEEA]',
    date: '12 Jun 2024',
    time: '3:00 pm'
  },
  {
    label: 'GRO',
    status: 'completed',
    badge: 'Partially Resolved',
    badgeColor: 'border border-success text-success bg-[#EDF7E6]',
    date: '12 Jun 2024',
    time: '3:00 pm'
  },
  {
    label: 'GRO',
    status: 'completed',
    badge: 'Pending',
    badgeColor: 'border border-[#B77224] text-[#B77224] bg-[#FEF1E7]',
    date: '12 Jun 2024',
    time: '3:00 pm'
  },
  {
    label: 'GRO',
    status: 'completed',
    badge: 'Resolved',
    badgeColor: 'border border-success text-success bg-[#EDF7E6]',
    date: '12 Jun 2024',
    time: '3:00 pm'
  }
];

  return (
    <div className="">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col gap-1">
            <p className="font-normal text-text-hint text-sm">Grievance ID</p>
            <p className="text-base text-label-dark font-medium">{formData.grievanceId}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-normal text-text-hint text-sm">Submission Date</p>
            <p className="text-base text-label-dark font-medium">{formData.submissionDate}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 px-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-normal text-text-hint text-sm">Full Name</label>
            <p className="text-base text-label-dark font-medium">{formData.fullName}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-normal text-text-hint text-sm">Email Address</label>
            <p className="text-base text-label-dark font-medium">{formData.emailAddress}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-normal text-text-hint text-sm">Mobile Number</label>
            <p className="text-base text-label-dark font-medium">{formData.mobileNumber}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-normal text-text-hint text-sm">Location of cause of grievance</label>
            <p className="text-base text-label-dark font-medium">{formData.location}</p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1 px-6 mb-6">
        <label className="font-normal text-text-hint text-sm">Subject</label>
        <p className="text-base text-label-dark font-medium">{formData.subject}</p>
      </div>

      {/* Grievance Description */}
      <div className="flex flex-col gap-1 px-6 mb-8 max-w-10/12">
        <label className="font-normal text-text-hint text-sm">Grievance Description</label>
        <p className="text-base text-label-dark font-medium">{formData.description}</p>
      </div>

      {/* Grievance Summary */}
      <div className="flex flex-col gap-1 px-6 mb-6 max-w-10/12">
        <label className="font-normal text-text-hint text-sm">Grievance Summary</label>
        <p className="text-base text-label-dark font-medium">{formData.summary}</p>
      </div>

      {/* Supporting Documents */}
      <div className="flex flex-col gap-1 px-6 mb-8">
        <label className="font-normal text-text-hint text-sm">Supporting Documents by Citizen</label>
        <div className="flex flex-wrap gap-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-center gap-3 pl-4 pr-6 py-2 rounded-md border border-[#C6C6C6]">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M16.625 5.54232V13.459C16.625 15.834 15.4375 17.4173 12.6667 17.4173H6.33333C3.5625 17.4173 2.375 15.834 2.375 13.459V5.54232C2.375 3.16732 3.5625 1.58398 6.33333 1.58398H12.6667C15.4375 1.58398 16.625 3.16732 16.625 5.54232Z" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.4805 3.5625V5.14583C11.4805 6.01667 12.193 6.72917 13.0638 6.72917H14.6471" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.33203 10.291H9.4987" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.33203 13.459H12.6654" stroke="#FF7501" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-label-dark font-normal">{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-6">
        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Ministry Department</label>
          <p className="text-base text-label-dark font-medium">{formData.ministry}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Ministry/Department that acted as assignee</label>
          <p className="text-base text-label-dark font-medium">{formData.assignedMinistry}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Category</label>
          <p className="text-base text-label-dark font-medium">{formData.category}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Category that acted as assignee</label>
          <p className="text-base text-label-dark font-medium">{formData.assignedCategory}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Name of GRO</label>
          <p className="text-base text-label-dark font-medium">{formData.officerName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-text-hint text-sm">Name of GRO that acted as assignee</label>
          <p className="text-base text-label-dark font-medium">{formData.assignedOfficer}</p>
        </div>
      </div>

      <div className='border-t border-[#DDD] flex flex-col p-6 max-w-9/12'>
        <p className='text-base text-label-dark font-medium'>GRO Trail</p>
        <Timeline
          steps={timeLine}
        />
      </div>
    </div>
  );
}