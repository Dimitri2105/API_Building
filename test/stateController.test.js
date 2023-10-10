const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stateController = require("../controllers/stateController");
const app = require("../app");
const State = require("../modals/stateModel");
const User = require("../modals/userModel");
const supertest = require("supertest");

const stateOneId = new mongoose.Types.ObjectId();
const stateOne = {
  _id: stateOneId,
  statename: "Test State 21",
  lastActive: true,
};
const userOneId = ObjectId("6524e1a2f5f7b76fb49c9988");
const userOne = {
  _id: userOneId,
  username: "Test User",
  password: "Test Password",
  lastActive: true,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI0ZTFhMmY1ZjdiNzZmYjQ5Yzk5ODgiLCJpYXQiOjE2OTY5MTU4NzV9.UQNDAMS0iHQrA7DDiskdO81KMsJc9A-BPC_gAo3X_S8",
};

beforeAll(async () => {
  await State.deleteMany({});
});

describe("/API/create-state", () => {
  test("when statename is sent ", async () => {
    const state = { statename: stateOne.statename };
    const response = await supertest(app)
      .post("/API/create-state")
      .set("Authorization", `${userOne.token}`)
      .send(state)
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.success).toBe(true);
  });
  test("when statename is missing", async () => {
    const state = { statename: "" };
    const response = await supertest(app)
      .post("/API/create-state")
      .set("Authorization", `${userOne.token}`)
      .send(state)
      .expect(400);

    // console.log("response is >>>>>>>>", response);
    expect(response.body).toHaveProperty("message");
    expect(response.body.success).toBe(false);
  });
  test("when duplicate statnename added", async () => {
    const existingState = new State({
      statename: "Duplicate State",
      isActive: true,
    });
    await existingState.save();

    const state = { statename: "Duplicate State" };

    const response = await supertest(app)
      .post("/API/create-state")
      .set("Authorization", `${userOne.token}`)
      .send(state)
      .expect(400);
    // console.log("response >>>>", response);
    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("State Name already exists");
  });
});
describe("/API/get-state", () => {
  test("Get all states", async () => {
    const response = await supertest(app)
      .get("/API/get-state")
      .set("Authorization", `${userOne.token}`);
    expect(200);
    // console.log("response is >>>>>>>>", response);
    expect(response.body).toHaveProperty("message");
    expect(response.body.success).toBe(true);
  });
});
describe("")