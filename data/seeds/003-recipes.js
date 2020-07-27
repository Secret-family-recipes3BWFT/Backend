
exports.seed = function(knex) {
  return knex('recipes').insert([

    {user_id: 1, title: 'chicken  soup', 
    source:"mama", ingredients:"eggs", 
    instructions:"crack eggs", category_id : 2}, 

    {user_id: 3, title: 'noodle', 
    source:"mama", ingredients:"eggs", 
    instructions:"crack eggs", category_id : 1}, 

    {user_id: 2, title: 'soup', 
    source:"granny", ingredients:"sauce", 
    instructions:"crack sauce", category_id : 3}

  ]);
};