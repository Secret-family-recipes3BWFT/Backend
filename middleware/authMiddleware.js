
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const secret = process.env.TOKEN_SECRET || "secret";

module.exports = {
  validCredentials,
  secureCredentials,
  compareValues,
  createToken,
  restricted,
  validateRegistration
};

function validCredentials(user){
  return Boolean(user.username && user.password && typeof user.password === "string");
}

function validateRegistration(req, res, next){
  const rounds = process.env.BCRYPT_ROUNDS || 5;
  if(req.body.username === undefined || req.body.password === undefined){
    res.status(400).json({ message: "Invalid Form."})
  } else {
    req.user = {
      username: req.body.username,
      password: bcryptjs.hashSync(req.body.password, rounds)
    }
    next();
  }
}

  //function secureCredentials(credentials){
  //const rounds = process.env.BCRYPT_ROUNDS || 5;
  //const hash = bcryptjs.hashSync(credentials.password, rounds);
  //credentials.password = hash; 
//}

function compareValues(inputValue, findByValue){
  return bcryptjs.compareSync(inputValue, findByValue)
}

function createToken(user){
  const payload = {
    user_id: user.id,
    username: user.name,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next){
  const token = req.headers.authorization;
  const secret = process.env.TOKEN_SECRET || "secret";
  if(token){
    jwt.verify(token, secret, (error, decodedToken) => {
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