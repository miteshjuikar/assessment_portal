import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backendDomainName } from '@/common/helper';

const AssessmentDetailById = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendDomainName}api/creator/assessment/${id}`)
      .then(response => {
        setAssessment(response.data);
      })
      .catch(error => {
        console.error("Error fetching assessment:", error);
      });
  }, [id]);

  if (!assessment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{assessment.name}</h1>
        <p className="text-xl text-gray-700">{assessment.description}</p>
        <p className="text-md text-gray-500 mt-4">
          Duration: {assessment.duration} minutes | Total Questions: {assessment.questionsCount}
        </p>
      </div>

      {/* Questions Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        {assessment.questions.map((question, index) => (
          <div key={question._id} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
            <div className="text-lg font-medium mb-2">
              <strong>Q{index + 1}: </strong>{question.questionText}
            </div>

            <ul className="list-disc pl-5">
              {question.options.map((option, i) => (
                <li
                  key={i}
                  className={`py-1 ${question.correctOption === i + 1 ? 'text-green-500 font-semibold' : ''}`}
                >
                  {i + 1}. {option}
                </li>
              ))}
            </ul>
            {question.correctOption && (
              <div className="mt-2 text-sm text-green-500">
                Correct Answer: Option {question.correctOption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentDetailById;
