test("hello", () => {});

// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// const app = require("../app");
// const State = require("../modals/stateModel");
// const supertest = require("supertest");
// const config = require('./config/userInfo')


// const stateOneId = new mongoose.Types.ObjectId();
// const stateOne = {
//   _id: stateOneId,
//   statename: "Test State 21",
//   lastActive: true,
// };
// let token;
// beforeAll(async () => {
//     token = config.getToken()
// });

// describe("/API/create-state", () => {
//   test("when statename is sent ", async () => {
//     const state = { statename: stateOne.statename };
//     const response = await supertest(app)
//       .post("/API/create-state")
//       .set("Authorization", `${token}`)
//       .send(state)
//       .expect(200);
//     expect(response.body).toHaveProperty("message");
//     expect(response.body.success).toBe(true);
//   });
//   test("when statename is missing", async () => {
//     const state = { statename: "" };
//     const response = await supertest(app)
//       .post("/API/create-state")
//       .set("Authorization", `${token}`)
//       .send(state)
//       .expect(400);

//     expect(response.body).toHaveProperty("message");
//     expect(response.body.success).toBe(false);
//   });
//   test("when duplicate statnename added", async () => {
//     const existingState = new State({
//       statename: "Duplicate State",
//       isActive: true,
//     });
//     await existingState.save();

//     const state = { statename: "Duplicate State" };

//     const response = await supertest(app)
//       .post("/API/create-state")
//       .set("Authorization", `${token}`)
//       .send(state)
//       .expect(400);
//     expect(response.body.success).toBe(false);

//     expect(response.body.message).toBe("State Name already exists");
//   });
// });
// describe("/API/get-state", () => {
//   test("Get all states", async () => {
//     const response = await supertest(app)
//       .get("/API/get-state")
//       .set("Authorization", `${token}`);
//     expect(200);
//     expect(response.body).toHaveProperty("message");
//     expect(response.body.success).toBe(true);
//   });
// });
// describe("/API/update-state", () => {
//   test(" stateId missing in query params", async () => {
//     const newStateName = "Test State 25";

//     const response = await supertest(app)
//       .post("/API/update-state")
//       .set("Authorization", `${token}`)
//       .send({ statename: newStateName })
//       .expect(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe("Missing Fields");
//   });
//   test(" statename missing in body", async () => {
//     const stateFound = await State.findOne({ statename: stateOne.statename });
//     const response = await supertest(app)
//       .post("/API/update-state")
//       .set("Authorization", `${token}`)
//       .query({ stateId: stateFound.id })
//       .expect(400);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe("Missing Fields");
//   });
//   test("update state when state id and statename given ", async () => {
//     const newStateName = "Test State 2";

//     const stateFound = await State.findOne({ statename: stateOne.statename });

//     const response = await supertest(app)
//       .post("/API/update-state")
//       .set("Authorization", `${token}`)
//       .query({ stateId: stateFound.id })
//       .send({ statename: newStateName })
//       .expect(200);
//     expect(response.body.success).toBe(true);

//     expect(response.body.message).toBe("State updated successfully");
//   });
// });
// describe("/API/remove-state", () => {
//   test("stateId missing in query params", async () => {
//     const response = await supertest(app)
//       .post("/API/remove-state")
//       .set("Authorization", `${token}`)
//       .expect(400);
//     expect(response.body.success).toBe(false);

//     expect(response.body.message).toBe("Missing state Id");
//   });
//   test("stateId present in query params", async () => {
//     const state = { statename: "Remove State" };
//     const createStateResponse = await supertest(app)
//       .post("/API/create-state")
//       .set("Authorization", `${token}`)
//       .send(state)
//       .expect(200);
//     const removeId = createStateResponse.body.data.id;
//     const response = await supertest(app)
//       .post("/API/remove-state")
//       .set("Authorization", `${token}`)
//       .query({ stateId: removeId })
//       .expect(200);
//     expect(response.body.success).toBe(true);

//     expect(response.body.message).toBe("State Removed successfully");
//   });
// });
