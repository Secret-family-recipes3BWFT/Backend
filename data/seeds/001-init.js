
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Steve', password:"Jobs"},
    {username: 'Riley', password:"BrownCow"},
    {username: 'Sam', password:"SecretRecipe"}
  ]);
};