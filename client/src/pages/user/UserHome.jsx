import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import { backendDomainName } from "@/common/helper";

const UserHome = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${backendDomainName}api/creator/assessments`)
      .then((response) => {
        setAssessments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assessments:", error);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (assessmentId) => {
    navigate(`/user/assessment/${assessmentId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div
            key={assessment._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{assessment.name}</h2>
            <p className="text-gray-600 mt-2">{assessment.description}</p>
            <p className="text-gray-500 text-sm mt-4">
              Created by: {assessment.createdBy?.userName || "Unknown"}
            </p>
            <Button variant="outline" className="text-blue-600 mt-4 inline-block" onClick={() => handleNavigate(assessment._id)}>
            Take Assessment →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
