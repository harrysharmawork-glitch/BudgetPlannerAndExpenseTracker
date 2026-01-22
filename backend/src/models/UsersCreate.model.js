const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type : String,
            required : true,
            trim : true
        },

        lastName:{
            type : String,
            required : true,
            trim : true
        },
        
        email:{
            type : String,
            required : true,
            lowercase : true,
            index: { unique: true }
        },

        password:{
            type : String,
            required : true,
            select : false
        },

        aadharHash:{
            type : String,
            required : true,
            select : false
        },

        loginAttempts:{
            type : Number,
            default : 0
        },

        lastFailedLogin:{
            type : Date
        },

        lockUntil:{
            type : Date
        },

        resetOtp :{
            type : String
        },

        resetOtpExpires :{
            type : Date
        }
    },
    {
        timestamps : true
    },
);

module.exports = mongoose.model("UsersCreate", userSchema);