
exports.up = function(knex) {
    return knex.schema.createTable("users", users => {
      users.increments();
      users.string("username", 500)
      .notNullable()
      .unique();
      users.string("password", 500)
      .notNullable();
    })
  
    .createTable("recipes", recipes =>{
      recipes.increments();
      recipes.integer("user_id").unsigned().references("users.id")
      recipes.string("title", 500).notNullable();
      recipes.string("source", 500);
      recipes.string("ingredients", 500).notNullable();
      recipes.string("instructions", 500).notNullable();
      recipes.string("category", 500).notNullable();
      recipes.string("recipeImage", 500);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("recipes").dropTableIfExists("users")
  };
  