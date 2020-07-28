
const bcryptjs = require("bcryptjs");

const router = require("express").Router();
const Auth = require("./authModel.js");

const { bcrypt_rounds } = require("../data/jwtConfig.js");

const { 
  validCredentials,
  createToken
} = require("../middleware/authMiddleware.js");
router.post("/register", (req, res) => {
  
  const user = req.body;
  const hash = bcryptjs.hashSync(user.password, bcrypt_rounds);
  user.password = hash;
  Auth.add(user)
  
  .then(saved => {
    res.status(201)
    .json({ message: `User ${saved.username} successfully created`});
  })
  
  .catch(error => {
    res.status(500).json({ errorMessage: error.message })
  })
})

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if(validCredentials(req.body)){
    Auth.findBy({ username })
    .then(([user]) =>{
      if(user && bcryptjs.compareSync(password, user.password)){
        const token = createToken(user);
        res.status(200)
        .json({ message: `Welcome ${user.username}`, 
                token, user_id: user.id })
  
              } else {
        res.status(401).json({ message: "Invalid Username ,or Password"})
      }
    })
  
    .catch(error => {
      res.status(500).json({ errorMessage: error.message})
    })
  
  } else {
    res.status(400).json({ message: "Please provide valid Username ,and Password"})
  }
});


module.exports = router;