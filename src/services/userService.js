// src/services/userService.js
const User = require("../models/User");

const userService = {
  getUsers: async () => {
    return await User.find();
  },
  getUserById: async (userId) => {
    return await User.findById(userId);
  },
  createUser: async (userData) => {
    return await User.create(userData);
  },
  updateUser: async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  },
  deleteUser: async (userId) => {
    await User.findByIdAndDelete(userId);
  },
};

module.exports = userService;
