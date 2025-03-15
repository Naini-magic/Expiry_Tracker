const admin = require("../util/firebase_backend");

class NotificationService {
    static async sendNotification(deviceToken , title , body) {
        const message = {
            notification : {
                title , body
            },
            token : deviceToken
        };
        try{
            const response = await admin.messaging().send(message);
            return response;
        }catch(error){
            throw error;
        }
    }
};

module.exports = NotificationService;