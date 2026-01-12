require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const surveyRoute = require('./Routes/SurveyRoute')
const adminRoute = require('./Routes/AdminRoute')
const userRoute = require('./Routes/UserRoutes')
const app = express();
const cors = require('cors');
const { Check } = require('./Middleware/Checkauth');
const cookieParser = require('cookie-parser');
const userModel = require('./Models/UserModel');
app.use(cookieParser());

app.use(cors({
  origin:['http://localhost:5173',"https://surveyfrontend-five.vercel.app"],
credentials:true
}))
app.set("trust proxy", 1);
// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/api/survey',surveyRoute)
app.use('/api/admin',adminRoute)
app.use('/api/user',userRoute)


app.get('/api/check',Check,async(req,res)=>{
  console.log(req.id)
 const user = await userModel.findById(req.id).select('-password')
if(!user){
return  res.status(400).json({message:"User not Found"})
}
if(user){
  res.status(200).json(user)
}


})
// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
