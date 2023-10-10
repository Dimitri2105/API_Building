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

// const userOneId = new mongoose.Types.ObjectId();
// const userOne = {
//   _id: userOneId,
//   username: "Test User 7",
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

// beforeAll(async ()=>{
//   await User.remove({});
// })
// // afterAll(async () => {
// //   await app.close()
// //   await new Promise((resolve) => app.close(resolve));
// // });
// describe(" POST /API/logIn", () => {
// //   describe("given password and username are absent", () => {
// //     const tests = [
// //       { title: "Password missing", body: { username: "Test User" } },
// //       { title: "Username missing", body: { password: "Test Password" } },
// //       { title: "Password and username missing", body: {} },
// //     ];

// //     for (let testCase of tests) {
// //       test(testCase.title, async () => {
// //         const response = await supertest(app)
// //           .post("/API/LogIn")
// //           .send(testCase.body);
// //         expect(response.status).toBe(400);
// //         expect(response.body).toHaveProperty("message");
// //         expect(response.body.success).toBe(false);
// //       });    
// //     }
// //   });
//   test("Both username and password sent", async () => {
//     const newUser = {
//       username: userOne.username,
//       password: userOne.password,
//     };

//     const response = await supertest(app).post("/API/LogIn").send(newUser);
//     console.log(response)
//     expect(response.status).toBe(200);
//     expect(response.body.token).toBeDefined();
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe("User logged in !!! ");
//     userToken = response.body.token;
//   });
// });

// // describe(" GET /API/logOut", () => {
// //   test("when user logs out", async () => {
// //     const response = await supertest(app)
// //       .get("/API/logOut")
// //       .set("Authorization", `${userOne.tokens[0].token}`);
// //     expect(200);
// //   });
// // });
