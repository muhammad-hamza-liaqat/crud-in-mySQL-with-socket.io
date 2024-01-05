const express = require("express");
const userRoutes = express.Router();
const {
  registerGet,
  registerUser,
  deleteUser,
  findAll, updateUser
} = require("../controller/userController");

userRoutes.route("/register").get(registerGet).post(registerUser);
userRoutes.route("/delete").delete(deleteUser);
userRoutes.route("/all").get(findAll);
userRoutes.route("/edit/:email").patch(updateUser)
module.exports = userRoutes;
