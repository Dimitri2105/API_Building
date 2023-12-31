test("hello" ,() =>{})
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
// const app = require("../app");
// const District = require("../modals/districtModel");
// const supertest = require("supertest");

// const districtOneId = new mongoose.Types.ObjectId();
// const districtOne = {
//   _id: districtOneId,
//   districtName: "Test District",
//   State_id: "7",
//   lastActive: true,
// };
// const userOneId = ObjectId("6524e1a2f5f7b76fb49c9988");
// const userOne = {
//   _id: userOneId,
//   username: "Test User",
//   password: "Test Password",
//   lastActive: true,
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI2Nzk2MjcxNTExZjI1MDQ0ZTExODAiLCJpYXQiOjE2OTcwMjAyNTh9.y5Z0M22R-_PVt0RphfsG9fZk2HTUifNVI4BOZS8nP8M",
// };

// beforeAll(async () => {
//   await District.deleteMany({});
// });

// describe("/API/create-district", () => {
//   test("when districtName  and stateID is sent ", async () => {
//     const district = {
//       districtName: districtOne.districtName,
//       State_id: districtOne.State_id,
//     };
//     const response = await supertest(app)
//       .post("/API/create-district")
//       .set("Authorization", `${userOne.token}`)
//       .send(district)
//       .expect(200);
//     expect(response.body).toHaveProperty("message");
//     expect(response.body.success).toBe(true);
//   });
//   test("given districtName and stateId are absent", async () => {
//     const tests = [{ districtName: "Test District 1 " }, { State_id: "5" }, {}];

//     for (test of tests) {
//       const response = await supertest(app)
//         .post("/API/create-district")
//         .set("Authorization", `${userOne.token}`)
//         .send(test)
//         .expect(400);

//       expect(response.body.success).toBe(false);
//       expect(response.body.message).toBe("State ID or District Name missing");
//     }
//   });
// });

// describe("/API/get-district", () => {
//   test("Get all districts when stateId is present", async () => {
//     const response = await supertest(app)
//       .get("/API/get-district")
//       .query({ state_id: "7" })
//       .set("Authorization", `${userOne.token}`)
//       .expect(200);
//     expect(response.body).toHaveProperty("message");
//     expect(response.body.success).toBe(true);
//   });
//   test("when stateId is missing", async () => {
//     const response = await supertest(app)
//       .get("/API/get-district")
//       .set("Authorization", `${userOne.token}`);
//     expect(400);
//     expect(response.body.message).toBe("State ID missing");
//     expect(response.body.success).toBe(false);
//   });
// });

// describe("/API/update-district" ,() =>{
//   test(" Id missing in query params", async () => {
//     const newDistrictName = "Test District 77";

//     const response = await supertest(app)
//       .post("/API/update-district")
//       .set("Authorization", `${userOne.token}`)
//       .send({ districtName: newDistrictName })
//       .expect(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe("Missing  Id or District Name ");
//   });
//     test(" District name missing in body", async () => {
//     const districtFound = await District.findOne({ districtName: districtOne.districtName });
//     const response = await supertest(app)
//       .post("/API/update-district")
//       .set("Authorization", `${userOne.token}`)
//       .query({ id: districtFound.id })
//       .expect(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe("Missing  Id or District Name ");
//   });
//   test("Update district when Id and district name  given ", async () => {
//     const newDistrictName = "Test District 21";

//     const districtFound = await District.findOne({ districtName: districtOne.districtName });
//     const response = await supertest(app)
//       .post("/API/update-district")
//       .set("Authorization", `${userOne.token}`)
//       .query({ id: districtFound.id })
//       .send({ districtName: newDistrictName })
//       .expect(200);
    
//     expect(response.body.success).toBe(true);

//     expect(response.body.message).toBe("District updated successfully");
//   });
// });
// describe("/API/remove-district" ,() =>{
//     test("Id missing in query params", async () => {
//     const response = await supertest(app)
//       .post("/API/remove-district")
//       .set("Authorization", `${userOne.token}`)
//       .expect(400);
//     expect(response.body.success).toBe(false);

//     expect(response.body.message).toBe("Missing Id");
//   });
//   test("Id present in query params", async () => {
//     const district = { districtName: "Remove District" ,State_id: "7", };
//     const createDistrictResponse = await supertest(app)
//       .post("/API/create-district")
//       .set("Authorization", `${userOne.token}`)
//       .send(district)
//       .expect(200);
//     const removeId = createDistrictResponse.body.data.id;
//     const response = await supertest(app)
//       .post("/API/remove-district")
//       .set("Authorization", `${userOne.token}`)
//       .query({ id: removeId })
//       .expect(200);
//     expect(response.body.success).toBe(true);

//     expect(response.body.message).toBe("District removed successfully");
//   });
  
// })