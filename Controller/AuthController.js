const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModel'); // Cleaned up redundant import

const getToken = (id, secretcode) => {
  return jwt.sign({ id }, secretcode, { expiresIn: "1h" });
}

// Helper to set cookie to avoid repetition
const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
secure:true,
  // MUST be true for cross-domain
  // secure: true,      
  // MUST be "none" for Vercel -> Render communication
  sameSite: "none",
  });
};

const RegisterAdmin = async (req, res) => {
  console.log("iam insdie the register amdin")
  console.log(req.body)
  try {
    const { email, password, username } = req.body;
    const existingAdmin = await UserModel.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });
const hashedpassword = await bcrypt.hash(password,10)
    const data = await UserModel.create({
      username,
      email,
      password:hashedpassword,
      role: ['admin']
    });

    const token = getToken(data._id, process.env.Secretcode);
    setAuthCookie(res, token);
    res.status(200).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "Server Error" });
  }
}

const UserLogin = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    
    // 1. Find user by email
    const user = await UserModel.findOne({ email });

    console.log(user)
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 3. Generate Token
    const token = getToken(user._id, process.env.Secretcode);
    
    // 4. Set Cookie
    setAuthCookie(res, token);

    // 5. Return user data including role for frontend navigation
    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        role: user.role // This will be ['admin'] or ['user']
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = async (req, res) => {
  try {
    // When clearing, the attributes MUST match the setAuthCookie attributes
    res.clearCookie("token", { 
      httpOnly: true,
      path: "/",
      secure: true,      
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const UserSignup = async (req, res) => { // Added (req, res)
  const { username, email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User Already Exists" });

    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await UserModel.create({ username, email, password: hashedPassword });

    const token = getToken(userData._id, process.env.Secretcode);
    setAuthCookie(res, token);
    
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message });
  }
}
const AdminData = async(req,res)=>{
  
}



module.exports = { RegisterAdmin, logOut, UserSignup, UserLogin };