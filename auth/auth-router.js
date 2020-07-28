
require("dotenv").config();
const router = require("express").Router();
const Users = require("./authModel.js");
const { 
  validCredentials,
  compareValues,
  createToken,
  validateRegistration
} = require("../middleware/authMiddleware.js");
const { response } = require("../api/server.js");

// router.post('/register', (req, res) => {
//   const credentials = req.body;
//   if(validCredentials(credentials) ){
//      secureCredentials(credentials)
//   Users.add(credentials)
//   .then(user => {
//     console.log(user, "LOOKING FOR u")
//     if(user) {
//     res.status(201).json({ message: `Account created for user ${user.username}, please log in to continue`});
//     } else {
// res.status(404).json({ message: "Not sure whats going on"})
//     }
    
//   })
//   .catch(error => {
//     res.status(500).json({ errorMessage: error.message})
//   });
// } else {
//   res.status(400).json({ message: "Please provide username and password."})
// }
// });


router.post("/register", validateRegistration, (req, res) => {
  console.log(req.user)
  Users.add(req.user)
  
  .then(response => {
    console.log(response)
    res.status(201).json({ message: "Success!", res: response});
  })

  .catch(error => {
    res.status(500).json({ errorMessage: error.message })
  }) 
});

// const credentials = req.body;

//   if(validCredentials(credentials)){
//      secureCredentials(credentials)
//    Users.add(credentials)
//    .then(() => {
//     res.status(201).json({ message: "Success!" })  
//   })
//   .catch(error => {
//     res.status(500).json({ errorMessage: error.message})
//   });
//   } else {
//     res.status(400).json({ message: "Invalid credentials"})
//   }
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