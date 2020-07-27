
exports.seed = function(knex) {
  return knex('categories').insert([
    {id: 1, category: 'italian'},
    {id: 2, category: 'american'},
    {id: 3, category: 'vegan'}
  ])
};