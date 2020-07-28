
const router = require("express").Router();

const Users = require("./authModel.js");

const { 
  validCredentials,
  secureCredentials,
  compareValues,
  createToken
} = require("./middleware/authMiddleware");

router.post('/register', (req, res) => {
  const credentials = req.body;

  if(validCredentials(credentials)){
     secureCredentials(credentials)

  Users.add(credentials)
  .then(user => {
    res.status(201)
    .json({ message: `Account created for user ${user.username}, please log in to continue`});
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
      if(user && compareValues(password, user.password)){
        const token = createToken(user);
        res.status(200)
        .json({ message: `Welcome ${user.username}`, 
                token, user_id: user.id })
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
module.exports = router;