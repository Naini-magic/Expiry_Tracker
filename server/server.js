const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());



const PORT  = process.env.PORT || 5001;
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
})



