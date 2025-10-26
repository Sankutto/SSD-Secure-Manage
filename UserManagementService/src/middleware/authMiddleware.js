const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = {
      email: decodedToken.email,
      type: decodedToken.type,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = {
  authenticate
};
