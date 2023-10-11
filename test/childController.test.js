// test("hello" ,() =>{})

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const app = require("../app");
const Child = require("../modals/districtModel");
const supertest = require("supertest");

const childOneId = new mongoose.Types.ObjectId();
const childOne = {
  _id: childOneId,
  districtName: "Test District",
  State_id: "7",
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
  await District.deleteMany({});
});