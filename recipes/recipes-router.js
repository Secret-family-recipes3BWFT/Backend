const router = require("express").Router();
const Recipes = require("./recipesModel.js");
const { restricted } = require("../middleware/authMiddleware.js");
const { getByCategory } = require("../middleware/recipeMiddleware.js")

router.use(restricted);

router.get("/", getByCategory, (req, res) => {
  Recipes.getAll()
  .then(recipes => {
    res.status(200).json({ recipes });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message})
  })
})

router.get("/my-recipes", (req, res) =>{

  Recipes.getAllUserRecipe(req.jwt.user_id)
  .then(recipes => {
    res.status(200).json(recipes);
    
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message })
  })
})

router.get("/:id",(req, res) =>{
  const id = req.params.id;

  Recipes.getByRecipeId(id)
  .then(recipe => {
    res.status(200).json({ recipe })
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
})

router.post("/", (req, res) => {
  const newRecipe = {
    ...req.body,
    user_id: req.jwt.user_id
  };
  Recipes.add(newRecipe)
  .then(([response]) => {
    if(response) {
    Recipes.getByRecipeId(response)
     .then(response => {
     res.status(200).json(response)
    })
    .catch(error => {
      res.status(401).json({ errorMessage: error.message})
    })
    } else {
      res.status(400).json({ message: "No user id provided"})
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message, message: "ITS ME" })
  })
})

router.put("/:id", (req, res) =>{
  const changes = req.body;
  const id = req.params.id;

  Recipes.update(id, changes)
  .then(updatedRecipe => {
    if(updatedRecipe){
      Recipes.getByRecipeId(id)
      .then(newRecipe =>{
        res.status(200).json(newRecipe)
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error.message})
      })
      
    } else {
      res.status(400).json({ message: "The recipe id provide does not exist"})
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message})
  })
})

router.delete("/:id", (req, res) => {
  Recipes.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: "Successfully deleted"})
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message})
  })
})


module.exports = router;