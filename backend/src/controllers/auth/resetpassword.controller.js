const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../../models/UsersCreate.model');

exports.resetPassword = async (req,res)=>{
    try{
        const {email,otp,newPassword} = req.body;
        if(!email, !otp, !newPassword){
            return res.status(400).json({
                message : "Email, OTP and Password are required!!",
            });
        }

        const hashOtp = crypto.createHash("sha256").update(otp).digest("hex");
        const user = await User.findOne({
            email,
            resetOtp : hashOtp,
            resetOtpExpires : {$gt: Date.now()}
        });

        if(!user){
            return res.status(400).json({
                message : "Otp incorrect or expired!!",
            });
        }

        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!regexPass.test(newPassword)){
            return res.status(400).json({
                message : "Password must be at least 8 characters with uppercase, lowercase, number and symbol",
            });
        }
        user.password = await bcrypt.hash(newPassword, 12);
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        user.loginAttempts = 0;
        user.lockUntil = null;

        await user.save();

        return res.status(200).json({
            message : "Password reset successfull!!",
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message : "Something went wrong!!",
        });
    }
}