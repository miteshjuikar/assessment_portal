import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AssessmentDetails({ formData, setFormData, onSubmit, onCancel }) {
  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: `calc(100vh - 64px)` }}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Assessment</CardTitle>
          <CardDescription>Provide details of assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of assessment</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleFormData}
                  placeholder="Name of your project"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="questionsCount">Number of questions</Label>
                <Input
                  id="questionsCount"
                  type="number"
                  value={formData.questionsCount}
                  onChange={handleFormData}
                  placeholder="Enter count of questions"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration of assessment (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleFormData}
                  placeholder="Enter duration of assessment"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description of assessment</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleFormData}
                  placeholder="Enter description of assessment"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button onClick={onSubmit}>Create Assessment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AssessmentDetails;
