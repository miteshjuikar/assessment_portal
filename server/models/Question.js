// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true }, // Store the correct option as a number (1-4)
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
