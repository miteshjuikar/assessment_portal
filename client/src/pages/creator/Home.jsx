import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export function CreatorHome() {
  const [allAssessments, setAllAssessments] = useState([]);
  const [myAssessments, setMyAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/creator/assessments')
      .then(response => {
        setAllAssessments(response.data);
      })
      .catch(error => console.error("Error fetching assessments:", error));

    // Fetch assessments created by the logged-in user
    axios.get('http://localhost:5000/api/creator/myAssessments', { withCredentials: true })
      .then(response => {
        setMyAssessments(response.data);
      })
      .catch(error => console.error("Error fetching user assessments:", error));
  }, []);

  const handleNavigate = (assessmentId) => {
    navigate(`/creator/assessment/${assessmentId}`);
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Assessments</h1>

      <div className="grid gap-8 md:grid-cols-2 m-4">
        {/* All Assessments */}
        <div>
          <Card className="border-2 border-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <CardHeader className="bg-teal-100 text-teal-700 py-4 px-6 rounded-t-lg">
              <CardTitle className="text-xl font-semibold">All Assessments</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-6">
              <ul>
                {allAssessments.map(assessment => (
                  <li key={assessment._id} className="mb-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                      <div>
                        <h3 className="font-medium text-lg">{assessment.name}</h3>
                        <p className="text-gray-600">{assessment.description}</p>
                      </div>
                      <Button variant="outline" className="px-4 py-2 text-sm text-teal-700 border-teal-700" onClick={() => handleNavigate(assessment._id)}>
                        View Details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* My Assessments */}
        <div>
          <Card className="border-2 border-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <CardHeader className="bg-indigo-100 text-indigo-700 py-4 px-6 rounded-t-lg">
              <CardTitle className="text-xl font-semibold">My Assessments</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-6">
              <ul>
                {myAssessments.length > 0 ? (
                  myAssessments.map(assessment => (
                    <li key={assessment._id} className="mb-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <div>
                          <h3 className="font-medium text-lg">{assessment.name}</h3>
                          <p className="text-gray-600">{assessment.description}</p>
                        </div>
                        <Button variant="outline" className="px-4 py-2 text-sm text-indigo-700 border-indigo-700" onClick={() => handleNavigate(assessment._id)}>
                          View Details
                        </Button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">You haven't created any assessments yet.</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreatorHome;
