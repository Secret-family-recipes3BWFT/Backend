
## Secret Family Recipes API Documentation

## Base Url: // https://build-week-secret-recipes-api.herokuapp.com/

### Status Codes ###

  200 Successful
  400 Bad Request
  401 Unauthorized
  404 Not Found
  500 Server Error

### POST to _/api/auth/register_ ### 
```json
    ///expecting json

{
  "username": "username",
  "password": "password"
}

```
### POST to _/api/auth/login_ 

```json
    ///expecting json

{
  "username": "email",
  "password": "password"
}

```
Returns message, token, and user_id.

The following endpoints require a JWT => axiosWithAuth( ) 

## GET to _/api/recipes_

Returns  all recipes

## GET to _`/api/recipes?category=${categoryName}`_

Returns all recipes with that category name

### GET /api/recipes/my-recipes

Returns **recipes tied to the user logged in**

###  GET to _/api/recipes/:id_

 id of the recipe you want

 Returns recipe linked to that recipe_id


### POST to /api/recipes

 expecting json
 
 ``` json

{
    "title": "title",
    "source": "source",
    "ingredients": "ingredients",
    "instructions": "instructions",
    "category": "category"
}

```

### PUT to /api/recipes/:id

    id must be the recipe_id

 ``` json expecting json

{
  "title": "title",
  "source": "source",
  "ingredients" : "ingredients",
  "instructions" : "instruction",
  "category":"category"
}

```

### DELETE to /api/recipes/:id

id must be the recipe_id
