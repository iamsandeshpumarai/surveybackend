const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

const Check = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.Secretcode);

    // 3️⃣ Attach user ID to request
    req.id = decoded.id;

    // 4️⃣ Continue to next middleware
    next();

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

const CheckAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.id);
    if (!user || !user.role.includes('admin')) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { Check, CheckAdmin };
