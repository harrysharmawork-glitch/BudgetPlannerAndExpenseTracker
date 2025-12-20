const user = require("../../models/UsersCreate.model")
const bcrypt = require('bcryptjs')

exports.signup = async(req,res)=>{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            aadharNumber
        } = req.body;

        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already existed in database!!"
            });
        }else{
            const hashedPassword = await bcrypt.hash(password,12);
            const aadharHash = await bcrypt.hash(aadharNumber, 12); 

            await user.create({
                firstName,
                lastName,
                email,
                password : hashedPassword,
                aadharHash
            });
            return res.status(201).json({
                message : `User successfully Signed Up and stored in database!`
            })
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message : "Internal Server Error occured!!"
        });
    }
};
