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


export function AssessmentDetails({formData, setFormData,  onSubmit }) {

    const handleFormData = (event) => {
        setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      })
    }

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: `calc(100vh - 64px)` }}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Assessment</CardTitle>
          <CardDescription>Provide details of assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of assessments</Label>
                <Input id="name" onChange={handleFormData} placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="questionsCount">Number of questions</Label>
                <Input id="questionsCount" onChange={handleFormData} placeholder="Enter count of questions" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration of assessment</Label>
                <Input id="duration" onChange={handleFormData} placeholder="Enter duration of assessment" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description of assessment</Label>
                <Input id="description" onChange={handleFormData} placeholder="Enter description of assessment" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" 
          
          >Cancel</Button>
          <Button onClick={onSubmit} >Create Assessments</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AssessmentDetails;
