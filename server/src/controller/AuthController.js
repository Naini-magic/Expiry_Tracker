const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
    return jwt.sign({id : userId} , process.env.SECRET_STR , {expiresIn: "100d"});
};

// sign up
const registerUser = async ( req , res) => {
    try {
        const { name, email, password, confirmPassword, deviceToken } = req.body;

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({
                success : false ,
                message:"User already exists"
            });
        }
        const user = await User.create({ name , email , password , deviceToken});

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user._id),
            user: { 
                id: user._id, 
                name: user.name,
                 email: user.email 
                }
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Server error"
        });
    }
};

// login user
const loginUser = async( req , res) => {
    try {
        const { email , password , deviceToken} = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success : false ,
                message : "Invalid email or password"
            });
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(400).json({
                success : false,
                message : "Invalid email or password"
            });
        } 

        if(deviceToken && user.deviceToken !== deviceToken){
            user.deviceToken = deviceToken;
            await user.save();
        }


        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {registerUser , loginUser};
    
