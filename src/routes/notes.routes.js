import { Router } from "express";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/notes.controllers.js";

import { authJWT } from "../middlewares/auth.middlewares.js";

export const notesRouter = Router();

// Protected routes
notesRouter.route("/").post(authJWT, createNote);
notesRouter.route("/").get(authJWT, getAllNotes);

notesRouter.route("/:id").get(authJWT, getNoteById);
notesRouter.route("/:id").patch(authJWT, updateNote);
notesRouter.route("/:id").delete(authJWT, deleteNote);