import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controllers.js";

export const userrouter = Router();

userrouter.route("/register").post(registerUser);
userrouter.route("/login").post(loginUser);
userrouter.route("/logout").post(logoutUser);