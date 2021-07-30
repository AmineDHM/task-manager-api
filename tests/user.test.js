const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { userOneId, userOne, setupDataBase } = require("./fixtures/db");

beforeEach(setupDataBase);

test("shoud signup new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Amine",
      email: "amine@exemple.com",
      password: "amine123",
    })
    .expect(201);
  //Assert that the user added correctly to db
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should fail to login wrong credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "wrongPW!1",
    })
    .expect(400);
});

test("should get the profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get the profile for unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete account for unauthorized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "New Name" })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("New Name");
});

test("should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "not found" })
    .expect(400);
});
