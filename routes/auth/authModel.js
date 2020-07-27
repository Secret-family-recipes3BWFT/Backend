
const db = require("../../data/dbConfig");

module.exports = {
  add,
  findBy
};

function findBy(filter){
  console.log(filter,"filter");
  return db("users as u")
  .where(filter)
  .orderBy("u.id");
}

async function add(user){
  try{
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch( error ){
    throw error;
  }
}
