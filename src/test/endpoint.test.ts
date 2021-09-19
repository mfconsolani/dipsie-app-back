import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";
import { token } from "../helpers";
import dotenv from "dotenv";
import * as config from "../config";
import { User } from '../models/userModel';
import { userAdmin, candidateThree } from './user'

  
  dotenv.config();
  const api = supertest(app);
  let authToken: any;
  let db: any;
  
  beforeAll(async () => {
    mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Console Error:"));
    db.once("open", () => console.log(`App connected to "${db.name}" database`));
    authToken = await token();
  });
  

describe("GET /interview/:idCandidate", () => {

  beforeEach(async ()=> {
    await User.deleteMany()
    await new User({
      username: userAdmin.username,
      email: userAdmin.email,
      role: userAdmin.role,
      candidates: userAdmin.candidates
    }).save();  
  })

  test("With auth0 and read permission", async () => {
    const response = await api
      .get("/interview/1")
      .set("Authorization", "Bearer " + authToken)
      .expect(200);
  });

  test("Without auth0 and read permission", async () => {
    await api.get("/interview/1").expect(401);
  });
});


describe("GET /interview/ endpoint", () => {
  test("With auth0 token", async () => {
    try {
      await api
        .get("/interview/")
        .set("Authorization", "Bearer " + authToken)
        .expect(200)
        .expect((response) => expect(response.body).toBe("interview endpoint"));
    } catch (err) {
      expect(err).toMatch("error");
    }
  });

  test("Without Auth0 Token", async () => {
    await api.get("/interview/").expect(401);
  });
});


describe("POST /user/", () => {

  beforeEach(async ()=> {
    await User.deleteMany()
    // console.log(await userToCreate[0])
  })

  test("Create user with auth0 and create permission", async () => {
    await api
      .post("/user/")
      .set("Authorization", "Bearer " + authToken)
      .send({
        username: userAdmin.username,
        email: userAdmin.email,
        role: userAdmin.role,
        candidates: []
      })
      .expect(200);

      const findUser = await User.find({email:userAdmin.email})
      expect(findUser[0].email).toMatch(userAdmin.email)
  });

  test("Create user without auth0 and creae permission", async () => {
    await api
    .post("/user/")
    .send({
      username: userAdmin.username,
      email: userAdmin.email,
      role: userAdmin.role,
      candidates: []
    })
    .expect(401);
  });
});

describe("POST /user/", () => {

  beforeEach(async ()=> {
    await User.deleteMany()
    // console.log(await userToCreate[0])
  })

  test("Post candidate with auth0 and create permission", async () => {
    await api
      .post("/interview/")
      .set("Authorization", "Bearer " + authToken)
      .send(candidateThree)
      .expect(200);

      // const findUser = await User.find({email:userAdmin.email})
      // expect(findUser[0].email).toMatch(userAdmin.email)
  });

  test("Post candidate without auth0 and create permission", async () => {
    await api
    .post("/interview/")
    .send(candidateThree)
    .expect(401);
  });
});


// @ts-ignore
afterAll(async () => {
  try {
    await db.close();
  } catch (err) {
    return err;
  }
});
