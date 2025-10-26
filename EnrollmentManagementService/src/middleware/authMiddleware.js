const jwt = require("jsonwebtoken");

//jwt token authentication
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

const isAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.type === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Access denied, not an admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

const isInstructor = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.type === 'instructor') {
      next();
    } else {
      res.status(403).json({ message: "Access denied, not an instructor" });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

const isStudent = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken)
    if (decodedToken.type === 'student') {
      next();
    } else {
      res.status(403).json({ message: "Access denied, not a student" });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  isInstructor,
  isStudent
};