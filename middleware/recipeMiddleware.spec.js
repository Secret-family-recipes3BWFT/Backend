const { getByCategory } = require("./recipeMiddleware");
const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../data/dbConfig");

describe('Recipe Middleware', () => {
  describe("getByCategory", () => {
    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });

    it("returns status code", () => {
      return supertest(server)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      })
    });
  })
})
