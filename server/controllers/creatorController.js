const Assessment = require("../models/Assessment");
const Question = require("../models/Question");

// Create a new assessment
exports.createAssessment = async (req, res) => {
  try {
    const { name, questionsCount, duration, description } = req.body;    
    const userId = req.user.id;

    // Create a new assessment
    const newAssessment = new Assessment({
      name,
      questionsCount,
      duration,
      description,
      createdBy: userId,
    });

    // Save the assessment to MongoDB
    await newAssessment.save();

    // Respond with the created assessment
    return res.status(201).json(newAssessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    return res.status(500).json({ message: 'Failed to create assessment' });
  }
};

// Submit a question for a specific assessment
exports.submitQuestion = async (req, res) => {
  try {
    const { assessmentId, questionText, options, correctOption } = req.body;

    // Find the assessment by ID
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Create a new question
    const newQuestion = new Question({
      assessmentId,
      questionText,
      options,
      correctOption,
    });

    // Save the question to MongoDB
    await newQuestion.save();

    // Add the question to the assessment's questions array
    assessment.questions.push(newQuestion._id);
    await assessment.save();

    // Respond with the created question
    return res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error submitting question:', error);
    return res.status(500).json({ message: 'Failed to submit question' });
  }
};

exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assessments" });
  }
};

exports.getMyAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ createdBy: req.user.id });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user assessments" });
  }
};

exports.getAssessmentById = async (req, res) => {
  const { id } = req.params;  // Get the assessment ID from URL parameters

  try {
    // Find the assessment by ID and populate the 'questions' field
    const assessment = await Assessment.findById(id)
      .populate('questions');  // Populate the 'questions' field with the actual question documents

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