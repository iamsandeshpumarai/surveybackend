const mongoose = require('mongoose');

// Schema for individual question answers
const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true }, // e.g., "q1"
  questionText: { type: String, required: true },
  // Using Mixed because 'checkbox' is a String, 
  // but your 'text' questions are Objects { "Option Label": "User Value" }
  answer: { type: mongoose.Schema.Types.Mixed, default: '' }, 
});

// Schema for a full Survey section (e.g., Survey1 or Survey2)
const surveyResponseSchema = new mongoose.Schema({
  surveyKey: { type: String, required: true }, // "Survey1", "Survey2"
  topic: { type: String }, // "विकाससँग सम्बन्धी..."
  subject: { type: String },
  answers: [answerSchema],
});

const userSurveySchema = new mongoose.Schema({
  // The person who filled the form (from your handleSubmit user?.id)
  submittedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // The name of the model you are linking to
    required: true 
  },
  submittedBy: { 
    type: String, // Keeping as String since your frontend sends user?.id || "anonymous"
    required: true 
  },
  
  // 1. Personal Info (Flattened from your personalInfoState)
  name: { type: String, required: true },
  age: { type: String },
  gender: { type: String },
  wardNumber: { type: String },
  address: { type: String },
  date: { type: String },
  time: { type: String },
  currentJob: { type: String },
  familyNumber: { type: String },
  phoneNumber: { type: String },
  caste: { type: String },
  class: { type: String },
  religiousAffiliation: { type: String },
  educationLevel: { type: String },
  residencyStatus: { type: String },

  // 2. Surveys (Dynamic Array)
  // This stores Survey1, Survey2, etc., as objects in an array
  surveys: [surveyResponseSchema],

}, { timestamps: true });

const UserSurvey = mongoose.model('UserSurvey', userSurveySchema);
module.exports = UserSurvey;