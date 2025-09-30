"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, UploadCloud, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SuccessModal from "@/components/SucessModal";

interface ReviewMeetingModalProps {
  open: boolean;
  onClose: () => void;
  meetingNumber: string;
  meetingDate: string;
  chairpersonName: string;
}

export const ReviewMeetingDetailsModal: React.FC<ReviewMeetingModalProps> = ({
  open,
  onClose,
  meetingNumber,
  meetingDate,
  chairpersonName,
}) => {
  if (!open) return null;

  const [isMeetingSaved, setIsMeetingSaved] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="bg-white rounded-lg w-full max-w-[1100px] max-h-[90vh] flex flex-col overflow-hidden shadow-lg">
          <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Review Meeting
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            <Card className="bg-[#F5F7FA]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Meeting Details
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Meeting Number</Label>
                    <Input
                      value={meetingNumber}
                      readOnly
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meeting Date</Label>
                    <Input value={meetingDate} readOnly className="bg-white" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Chairperson's Name</Label>
                    <Input
                      value={chairpersonName}
                      readOnly
                      className="bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#F5F7FA]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Meeting Review
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>No. Grievances for Review *</Label>
                    <Input
                      placeholder="10"
                      type="number"
                      defaultValue="10"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unsatisfied Feedback *</Label>
                    <Input
                      placeholder="4"
                      type="number"
                      defaultValue="4"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reopened Grievances *</Label>
                    <Input
                      placeholder="4"
                      type="number"
                      defaultValue="4"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meeting Mode *</Label>
                    <Input
                      placeholder="Offline"
                      defaultValue="Offline"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Textarea
                    placeholder="Meeting Remarks by NO"
                    defaultValue="Meeting Remarks by NO"
                    className="bg-white min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Minutes of the Meeting</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 transition-colors bg-white">
                    <UploadCloud className="w-12 h-12 text-orange-500 mb-3" />
                    <p className="text-sm text-gray-600">
                      Please drop or upload your files here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t flex-shrink-0 bg-gray-50">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 px-6 bg-transparent"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700 px-6"
              onClick={() => {
                setIsMeetingSaved(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      {isMeetingSaved && (
        <SuccessModal
          handleModalClose={() => setIsMeetingSaved(false)}
          handleCancel={() => setIsMeetingSaved(false)}
          handleAction={() => {
            console.log("Meeting cancelled");
            setIsMeetingSaved(false);
          }}
          title="Meeting Outcome Saved"
          message="Your feedback has been recorded successfully, and the meeting status has been updated."
          ActionButtonText="Close"
          actionButtonVariant="primary"
          titleIcon={<CheckCircle className="text-green-600 w-5 h-5" />}
        />
      )}
    </>
  );
};
