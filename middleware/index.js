// all the require modules shoud be imported
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// simple configuration fuction for validating the request
// fuction would be a middleware
console.log(process.env.JWT_SECRET);
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(req.headers);
  // if there is no token, return 401 Unauthorized error and log the message.
  if (!token) return res.status(401).json({ message: "Access Denied" });

  // if token then verify the token by jwt verification method with secret key and
  // if token is valid then pass the request to next middleware or controller.
  // if token is invalid or expired then return 403 Forbidden error and log the message.
  jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    console.log(user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
