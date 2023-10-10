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
  statename: "Test State",
  lastActive: true,
};
const userOneId =ObjectId('6524e1a2f5f7b76fb49c9988')
const userOne = {
  _id: userOneId,
  username: "Test User",
  password: "Test Password",
  lastActive: true,
  token: 
      // jwt.sign({ _id: userOneId }, "123456789"),
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI0ZTFhMmY1ZjdiNzZmYjQ5Yzk5ODgiLCJpYXQiOjE2OTY5MTU4NzV9.UQNDAMS0iHQrA7DDiskdO81KMsJc9A-BPC_gAo3X_S8'
};

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
