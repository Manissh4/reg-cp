import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AgendaFormProps {
  formData: {
    ministry: string;
    feedbackType: string;
    feedbackDuration: string;
    pendencyDuration: string;
  };
  onFieldChange: (field: string, value: string) => void;
  ministryOptions: string[];
  feedbackTypeOptions: string[];
  durationOptions: string[];
  pendencyOptions?: string[];
}

export const AgendaForm: React.FC<AgendaFormProps> = ({
  formData,
  onFieldChange,
  ministryOptions,
  feedbackTypeOptions,
  durationOptions,
  pendencyOptions = durationOptions,
}) => {
  return (
    <Card className="w-full bg-[#F5F7FA]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Add Agenda
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="ministry"
              className="text-sm font-medium text-foreground"
            >
              Ministry/Department
            </Label>
            <Select
              value={formData.ministry}
              onValueChange={(value) => onFieldChange("ministry", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Ministry/Department" />
              </SelectTrigger>
              <SelectContent>
                {ministryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="feedbackType"
              className="text-sm font-medium text-foreground"
            >
              Feedback Type
            </Label>
            <Select
              value={formData.feedbackType}
              onValueChange={(value) => onFieldChange("feedbackType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Feedback Type" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="feedbackDuration"
              className="text-sm font-medium text-foreground"
            >
              Feedback Duration
            </Label>
            <Select
              value={formData.feedbackDuration}
              onValueChange={(value) =>
                onFieldChange("feedbackDuration", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select feedback duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pendencyDuration"
              className="text-sm font-medium text-foreground"
            >
              Pendency Duration
            </Label>
            <Select
              value={formData.pendencyDuration}
              onValueChange={(value) =>
                onFieldChange("pendencyDuration", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select pendency duration" />
              </SelectTrigger>
              <SelectContent>
                {pendencyOptions.map((option) => (
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
