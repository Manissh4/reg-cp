import React, { useState } from "react";
import StatusBadge from "@/components/status-badge";
import DocumentList from "@/components/documentlist";
import { IoCloseOutline } from "react-icons/io5";

interface GrievanceReviewProps {
  open: boolean;
  onClose: () => void;
}

const AtrReview: React.FC<GrievanceReviewProps> = ({ open, onClose }) => {
  const [isSectionAExpanded, setIsSectionAExpanded] = useState(true);
  const [isSectionBExpanded, setIsSectionBExpanded] = useState(true);

  if (!open) return null; // 🔹 Do not render if closed

  const grievanceData = {
    grievanceId: "12788182090",
    submissionDate: "22 June 2025",
    fullName: "Arpit Tyagi",
    mobileNumber: "8077992420",
    emailAddress: "arpit.tyagi@example.com",
    location: "Gurgaon",
    subject: "Grievance regarding Aadhar Card Delay",
    description:
      'I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.\nI had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing. I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.\nI had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing.',
    summary:
      'I am writing to bring to your attention the undue delay in the issuance of my Aadhaar card despite having completed all required formalities over a month ago.\nI had successfully completed the Aadhaar enrollment process on [Insert Date] at the [Insert Enrollment Centre Name/Location]. My enrollment ID is [Enrollment ID]. It has been more than [X] weeks, yet I have not received any update or Aadhaar number. The status on the UIDAI website continues to show "Under Processing.',
    ministry: "Health & Family Welfare",
    assigneeMinistry: "--",
    category: "Hospital / AIIMS / AIIMS, New Delhi, Patient Care",
    assigneeCategory: "--",
    groName: "Arjun Jaitley",
    assigneeGroName: "Ashish Sharma",
    citizenDocuments: [
      { id: "1", name: "File new123 .jpg" },
      { id: "2", name: "File new123 .jpg" },
      { id: "3", name: "File new123 .jpg" },
    ],
  };

  const trailSteps = [
    {
      id: "1",
      status: "Taken Up",
      variant: "taken-up" as const,
      assignee: "NO",
      date: "12 Jun 2024",
      time: "3:00 pm",
    },
    {
      id: "2",
      status: "Additional Information Required from Citizen",
      variant: "additional-info" as const,
      assignee: "Grievance Committee",
      date: "12 Jun 2024",
      time: "3:00 pm",
    },
    {
      id: "3",
      status: "Partially Resolved",
      variant: "partially-resolved" as const,
      assignee: "GRO",
      date: "12 Jun 2024",
      time: "3:00 pm",
    },
    {
      id: "4",
      status: "Pending",
      variant: "pending" as const,
      assignee: "GRO",
      date: "12 Jun 2024",
      time: "3:00 pm",
    },
    {
      id: "5",
      status: "Resolved",
      variant: "resolved" as const,
      assignee: "GRO",
      date: "12 Jun 2024",
      time: "3:00 pm",
    },
  ];

  const groDocuments = [{ id: "1", name: "File new123 .jpg" }];

  const handleReopenGrievance = () => {
    console.log("Reopen grievance clicked");
  };

  return (
    <main className="bg-white overflow-hidden rounded-2xl max-w-6xl mx-auto">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg, #020926 0%, #091C71 100%)",
        }}
      >
        <header className="justify-between items-center flex w-full gap-[40px_100px] flex-wrap px-6 py-4 max-md:max-w-full max-md:px-5">
          <h1 className="text-white text-base font-medium leading-6 tracking-[0.15px] self-stretch my-auto">
            GRP-239871 - Review ATR
          </h1>

          <button
            className="self-stretch w-6 my-auto rounded-lg"
            onClick={onClose}
            aria-label="Close"
          >
            <div className="rounded-[8px] bg-white min-w-6 min-h-6 cursor-pointer flex items-center justify-center">
              <IoCloseOutline className="min-w-4 min-h-4" />
            </div>
          </button>
        </header>
      </div>

      <div className="flex w-full flex-col mt-6 px-6 max-md:max-w-full max-md:px-5">
        {" "}
        {/* ATR Section A */}{" "}
        <section className="w-full">
          {" "}
          <button
            className="bg-[rgba(245,247,250,1)] self-stretch flex gap-4 text-xl text-[#212121] font-semibold leading-[1.2] flex-wrap px-6 py-5 rounded-2xl max-md:px-5 w-full text-left"
            onClick={() => setIsSectionAExpanded(!isSectionAExpanded)}
            aria-expanded={isSectionAExpanded}
          >
            {" "}
            <span className="text-[#212121] text-xl leading-6">
              {" "}
              ATR - Section A{" "}
            </span>{" "}
            <div className="flex w-6 shrink-0 h-6">
              {" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
              >
                {" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />{" "}
                <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />{" "}
                {!isSectionAExpanded && (
                  <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
                )}{" "}
              </svg>{" "}
            </div>{" "}
          </button>{" "}
          {isSectionAExpanded && (
            <div className="mt-6">
              {" "}
              {/* Grievance Details */}{" "}
              <div className="flex w-full flex-col">
                {" "}
                <div className="flex w-[714px] max-w-full items-stretch gap-5 flex-wrap justify-between ml-6 mt-6">
                  {" "}
                  <div>
                    {" "}
                    <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                      {" "}
                      Grievance ID{" "}
                    </div>{" "}
                    <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                      {" "}
                      {grievanceData.grievanceId}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                      {" "}
                      Grievance Submission Date{" "}
                    </div>{" "}
                    <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                      {" "}
                      {grievanceData.submissionDate}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="border bg-[#DDD] self-stretch shrink-0 h-px mt-[23px] border-[rgba(221,221,221,1)] border-solid max-md:max-w-full" />{" "}
                <div className="flex w-full max-w-[735px] items-stretch gap-[40px_100px] flex-wrap ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  <div className="flex flex-col items-stretch flex-1">
                    {" "}
                    <div>
                      {" "}
                      <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                        {" "}
                        Full Name{" "}
                      </div>{" "}
                      <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                        {" "}
                        {grievanceData.fullName}{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="mt-6">
                      {" "}
                      <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                        {" "}
                        Email Address{" "}
                      </div>{" "}
                      <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                        {" "}
                        {grievanceData.emailAddress}{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col items-stretch flex-1">
                    {" "}
                    <div>
                      {" "}
                      <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                        {" "}
                        Mobile Number{" "}
                      </div>{" "}
                      <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                        {" "}
                        {grievanceData.mobileNumber}{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="mt-6">
                      {" "}
                      <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                        {" "}
                        Location of cause of grievance{" "}
                      </div>{" "}
                      <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                        {" "}
                        {grievanceData.location}{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="ml-6 mt-6 max-md:ml-2.5">
                  {" "}
                  <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                    {" "}
                    Subject{" "}
                  </div>{" "}
                  <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                    {" "}
                    {grievanceData.subject}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full max-w-[932px] ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                    {" "}
                    Grievance Description{" "}
                  </div>{" "}
                  <div className="text-[#212121] text-ellipsis text-base font-medium leading-7 tracking-[0.15px] mt-1 max-md:max-w-full">
                    {" "}
                    {grievanceData.description
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {" "}
                          {line}{" "}
                          {index <
                            grievanceData.description.split("\n").length -
                              1 && <br />}{" "}
                        </React.Fragment>
                      ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full max-w-[932px] ml-6 mt-8 max-md:max-w-full">
                  {" "}
                  <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                    {" "}
                    Grievance Summary{" "}
                  </div>{" "}
                  <div className="text-[#212121] text-ellipsis text-base font-medium leading-7 tracking-[0.15px] mt-1 max-md:max-w-full">
                    {" "}
                    {grievanceData.summary.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {" "}
                        {line}{" "}
                        {index <
                          grievanceData.summary.split("\n").length - 1 && (
                          <br />
                        )}{" "}
                      </React.Fragment>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-[636px] max-w-full ml-6 mt-6">
                  {" "}
                  <DocumentList
                    title="Supporting Documents by Citizen"
                    documents={grievanceData.citizenDocuments}
                  />{" "}
                </div>{" "}
                <div className="w-full max-w-[827px] ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    {" "}
                    <div className="w-[56%] max-md:w-full max-md:ml-0">
                      {" "}
                      <div className="flex grow flex-col max-md:mt-10">
                        {" "}
                        <div>
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Ministry/Department{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.ministry}{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="self-stretch mt-6">
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Category{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.category}{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="mt-6">
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Name of GRO{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.groName}{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="w-[44%] ml-5 max-md:w-full max-md:ml-0">
                      {" "}
                      <div className="flex grow flex-col max-md:mt-10">
                        {" "}
                        <div className="self-stretch">
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Ministry/Department that acted as assignee{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.assigneeMinistry}{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="mt-6">
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Category that acted as assignee{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.assigneeCategory}{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="mt-6">
                          {" "}
                          <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                            {" "}
                            Name of GRO that acted as assignee{" "}
                          </div>{" "}
                          <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                            {" "}
                            {grievanceData.assigneeGroName}{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="border bg-[#DDD] self-stretch shrink-0 h-px mt-[23px] border-[rgba(221,221,221,1)] border-solid max-md:max-w-full" />{" "}
              {/* Grievance Trail */}{" "}
              {/* <section>
                {" "}
                <h3 className="text-[#212121] text-base font-medium leading-6 tracking-[0.15px] ml-6 mt-6 max-md:ml-2.5">
                  {" "}
                  GRO Trail{" "}
                </h3>{" "}
                <div className="flex w-full max-w-[827px] gap-5 flex-wrap justify-between ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  {trailSteps.map((step) => (
                    <div
                      key={step.id}
                      className="flex flex-col items-stretch justify-center mt-5"
                    >
                      {" "}
                      <StatusBadge
                        status={step.status}
                        variant={step.variant}
                      />{" "}
                      <div className="items-center self-center flex w-8 gap-2.5 mt-8 p-0">
                        {" "}
                        <div className="self-stretch flex min-h-8 w-8 h-8 bg-[#3C9718] my-auto px-1 py-1.5 rounded-[57px]" />{" "}
                      </div>{" "}
                      <div className="flex w-full flex-col items-center text-sm text-[#727272] font-normal tracking-[0.25px] justify-center mt-8">
                        {" "}
                        <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] text-center">
                          {" "}
                          {step.assignee}{" "}
                        </div>{" "}
                        <div className="text-[#727272] text-sm leading-5 tracking-[0.25px] mt-2">
                          {" "}
                          {step.date}{" "}
                        </div>{" "}
                        <div className="text-[#727272] text-sm leading-5 tracking-[0.25px] mt-2">
                          {" "}
                          {step.time}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </section>{" "} */}
            </div>
          )}{" "}
        </section>{" "}
        {/* ATR Section B */}{" "}
        <div className="mt-20 max-md:mt-10">
          {" "}
          <section className="w-full">
            {" "}
            <button
              className="bg-[rgba(245,247,250,1)] self-stretch flex gap-4 text-xl text-[#212121] font-semibold leading-[1.2] flex-wrap px-6 py-5 rounded-2xl max-md:px-5 w-full text-left"
              onClick={() => setIsSectionBExpanded(!isSectionBExpanded)}
              aria-expanded={isSectionBExpanded}
            >
              {" "}
              <span className="text-[#212121] text-xl leading-6">
                {" "}
                ATR - Section B{" "}
              </span>{" "}
              <div className="flex w-6 shrink-0 h-6">
                {" "}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full"
                >
                  {" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />{" "}
                  <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />{" "}
                  {!isSectionBExpanded && (
                    <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
                  )}{" "}
                </svg>{" "}
              </div>{" "}
            </button>{" "}
            {isSectionBExpanded && (
              <div className="mt-6">
                {" "}
                <div className="ml-6 mt-6 max-md:ml-2.5">
                  {" "}
                  <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                    {" "}
                    Date of Resolution{" "}
                  </div>{" "}
                  <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                    {" "}
                    22 June 2025{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-[114px] max-w-full text-sm leading-none ml-6 mt-6 max-md:ml-2.5">
                  {" "}
                  <div className="text-[#212121] text-sm font-medium leading-5 tracking-[0.1px]">
                    {" "}
                    Grievance Status{" "}
                  </div>{" "}
                  <div className="flex w-full items-center gap-2 text-[#3C9718] font-normal whitespace-nowrap tracking-[0.25px] mt-1">
                    {" "}
                    <StatusBadge status="Resolved" variant="resolved" />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full max-w-[932px] ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                    {" "}
                    Actions taken for Resolution and Closing Remarks{" "}
                  </div>{" "}
                  <div className="text-[#212121] text-ellipsis text-base font-medium leading-7 tracking-[0.15px] mt-1 max-md:max-w-full">
                    {" "}
                    I am writing to bring to your attention the undue delay in
                    the issuance of my Aadhaar card despite having completed all
                    required formalities over a month ago. <br />I had
                    successfully completed the Aadhaar enrollment process on
                    [Insert Date] at the [Insert Enrollment Centre
                    Name/Location]. My enrollment ID is [Enrollment ID]. It has
                    been more than [X] weeks, yet I have not received any update
                    or Aadhaar number. The status on the UIDAI website continues
                    to show "Under Processing.{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex flex-col items-stretch text-sm font-normal tracking-[0.25px] leading-none ml-6 mt-6 max-md:ml-2.5">
                  {" "}
                  <DocumentList
                    title="Supporting Documents by GRO"
                    documents={groDocuments}
                  />{" "}
                </div>{" "}
                <div className="flex w-full max-w-[776px] items-stretch gap-5 flex-wrap justify-between ml-6 mt-6 max-md:max-w-full">
                  {" "}
                  <div>
                    {" "}
                    <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                      {" "}
                      Name of GRO{" "}
                    </div>{" "}
                    <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                      {" "}
                      Arjun Jaitley{" "}
                    </div>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <div className="text-[#727272] text-sm font-normal leading-5 tracking-[0.25px]">
                      {" "}
                      Name of GRO that acted as assignee{" "}
                    </div>{" "}
                    <div className="text-[#212121] text-ellipsis text-base font-medium leading-6 tracking-[0.15px] mt-1">
                      {" "}
                      Senior Executive{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}{" "}
          </section>{" "}
        </div>{" "}
      </div>

      {/* Action Buttons */}
      <footer className="items-center flex w-full gap-2.5 text-sm text-white font-medium tracking-[0.1px] leading-none bg-white mt-8 px-6 py-3 border-t-[#DDD] border-t border-solid max-md:max-w-full max-md:px-5">
        <div className="self-stretch flex items-center gap-6 my-auto">
          <button
            className="justify-center items-center self-stretch flex gap-2 overflow-hidden my-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors max-md:px-5"
            onClick={handleReopenGrievance}
          >
            <span className="text-white text-sm leading-5 tracking-[0.1px] self-stretch my-auto">
              Reopen Grievances
            </span>
          </button>
        </div>
      </footer>
    </main>
  );
};

export default AtrReview;
