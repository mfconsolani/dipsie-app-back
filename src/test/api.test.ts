import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";
import { token } from "../helpers";

const api = supertest(app);

let authToken: any;

beforeAll(async () => {
  authToken = await token();
  return;
});

describe("GET /interview/ endpoint", () => {
  test("With auth0 token", async () => {
    await api
      .get("/interview/")
      .set("Authorization", "Bearer " + authToken)
      .expect(200)
      .expect((response) => expect(response.body).toBe("interview endpoint"));
  });

  test("Without Auth0 Token", async () => {
    await api.get("/interview/").expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
