const express = require("express");
const sendFirebaseNotification = require("../controller/FirebaseController");

const router = express.Router();

// router.post("/send-notification" , async ( req , res ) => {
//     const result = await sendFirebaseNotification(req , res);
//     return res.send(result);
// })
router.post("/send-notification", sendFirebaseNotification);


module.exports = router;