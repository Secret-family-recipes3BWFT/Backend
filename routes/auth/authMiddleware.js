const jwt = require("jsonwebtoken");

module.exports = {
  validCredentials,
};

function validCredentials(user){
  return Boolean(user.username && user.password && typeof user.password === "string");
} 