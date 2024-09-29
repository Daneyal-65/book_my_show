const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log(req.headers);
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
