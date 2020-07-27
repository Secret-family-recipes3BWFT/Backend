const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("./authModel.js");

const { validCredentials } = require("./authMiddleware.js");

router.post('/register', (req, res) => {
  const credentials = req.body;

  if(validCredentials(credentials)){
  const rounds = process.env.BCRYPT_ROUNDS || 5;
  const hash = bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.add(credentials)
  .then(user => {
    res.status(201).json({ data: user });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message})
  });
} else {
  res.status(400).json({ message: "Please provide username and password."})
}
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if(validCredentials(req.body)){
    Users.findBy({ username })
    .then(([user]) =>{
      if(user && bcryptjs.compareSync(password, user.password)){
        const token = createToken(user);
        res.status(200).json({ message: "Welcome to our api", token })
      } else {
        res.status(401).json({ message: "Invalid credentials"})
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message})
    })
  } else {
    res.status(400).json({ message: "Please provide valid user credentials"})
  }
});

function createToken(user){
  const payload = {
    sub: user.id,
    username: user.name,
  };

  const secret = "secret";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router; 