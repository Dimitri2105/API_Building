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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI2Nzk2MjcxNTExZjI1MDQ0ZTExODAiLCJpYXQiOjE2OTcwMjAyNTh9.y5Z0M22R-_PVt0RphfsG9fZk2HTUifNVI4BOZS8nP8M",
};

// beforeAll(async () => {
//   await Child.deleteMany({});
// });
beforeEach(async () => {
  await Child.deleteMany({});
});

afterEach(async () => {
  await Child.deleteMany({});
});

describe("/API/create-child", () => {
  beforeAll(async () => {
    await Child.deleteMany({});
  });
  test("When all fields are present", async () => {
    const child = {
      name: childOne.name,
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
      .expect(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.success).toBe(true);
  });
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
    expect(response.body.message).toBe("All fields are required ");
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
        query: { id: "1387" },
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
describe("/API/update-child", () => {
  test("When Id is missing", async () => {
    const newChild = {
      name: "Test Child update",
      sex: "Male",
      dob: "10-01-1999",
      father_name: "Test Father Name (updated)",
      mother_name: "Test Mother Name",
      district_id: "7",
      state_id: "7",
    };
    const response = await supertest(app)
      .post("/API/update-child")
      .set("Authorization", `${userOne.token}`)
      .send({ name: newChild.name })
      .expect(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Missing Id");
  });
  test(" When body is missing", async () => {
    const response = await supertest(app)
      .post("/API/update-child")
      .set("Authorization", `${userOne.token}`)
      .query({ id: "1387" })
      .expect(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Missing Some fields !!! ");
  });
  test("When body and Id are present ", async () => {
    const newChild = {
      name: "Test Child update",
      sex: "Male",
      dob: "10-01-1999",
      father_name: "Test Father Name (updated)",
      mother_name: "Test Mother Name  (updated)",
      district_id: "7",
      state_id: "7",
    };

    const response = await supertest(app)
      .post("/API/update-child")
      .set("Authorization", `${userOne.token}`)
      .query({ id: "1387" })
      .send(newChild)
      .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Child updated successfully");
  });
});
describe("/API/remove-child", () => {
  beforeAll(async () => {
    await Child.remove({ name: "Remove Child" });
  });
  test("Id missing in query params", async () => {
    const response = await supertest(app)
      .post("/API/remove-child")
      .set("Authorization", `${userOne.token}`)
      .expect(400);
    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Missing child Id");
  });
  test("Id present in query params", async () => {
    const child = {
      name: "Remove Child",
      sex: childOne.sex,
      dob: childOne.dob,
      father_name: childOne.father_name,
      mother_name: childOne.mother_name,
      district_id: childOne.district_id,
      state_id: childOne.state_id,
    };
    const createChildResponse = await supertest(app)
      .post("/API/create-child")
      .set("Authorization", `${userOne.token}`)
      .send(child)
      .expect(200);
    const removeId = createChildResponse.body.data.id;
    const response = await supertest(app)
      .post("/API/remove-child")
      .set("Authorization", `${userOne.token}`)
      .query({ id: removeId })
      .expect(200);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Child removed successfully");
  });
});
