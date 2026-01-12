const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true }, // e.g., "q1" (references template)
  questionText: { type: String },
  answer: { type: String, default: '' }, // Single string, as per your single-select
});

const surveyResponseSchema = new mongoose.Schema({
  surveyKey: { type: String, required: true }, // e.g., "Survey1" (references SurveyTemplate.key)
  surveyVersion: { type: Number, required: true }, // From template
  answers: [answerSchema], // Array of {questionId, answer}
});

const userSurveySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // From auth, e.g., JWT ID
  // Personal Info
  name: { type: String, required: true },
  age: { type: String, }, // Converted from string
  gender: { type: String },
  time:{type:String}, // Enum for validation
  wardNumber: { type: String },
  address: { type: String },
  // Background Info
  date:{type:String},
  currentJob: { type: String },
  familyNumber: { type:String
  },
  phoneNumber: { type: String, }, // Basic phone regex
  caste: { type: String },
  class: { type: String },
  religiousAffiliation: { type: String },
  educationLevel: { type: String,  }, // Example enum
  residencyStatus: { type: String, },
  // Surveys (array for multiple)
  surveys: [surveyResponseSchema],
}, { timestamps: true }); // Auto-adds createdAt/updatedAt


const UserSurvey = mongoose.model('UserSurvey', userSurveySchema);

module.exports = UserSurvey