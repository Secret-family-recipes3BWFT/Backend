
const db = require("../data/dbConfig.js");

module.exports = {
  add,
  findBy,
  findById
};

function findBy(filter){
  // console.log(filter,"filter");
  return db("users as u")
  .where(filter)
  .orderBy("u.id");
}

function findById(id){
  return db("users").where({ id }).first();
}

async function add(user){
  try{
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch( error ){
    throw error;
  }
}


