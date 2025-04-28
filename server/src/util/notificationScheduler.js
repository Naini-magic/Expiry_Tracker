const cron = require("node-cron");
const ExpiryItem = require("../models/ExpiryItem");
const NotificationService = require("../service/NotificationService");



const checkExpiryAndSendNotifications = async () => {
    try {
        const today = new Date();
        const items = await ExpiryItem.find();

        for (const item of items) {
            const expiryDate = new Date(item.expiryDate);
            const notificationDate = new Date(expiryDate);
            notificationDate.setDate(expiryDate.getDate() - (item.notificationDays || 0));

            // If today is expiry date or notification date, send notification
            if (today.toDateString() === expiryDate.toDateString() || 
                today.toDateString() === notificationDate.toDateString()) {
                
                await NotificationService.sendNotification(
                    item.deviceToken,
                    "Expiry Alert!",
                    `Your product "${item.productName}" is expiring on ${item.expiryDate.toDateString()}!`
                );
                console.log(`Notification sent for ${item.productName}`);
            }
        }
    } catch (error) {
        console.error("Error checking expiry dates:", error);
    }
};

// Schedule job to run every day at 8 AM
cron.schedule("0 8 * * *", checkExpiryAndSendNotifications);

module.exports = checkExpiryAndSendNotifications;











