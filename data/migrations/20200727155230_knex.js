

exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("username", 255)
    .notNullable()
    .unique();
    users.string("password", 255)
    .notNullable();
  })

  .createTable("recipes", recipes =>{
    recipes.increments();
    recipes.integer("user_id").unsigned().references("users.id")
    recipes.string("title", 128).notNullable();
    recipes.string("source", 255);
    recipes.string("ingredients", 255).notNullable();
    recipes.string("instructions", 355).notNullable();
    recipes.string("category", 255).notNullable();
    recipes.string("recipeImage", 550);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes").dropTableIfExists("users")
};
