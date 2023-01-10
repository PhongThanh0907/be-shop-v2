import asyncHandler from "express-async-handler";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from "../services/User.js";

export const getUsersHandler = asyncHandler(async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

export const getUserHandler = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
});

export const createUserHandler = asyncHandler(async (req, res) => {
  const createdUser = await createUser(req.body);
  res.status(200).json(createdUser);
});

export const deleteUserHandler = asyncHandler(async (req, res) => {
  await deleteUser(req.params.id);
  res.status(200).json({
    message: `User ${req.params.id} have been deleted`,
  });
});

export const updateUserHandler = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.status(200).json(user);
});

export const loginUserHandler = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body.email, req.body.password);
  res.status(201).json(user);
});
