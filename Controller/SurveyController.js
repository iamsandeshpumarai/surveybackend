const UserSurvey = require("../Models/SurveyModel");

 // Assume path

const createSurvey = async (req, res) => {
  console.log("Incoming Request Body:", req.body);

  try {
    // 1. Fix the "Undefined" error by checking where the data actually is
    // This handles both wrapped and unwrapped data safely
    const payload = req.body.data ? req.body.data : req.body;
console.log(payload)
    // if (!payload.personalInfo) {
    //   return res.status(400).json({ message: 'Data structure error: personalInfo not found' });
    // }

    // const surveyData = new UserSurvey({
    //   userId: req.id, 
    //   name: payload.personalInfo.name,
    //   age: payload.personalInfo.age, // Kept as provided
    //   gender: payload.personalInfo.gender,
    //   wardNumber: payload.personalInfo.wardNumber,
    //   address: payload.personalInfo.address,
    //   currentJob: payload.personalInfo.currentJob,
    //   familyNumber: payload.personalInfo.familyNumber, // Kept as provided
    //   phoneNumber: payload.personalInfo.phoneNumber,
    //   caste: payload.personalInfo.caste,
    //   class: payload.personalInfo.class,
    //   religiousAffiliation: payload.personalInfo.religiousAffiliation,
    //   educationLevel: payload.personalInfo.educationLevel,
    //   residencyStatus: payload.personalInfo.residencyStatus,
    //   date: payload.personalInfo.date,
    //   time: payload.personalInfo.time,
      
    //   // Map the surveys into the schema format
    //   surveys: Object.entries(payload.surveys).map(([key, survey]) => ({

    //     surveyKey: key,
    //     surveyVersion: 1,
    //     answers: survey.questions.map(q => ({
    //       questionId: q.id,
    //       questionText: q.Question,
    //       answer: q.answer,
    //     })),
    //   })),
    // });
const { personalInfo, surveys, submittedBy } = req.body.data;

    // Convert the surveys object { Survey1: {...}, Survey2: {...} } 
    // into an array [ { surveyKey: 'Survey1', ... }, { surveyKey: 'Survey2', ... } ]
    const surveysArray = Object.keys(surveys).map(key => ({
      surveyKey: key,
      topic: surveys[key].Topic,
      subject: surveys[key].Subject,
      answers: surveys[key].questions.map(q => ({
        questionId: q.id,
        questionText: q.Question,
        answer: q.answer
      }))
    }));

    const newSubmission = new UserSurvey({
      ...personalInfo, // This spreads name, age, wardNumber, etc.
      submittedBy:req.id,
      surveys: surveysArray
    });
    await newSubmission.save();
    // await surveyData.save();
    res.status(201).json({ message: 'Survey created successfully'});
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getSurveyData = async (req, res) => {
    try {
        const userdata = await UserSurvey.find()
        
        // 1. Critical Fix: Added 'return' so execution stops here if ID is wrong
        if (!userdata) {
            return res.status(404).json({ message: "There is no Survey Found or it may be deleted" });
        }

        res.status(200).json({ userData: userdata });
    } catch (err) {
      console.log(err)
        // Handle invalid MongoDB ObjectIDs (CastError) vs other errors
        res.status(500).json({ message: err.message });
    }
};
const getuserSurveyData = async (req, res) => {
  console.log(req.params.id)
  console.log("iuam on surveydata")
    try {
        const userdata = await UserSurvey.findOne({submittedBy:req.params.id})
        
        // 1. Critical Fix: Added 'return' so execution stops here if ID is wrong
        if (!userdata) {
            return res.status(404).json({ message: "There is no Survey Found or it may be deleted" });
        }

        res.status(200).json({ userData: userdata });
    } catch (err) {
      console.log(err)
        // Handle invalid MongoDB ObjectIDs (CastError) vs other errors
        res.status(500).json({ message: err.message });
    }
};



const deleteSurveyData = async (req, res) => {
    try {
        const deletedSurvey = await SurveyModel.findByIdAndDelete(req.params.id);
        
        // 2. Improvement: Check if something was actually deleted
        if (!deletedSurvey) {
            return res.status(404).json({ message: "Survey not found, nothing to delete" });
        }

        res.status(200).json({ message: "Survey Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createSurvey, getSurveyData,deleteSurveyData,getuserSurveyData };