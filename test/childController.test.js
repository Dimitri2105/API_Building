// test("hello" ,() =>{})

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const app = require("../app");
const Child = require("../modals/districtModel");
const supertest = require("supertest");

const childOneId = new mongoose.Types.ObjectId();
const childOne = {
  _id: childOneId,
  name: "Test Child",
  sex: "Male",
  dob: "10-01-1999",
  father_name: "Test Father Name",
  mother_name: "Test Mother Name",
  district_id: "7",
  state_id: "7",
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
  await Child.deleteMany({});
});
describe("/API/create-child", () => {
  // beforeAll(async () => {
  //   await Child.deleteMany({});
  // });
  // test("When all fields are present", async () => {
  //   const child = {
  //     name: childOne.name,
  //     sex: childOne.sex,
  //     dob: childOne.dob,
  //     father_name: childOne.father_name,
  //     mother_name: childOne.mother_name,
  //     district_id: childOne.district_id,
  //     state_id: childOne.state_id,
  //   };
  //   const response = await supertest(app)
  //     .post("/API/create-child")
  //     .set("Authorization", `${userOne.token}`)
  //     .send(child)
  //     .expect(200);
  //   expect(response.body).toHaveProperty("message");
  //   expect(response.body.success).toBe(true);
  // });
  test("When a field is missing", async () => {
    const child = {
      sex: childOne.sex,
      dob: childOne.dob,
      father_name: childOne.father_name,
      mother_name: childOne.mother_name,
      district_id: childOne.district_id,
      state_id: childOne.state_id,
    };
    const response = await supertest(app)
      .post("/API/create-child")
      .set("Authorization", `${userOne.token}`)
      .send(child)
      .expect(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("All fields are required ")
  });
});
describe("/API/get-child", () => {
  
  describe("Given either entity in query params", () => {
    // const childFound = await Child.findOne({ _id: ObjectId("652663826d5233765ce50c9b") });
    // console.log(childFound);
    const tests = [
      {
        testName: "Get all child without filters",
        query: {},
      },
      {
        testName: "Filter children with sex(Male)",
        query: { sex: "Male" },
      },
      {
        testName: "Filter children with state id",
        query: { state_id: "7" },
      },
      {
        testName: "Filter children with district_id",
        query: { district_id: "7" },
      },
        {
          testName: "Filter children with id",
          query : {id : '1387'}
        },
      {
        testName: "Filter children with Name",
        query: { name: "Test Child" },
      },
    ];
    for (let testCase of tests) {
      test(testCase.testName, async () => {
        const response = await supertest(app)
          .get("/API/get-child")
          .set("Authorization", `${userOne.token}`)
          .query(test.query)
          .expect(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.success).toBe(true);
      });
    }
  });
});
