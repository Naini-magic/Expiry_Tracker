const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_STR, {
    expiresIn: "100d",
  });
};

// sign up
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, deviceToken } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({ name, email, password, deviceToken });

    // Debugging log
    console.log("Registered User:", {
      id: user._id,
      name: user.name,
      email: user.email,
    });

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 100 * 24 * 60 * 60 * 1000
    });
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { 
        id: user._id, 
        name: user.name,
        email: user.email 
      }
    });
    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password, deviceToken } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (deviceToken && user.deviceToken !== deviceToken) {
      user.deviceToken = deviceToken;
      await user.save();
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in production
      sameSite: "Lax", // or 'None' if your frontend and backend are on different domains
      maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// edit the user profile
const editProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//logout 
const logOut = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.json({ message: "Logged out successfully" });
  };
  

module.exports = { registerUser, loginUser, editProfile, logOut };
