import mongoose, { Schema, model } from "mongoose";

const notesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Notes = model("Notes", notesSchema);