import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.urlencoded({extended: false, limit: "16kb"}));
app.use(express.json({limit: "16kb"}));
app.use(cookieParser());



// importing user router
import { userrouter } from "./routes/user.routes.js";

app.use("/api/v1/users", userrouter);



import { notesRouter } from "./routes/notes.routes.js";

app.use("/api/v1/notes", notesRouter);
