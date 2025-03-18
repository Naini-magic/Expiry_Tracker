const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true , 'Please enter a valid name']
    },
    email : {
        type : String ,
        required : [true , 'Please enter a valid email']
    },
    password : {
        type : String,
        require : [true , 'Please enter a valid password']
    },
    confirmPassword : {
        type : String,
        require : [true , 'Please enter a valid confirmPassword'],
        validate : {
            validator : function(val) {
                return val == this.password;
            },
            message: 'Password & Confirm Password does not match!'
        }
    },
    deviceToken : {
        type : String
    }
});

UserSchema.pre('save' ,async function(next){
    if(!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password , 12);
   this.confirmPassword = undefined;
   next();
})

UserSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword , this.password);
}

module.exports = mongoose.model("User" , UserSchema);