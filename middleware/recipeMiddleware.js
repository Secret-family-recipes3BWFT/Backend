
const db = require("../data/dbConfig.js");

const Recipes = require("../recipes/recipesModel.js");

module.exports = {
  getByCategory,

};

function getByCategory (req, res, next) {
  const { category } = req.query;
  if(category){
    Recipes.findByCategory(category)
  .then(recipes => res.status(200).json(recipes))
  .catch(error => res.status(500).json({ message: error}))
  } else {
    next();
  }
}
