import AssessmentDetails from "@/components/creator/assessmentDetail";
import { useState } from "react";

export function CreateAssessment() {
  const [formData, setFormData] = useState({name: "", questionsCount: "", duration: "", description: ""});
  
  function onSubmit(event) {
    console.log(formData);
    
  }

  return (
    <>
      <AssessmentDetails 
        formData={formData}
        setFormData={setFormData} 
        onSubmit={onSubmit}
      />
    </>
  );
}

export default CreateAssessment;
