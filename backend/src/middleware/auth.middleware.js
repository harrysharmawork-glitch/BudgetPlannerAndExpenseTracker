const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. Token Missing",
      });
    }

    if (authHeader.startsWith("Bearer ")) {
      authHeader = authHeader.split(" ")[1];
    }

    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid JWT token. Please authorize again!",
    });
  }
};

module.exports = authMiddleware;
