const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");



const registerGet = (req, res) => {
  res.end("hello from controller");
};
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log("user created");
    return res.status(201).json({ message: "user created!" });
  } catch (error) {
    console.log("internal server error- register user", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "all fields required" });
  }
  try {
    const userDelete = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!userDelete) {
      return res.status(400).json({ message: "Invalid email" });
    }
    console.log("user to be deleted: ", userDelete);
    await userDelete.destroy();
    return res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log("error=>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findAll = async (req, res) => {
  try {
    const user = await userModel.findAll();
    console.log(user);
    return res.status(201).json({ message: "all users feteched", user: user });
  } catch (error) {
    console.log("error=>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const {updatedFirst, updatedLast, updatedPassword} = req.body;
  if (!email) {
    return res.status(400).json({ message: "email required" });
  }
  try {
    const findUser = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!updatedFirst || !updatedLast || !updatedPassword){
        return res.status(400).json({message: "updated password required"})
    }
    const updatedHashedPassword = await bcrypt.hash(updatedPassword,10);
    await findUser.update({
        firstName: updatedFirst,
        lastName: updatedLast,
        password: updatedHashedPassword,
    })
    console.log("user updated");
    return res.status(201).json({message: "user updated"})

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { registerGet, registerUser, deleteUser, findAll, updateUser };
