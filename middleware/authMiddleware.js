require("dotenv").config();
const jwt = require("jsonwebtoken");


const { jwtSecret } = require("../data/jwtConfig.js");


module.exports = {
  validCredentials,
  createToken,
  restricted
};

function validCredentials(user){
  return Boolean(user.username && user.password && typeof user.password === "string");
}
function createToken(user){
  const payload = {
    user_id: user.id,
    username: user.name,
  };
  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

function restricted(req, res, next){
  const token = req.headers.authorization;

  if(token){
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error){
        res.status(401).json({ message: "Log in to continue"});
      } else {
        req.jwt = decodedToken;
        next();
      };
    });
  } else {
    res.status(400).json({ message: "Please provide the authentication information"});
  };
};