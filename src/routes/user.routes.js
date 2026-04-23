import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser } from "../controllers/user.controllers.js";
import { authJWT } from "../middlewares/auth.middlewares.js";

export const userrouter = Router();

userrouter.route("/register").post(registerUser);
userrouter.route("/login").post(loginUser);
userrouter.route("/logout").post(authJWT, logoutUser);
userrouter.route("/refresh").post(refreshAccessToken);
userrouter.route("/getUser").post(authJWT, getCurrentUser);