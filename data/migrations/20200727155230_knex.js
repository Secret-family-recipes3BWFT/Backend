
exports.up = function(knex) {
    return knex.schema.createTable("users", users => {
      users.increments();
      users.string("username", 255)
      .notNullable()
      .unique();
      users.string("password", 255)
      .notNullable();
    })
  
    .createTable("categories", category => {
      category.increments();
      category.string("category", 255)
      .notNullable();
    })
  
    .createTable("recipes", recipes =>{
      recipes.increments();
      recipes.integer("user_id").unsigned().references("users.id")
      recipes.string("title", 128).notNullable();
      recipes.string("source", 255);
      recipes.string("ingredients", 255).notNullable();
      recipes.string("instructions", 355).notNullable();
      recipes.integer("category_id").unsigned().references("categories.id")
             .onDelete("RESTRICT").onUpdate("CASCADE");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("recipes").dropTableIfExists("categories").dropTableIfExists("users")
  };