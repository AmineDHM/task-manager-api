const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "User One",
  email: "user1@exemple.com",
  password: "User@123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "User Two",
  email: "user5@exemple.com",
  password: "User@123",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_TOKEN),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task One",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task Two",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task Three",
  completed: true,
  owner: userTwoId,
};

const setupDataBase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDataBase,
};
