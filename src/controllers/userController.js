const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// GET /worko/user
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /worko/user/:userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /worko/user
router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    // Send verification email to newUser.email
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /worko/user/:userId
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /worko/user/:userId
router.delete("/:userId", async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
