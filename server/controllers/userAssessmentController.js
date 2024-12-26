const Assessment = require("../models/Assessment");

const getAssessmentById = async (req, res) => {
  const { id } = req.params; // Get the assessment ID from URL parameters

  try {
    // Find the assessment by ID and populate the 'questions' and 'createdBy' fields
    const assessment = await Assessment.findById(id)
      .populate({
        path: 'questions',
        select: '-correctOption', // Exclude the 'correctOption' field
      })
      .populate('createdBy', 'userName email'); // Include creator details

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Return the assessment and its associated questions
    res.status(200).json(assessment);
  } catch (error) {
    console.error('Error fetching assessment and questions:', error);
    res.status(500).json({ message: 'Server error' }); // If there's a server-side error
  }
};

module.exports = { getAssessmentById };
