
const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../data/dbConfig");


describe('Server End Points', () => {
  describe("GET to /", () => {

    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });

    it("returns status code", () => {
      return supertest(server)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ api: "test running"})
      })
    });
  })
  
  const credentials = {username: "whatever", password: "pass" }
  describe('POST to /register', () => {
    it("should create an account and return 201 status code", async () =>{
      try{
      await supertest(server).post("https://build-week-secret-recipes-api.herokuapp.com/api/auth/register")
      .send(credentials)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toBe({ token })
      })
      } catch(error) {
        console.log(error)
      }
    })
  })

  describe("POST to /login", () => {
    it("Should login user and return status code 200", async() =>{
      try {
        await supertest(server).post("https://build-week-secret-recipes-api.herokuapp.com/api/auth/login")
        .send(credentials)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: "Welcome user"})
        })

      } catch (error) {
        console.log(error) ;
      }
    })
  })
  
})
