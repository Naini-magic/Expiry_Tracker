const express = require("express");
const { registerUser, loginUser , editProfile} = require("../controller/AuthController");
const authenticate = require("../middleware/authmiddleware");


const router = express.Router();

//Register Route
router.post("/register", registerUser);

//Login Route
router.post("/login", loginUser);

// Edit route
router.put("/edit-profile", authenticate, editProfile);


// logout route
router.post("/logout", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
    if (!token) return res.status(400).json({ message: "No token provided" });

    blacklist.add(token); // Blacklist the token
    res.json({ message: "Logged out successfully" });
});

module.exports = router;