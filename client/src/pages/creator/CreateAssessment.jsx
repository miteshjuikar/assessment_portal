import { useState } from "react";
import AssessmentDetails from "@/components/creator/assessmentDetail";
import QuestionInputForm from "@/components/creator/QuetionDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendDomainName } from "@/common/helper";

export function CreateAssessment() {
  const [formData, setFormData] = useState({
    name: "",
    questionsCount: "",
    duration: "",
    description: "",
  });
  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [assessmentCreated, setAssessmentCreated] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);

  const handleAssessmentSubmit = () => {
    axios
      .post(`${backendDomainName}api/creator/assessment`, formData, {
        withCredentials: true, // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAssessmentId(response.data._id);
        setAssessmentCreated(true);
      })
      .catch((error) => {
        console.error("Error creating assessment:", error);
      });
  };

  const handleQuestionSubmit = (questionData) => {
    axios
      .post(
        `${backendDomainName}api/creator/assessment/questions`,
        {
          assessmentId,
          ...questionData,
        },
        {
          withCredentials: true, // Ensures cookies are sent with the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setQuestions([...questions, questionData]);

        if (questionIndex + 1 < formData.questionsCount) {
          setQuestionIndex(questionIndex + 1);
        } else {
          navigate("/creator/home");
          alert("All questions submitted!");
        }
      })
      .catch((error) => {
        console.error("Error submitting question:", error);
      });
  };

  const handleCancel = () => {
    navigate("/creator/home");
  };

  return (
    <div>
      {!assessmentCreated ? (
        <AssessmentDetails
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAssessmentSubmit}
        />
      ) : (
        questionIndex < formData.questionsCount && (
          <QuestionInputForm
            onSubmit={handleQuestionSubmit}
            questionIndex={questionIndex + 1}
            totalQuestions={formData.questionsCount}
            onCancel={handleCancel}
          />
        )
      )}
    </div>
  );
}

export default CreateAssessment;
