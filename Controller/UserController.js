const SurveyModel = require("../Models/SurveyModel");
const UserModel = require("../Models/UserModel");


// GET all users + their surveys
const getUserData = async (req, res) => {
  console.log("iam on userdata")
  try {
    const allUserData = await UserModel.find({role:"user"})
    res.status(200).json({ users: allUserData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}









//deleteuserdata
const deleteUserData = async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deleteUser) 
      return res.status(400).json({ message: "There is no such user" });

    // Delete all surveys linked to this user
    await SurveyModel.deleteMany({ submittedBy: req.params.id });

    // Delete personal data
    await PersonalData.deleteMany({ user: req.params.id });

    res.status(200).json({ message: "User and their data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { getUserData,deleteUserData };
