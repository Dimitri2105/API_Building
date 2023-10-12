const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const app = require("../app");
const User = require("../modals/districtModel");
const supertest = require("supertest");

const userOneId = ObjectId("6524e1a2f5f7b76fb49c9988");
const userOne = {
  _id: userOneId,
  username: "Test User",
  password: "Test Password",
  lastActive: true,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI2Nzk2MjcxNTExZjI1MDQ0ZTExODAiLCJpYXQiOjE2OTcwMjAyNTh9.y5Z0M22R-_PVt0RphfsG9fZk2HTUifNVI4BOZS8nP8M",
};

