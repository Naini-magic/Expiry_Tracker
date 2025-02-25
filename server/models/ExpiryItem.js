const mongoose = require("mongoose")

const ExpiryItemSchema = new mongoose.Schema({
    barcode: { type: String, required: true },
    productName: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    collectionName: { type: String }, 
    notificationDays: { type: Number },
    image: { type: String }
});



module.exports = mongoose.model("ExpiryItem" , ExpiryItemSchema);