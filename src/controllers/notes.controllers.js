import { Notes } from "../models/notes.models.js";

// Create Note
export const createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Notes.create({
        title,
        content,
        owner: req.user._id
    });

    return res.status(201).json({
        message: "Note created",
        data: note
    });
};


// Get All Notes (logged-in user only)
export const getAllNotes = async (req, res) => {
    const notes = await Notes.find({ owner: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Notes fetched",
        data: notes
    });
};



// Get Single Note
export const getNoteById = async (req, res) => {
    const note = await Notes.findOne({
        _id: req.params.id,
        owner: req.user._id
    });

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
        data: note
    });
};



// Update Note
export const updateNote = async (req, res) => {
    const { title, content } = req.body;

    const note = await Notes.findOneAndUpdate(
        {
            _id: req.params.id,
            owner: req.user._id
        },
        {
            $set: { title, content }
        },
        { new: true }
    );

    if (!note) {
        return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    return res.status(200).json({
        message: "Note updated",
        data: note
    });
};




// Delete Note
export const deleteNote = async (req, res) => {
    const note = await Notes.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
    });

    if (!note) {
        return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    return res.status(200).json({
        message: "Note deleted"
    });
};