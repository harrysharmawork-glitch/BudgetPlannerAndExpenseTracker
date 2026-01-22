const user = require("../../models/UsersCreate.model");
const crypto = require("crypto");
const sendEmail = require("../../utility/sendemail.utility");
exports.forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await user.findOne({ email });
    if (!existingEmail) {
      return res.status(400).json({
        message: `If email exists the otp might have came!`,
      });
    } else {
      const otp = crypto.randomInt(100000, 999999).toString();
      const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
      existingEmail.resetOtp = hashedOtp;
      existingEmail.resetOtpExpires = Date.now() + 2 * 60 * 1000;
      await existingEmail.save();
      await sendEmail({
        to: existingEmail.email,
        subject: "Password Reset OTP",
        text: `Your OTP is : ${otp}`,
      });

      return res.status(200).json({
        message : "Email sent for reset password OTP is sent sucessfully!!"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message : "Internal Server Error! Something went wrong!!",
    })
  }
};
