const User = require("../models/User");
const admin = require("../util/firebase_backend");

class NotificationService {
    static async sendNotification(deviceToken , title , body) {

        if (!deviceToken || !title || !body) {
            throw new Error("Missing required parameters");
        }


        const message = {
            notification : {
                title , body
            },
            token : deviceToken,
        };


        try{
            console.log(`Attempting to send notification to token: ${deviceToken}`);
            const response = await admin.messaging().send(message);
            console.log("Notification sent:", response);
            return response;
        }catch(error){
            if (error.code === 'messaging/registration-token-not-registered') {
                // Clean up: Remove or mark token in DB
                console.warn(`Invalid FCM token detected: ${deviceToken}`);
                // console.log('Deleting invalid token:', token);
                await User.updateOne({ deviceToken: deviceToken }, { $unset: { deviceToken: 1 } });
                await ExpiryItem.updateMany({ deviceToken }, { $unset: { deviceToken: 1 } });
              }
            console.error("Failed to send notification:", error); // << add this


            throw error;
        }
    }
};

module.exports = NotificationService;








