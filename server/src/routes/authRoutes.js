const express = require("express");
const { registerUser, loginUser , editProfile, logOut} = require("../controller/AuthController");
const authenticate = require("../middleware/authmiddleware");


const router = express.Router();

//Register Route
router.post("/register", registerUser);

//Login Route
router.post("/login", loginUser);

// Edit route
router.put("/edit-profile", authenticate, editProfile);


// logout route
router.post("/logout", logOut);

module.exports = router;