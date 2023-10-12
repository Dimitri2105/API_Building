test("hello" ,() =>{})

// import supertest from "supertest";
// // import app from "../app";
// import { logIn } from "../controllers/userController";
// import { logOut } from "../controllers/userController";
// import { request } from "express";
// import { json } from "body-parser";
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userController = require("../controllers/userController");
// const app = require("../app");
// const User = require("../modals/userModel");
// const config = require('./config/userInfo')
// console.log(config.getToken())

// const userOneId = new mongoose.Types.ObjectId();
// const userOne = {
//   _id: userOneId,
//   username: "Test User 21",
//   password: "Test Password",
//   lastActive: true,
//   tokens: [
//     {
//       token: jwt.sign({ _id: userOneId }, "123456789"),
//     },
//   ],
// };
// let userId;
// let userToken;
// // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjRlMWEyZjVmN2I3NmZiNDljOTk4OCIsImlhdCI6MTY5NzA5MzU0M30.U4h0wak0SkaWmhNuFCJE7q1B4PXK7tLMosjP0Sg46gw"
// // afterAll(async () => {
// //   await app.close()
// //   await new Promise((resolve) => app.close(resolve));
// // });
// describe(" POST /API/SignUp", () => {
//   describe("given password and username are absent", () => {
//     const tests = [
//       { title: "Password missing", body: { username: "Test User" } },
//       { title: "Username missing", body: { password: "Test Password" } },
//       { title: "Password and username missing", body: {} },
//     ];

//     for (let testCase of tests) {
//       test(testCase.title, async () => {
//         const response = await supertest(app)
//           .post("/API/SignUp")
//           .send(testCase.body);
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty("message");
//         expect(response.body.success).toBe(false);
//       });
//     }
//   });
//   test("Both username and password sent", async () => {
//     const newUser = {
//       username: userOne.username,
//       password: userOne.password,
//     };

//     const response = await supertest(app).post("/API/SignUp").send(newUser);
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("User Signed Up !!! ");
//     userToken = response.body.token;
//   });
// });

// describe("/API/LogIn", () => {
//   test(" When entered valid credentials", async () => {
//     const response = await supertest(app).post("/API/LogIn").send({
//       username: userOne.username,
//       password: userOne.password,
//     });
//     console.log(response.body)
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("User logged in !!! ");
//   });
//   describe("given password and username are absent", () => {
//     const tests = [
//       { title: "Password missing", body: { username: "Test User" } },
//       { title: "Username missing", body: { password: "Test Password" } },
//       { title: "Password and username missing", body: {} },
//     ];

//     for (let testCase of tests) {
//       test(testCase.title, async () => {
//         const response = await supertest(app)
//           .post("/API/LogIn")
//           .send(testCase.body);
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty("message");
//         expect(response.body.success).toBe(false);
//       });
//     }
//   });
// });

// // // // describe(" GET /API/logOut", () => {
// // // //   test("when user logs out", async () => {
// // // //     const response = await supertest(app)
// // // //       .get("/API/logOut")
// // // //       .set("Authorization", `${userOne.tokens[0].token}`);
// // // //     expect(200);
// // // //   });
// // // // });
