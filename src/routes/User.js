import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  loginUserHandler,
  updateUserHandler,
} from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsersHandler);

router.get("/:id", getUserHandler);

router.post("/", createUserHandler);

router.delete("/:id", deleteUserHandler);

router.put("/:id", updateUserHandler);

router.post("/login", loginUserHandler);

export default router;
