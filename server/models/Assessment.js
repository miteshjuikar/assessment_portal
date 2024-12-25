// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questionsCount: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
