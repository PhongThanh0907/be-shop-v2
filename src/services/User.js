import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";

import { generateToken } from "./tokenService.js";

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    if (!users) throw new Error("User not found");
    return users;
  } catch (error) {
    throw new Error(`Failed to get users: ${error.message}`);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  try {
    const newUser = await UserModel.create({
      userName: user.userName,
      email: user.email,
      password: hashedPassword,
      isAdmin: user.isAdmin,
    });

    if (!newUser) throw new Error("User not create");

    return {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      }),
    };
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const updateUser = async (userId, user) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`, 400);
  }
};

export const deleteUser = async (userId) => {
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
  } catch (error) {
    throw new Error(`Failed to deleted user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log(email);
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User is not found");
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password is not correct");

    return {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
      }),
    };
  } catch (error) {
    throw new Error(`Failed to login user: ${error.message}`);
  }
};
