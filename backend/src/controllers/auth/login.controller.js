const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signedUpUser = require("../../models/UsersCreate.model");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signedUpUser.findOne({ email }).select("+password");
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({
        message: "Account temporarily locked. Try again later after 24 hours.",
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        user.loginAttempts += 1;
        user.lastFailedLogin = new Date();
        if (user.loginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }
        await user.save();
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      } else {
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5h" }
        );

        res.cookie("JWT_Token", token,{
          expires : new Date(Date.now()+(5 * 60 * 60 * 1000))
        });
        console.log(`Cookie stored: ${token} and will expire after 5 hours`);
        
        user.loginAttempts = 0;
        user.lockUntil = null;
        user.lastFailedLogin = null;
        await user.save();
        return res.status(200).json({
          message: "Login Successfull",
          token,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};
