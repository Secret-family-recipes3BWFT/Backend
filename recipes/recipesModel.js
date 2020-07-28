const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  getAllUserRecipe,
  getByRecipeId,
  add,
  findByCategory,
  update,
  remove
};
  

function add(newRecipe){
  return db("recipes as r").insert(newRecipe)
  .where("r.user_id", newRecipe.user_id)
  }

function findByCategory(category){
  return db("recipes").where("category",category);
}

function getAll(){
  return db("recipes as r")
  .select("r.id as recipe_id", "r.user_id", "r.title", "r.source", "r.ingredients", "r.instructions", "r.category", "r.recipeImage" )
}

function getAllUserRecipe(jwt_id){
  return db("recipes as r")
  .join("users as u", "u.id", "r.user_id")
  .select("r.user_id", "r.id as recipe_id","r.title", "r.source", "r.ingredients", "r.instructions", "r.category", "r.recipeImage")
  .where("r.user_id", jwt_id)
}

function getByRecipeId(id){
  return db("recipes as r")
  .join("users as u", "u.id","r.user_id")
  .select("u.id as user_id","r.id as recipe_id", "r.title", "r.source", "r.ingredients", "r.instructions", "r.category", "r.recipeImage")
  .where("r.id", id)
}

function update(id, changes){
  return db("recipes as r").where("id", id).update(changes);
}

function remove(id){
  return db("recipes as r").where("id", id).del();
}