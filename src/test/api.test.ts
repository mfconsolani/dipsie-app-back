import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";
import { token } from "../helpers";
import dotenv from "dotenv";
import * as config from "../config";

dotenv.config();

const api = supertest(app);

let authToken: any;
let db: any;

beforeAll(async() => {
    mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Console Error:"));
    db.once("open", () =>
      console.log(`App connected to "${db.name}" database`)
    );
    authToken = await token()
    await Promise.all(authToken)
});

// @ts-ignore
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

  // @ts-ignore
  test("Without Auth0 Token", async () => {
    await api
      .get("/interview/")
      .expect(401)
  });
});

describe("GET /interview/:idCandidate", () => {
  // @ts-ignore
  test("With auth0 and read permission", async () => {
       await api
        .get("/interview/1")
        .set("Authorization", "Bearer " + authToken)
        .expect(200)
  });

  test("Without auth0 and read permission", async () => {
    await api
     .get("/interview/1")
     .expect(401)
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
