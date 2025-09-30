import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface ScheduleMeetingFormProps {
  grievanceNumbers: string[];
  meetingDate: string;
  chairperson: string;
  onFieldChange: (field: string, value: string) => void;
  chairpersonOptions: string[];
  scheduledDate?: string;
}

export const ScheduleMeetingForm: React.FC<ScheduleMeetingFormProps> = ({
  grievanceNumbers,
  meetingDate,
  chairperson,
  onFieldChange,
  chairpersonOptions,
  scheduledDate,
}) => {
  useEffect(() => {
    if (scheduledDate && !meetingDate) {
      onFieldChange("meetingDate", scheduledDate);
    }
  }, [scheduledDate, meetingDate, onFieldChange]);

  return (
    <Card className="w-full bg-[#F5F7FA]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Schedule Meeting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grievance Numbers */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Grievance Selected for Review
          </Label>
          <div className="flex flex-col justify-center items-start gap-2 w-full border bg-muted p-3 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {grievanceNumbers.map((number) => (
                <Badge key={number} variant="secondary" className="text-sm">
                  {number}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Date + Chairperson */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meeting Date */}
          <div className="space-y-2">
            <Label
              htmlFor="meetingDate"
              className="text-sm font-medium text-foreground"
            >
              Meeting Date
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full justify-between items-center px-3"
                >
                  {meetingDate ? (
                    <span>{format(new Date(meetingDate), "PPP")}</span>
                  ) : (
                    <span className="text-muted-foreground">Select date</span>
                  )}
                  <Calendar className="w-5 h-5 text-orange-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={meetingDate ? new Date(meetingDate) : undefined}
                  onSelect={(date) =>
                    onFieldChange("meetingDate", date ? date.toISOString() : "")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Chairperson */}
          <div className="space-y-2">
            <Label
              htmlFor="chairperson"
              className="text-sm font-medium text-foreground"
            >
              Meeting's Chairperson
            </Label>
            <Select
              value={chairperson}
              onValueChange={(value) => onFieldChange("chairperson", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select chairperson" />
              </SelectTrigger>
              <SelectContent>
                {chairpersonOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
