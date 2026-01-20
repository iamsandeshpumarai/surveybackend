const UserSurvey = require("../Models/SurveyModel");

 // Assume path

const createSurvey = async (req, res) => {


  try {
 
    const payload = req.body.data ? req.body.data : req.body;

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

        // Handle invalid MongoDB ObjectIDs (CastError) vs other errors
        res.status(500).json({ message: err.message });
    }
};
const getuserSurveyData = async (req, res) => {

    try {
        const userdata = await UserSurvey.find({submittedBy:req.id})
        
        // 1. Critical Fix: Added 'return' so execution stops here if ID is wrong
        if (!userdata) {
            return res.status(404).json({ message: "There is no Survey Found or it may be deleted" });
        }

        res.status(200).json({ userData: userdata });
    } catch (err) {
  
        // Handle invalid MongoDB ObjectIDs (CastError) vs other errors
        res.status(500).json({ message: err.message });
    }
};


const getUserSurvey = async (req, res) => {

  try{
const userdata = await UserSurvey.find({submittedBy:req.params.id})

if(userdata.length == 0){
  return res.status(404).json({ message: "There is no Survey Found or it may be deleted" });
}
res.status(200).json({ userData: userdata });
  }
  catch(err){
  
    res.status(500).json({ message: err.message });
  }
}


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

module.exports = { createSurvey, getSurveyData,deleteSurveyData,getuserSurveyData ,getUserSurvey};