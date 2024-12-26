import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StartAssessment = () => {
  const [assessment, setAssessment] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); // Timer state in seconds
  const { id: assessmentId } = useParams();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/creator/assessment/${assessmentId}`);
        setAssessment(response.data);
        setTimeLeft(response.data.duration * 60); // Set timer in seconds based on duration
        setLoading(false);
      } catch (error) {
        console.error('Failed to load assessment', error);
      }
    };
    fetchAssessment();
  }, [assessmentId]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !loading) {
      handleSubmit(); // Automatically submit when time runs out
    }
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft, loading]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    // try {
    //   const payload = {
    //     userId: '12345', // Replace with actual userId
    //     assessmentId,
    //     responses: Object.keys(responses).map((questionId) => ({
    //       questionId,
    //       selectedOption: responses[questionId],
    //     })),
    //   };
    //   await axios.post('http://localhost:5000/api/responses', payload);
    //   alert('Responses submitted successfully!');
    // } catch (error) {
    //   console.error('Failed to submit responses', error);
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Assessment Header with Timer Beside Name */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-center sm:text-left">{assessment.name}</h1>
            </div>
            {/* Timer next to the assessment name */}
            <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg text-lg">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
          <p className="text-lg text-gray-600 text-center sm:text-left">{assessment.description}</p>
          <p className="text-sm text-gray-500 text-center sm:text-left mt-2">
            Duration: {assessment.duration} minutes | Total Questions: {assessment.questionsCount}
          </p>
        </CardHeader>
      </Card>

      {/* Questions */}
      <form onSubmit={(e) => e.preventDefault()}>
        {assessment.questions.map((question, index) => (
          <Card key={question._id} className="mb-6 shadow-sm">
            <CardContent>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Q{index + 1}: {question.questionText}
                </p>
              </div>

              <div className="space-y-2">
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`question-${question._id}-option-${i}`}
                      name={`question-${question._id}`}
                      value={i + 1}
                      checked={responses[question._id] === (i + 1).toString()}
                      onChange={() => handleOptionChange(question._id, (i + 1).toString())}
                      className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-none"
                    />
                    <label
                      htmlFor={`question-${question._id}-option-${i}`}
                      className="text-gray-800 cursor-pointer hover:text-blue-600"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center mt-8">
          <Button onClick={handleSubmit} >
            Submit Assessment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StartAssessment;
