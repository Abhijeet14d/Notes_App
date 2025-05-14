const Note = require('../models/notesModel');

const createNote = async (req, res)=>{
    try {
        const { title, content, tags } = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const newNote = await Note.create({
            title,
            content,
            tags,
            userId: req.user.id,
        });
        res.status(201).json({
            message: "Note created successfully",
            note: newNote,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const editNote = async (req, res)=>{
    try {
        const noteId = req.params.id;
        const { title, content, tags, isPinned } = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        if(note.userId.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to edit this note"});
        }
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.isPinned = isPinned;
        await note.save();
        res.status(201).json({
            message: "Note updated successfully",
            note,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const getNotes = async (req, res)=>{
    try {
        const notes = await Note.find({userId: req.user.id}).sort({isPinned: -1});
        if(!notes){
            return res.status(404).json({message: "No notes found"});
        }
        res.status(201).json({
            message: "Notes fetched successfully",
            notes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const deleteNote = async (req, res)=>{
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }   
        if(note.userId.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to delete this note"});
        }
        await note.remove();
        res.status(201).json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const updateisPinned = async (req, res)=>{
    try {
        const noteId = req.params.id;
        const { isPinned } = req.body;
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        if(note.userId.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to pin this note"});
        }
        note.isPinned = isPinned || false;
        await note.save();
        res.status(201).json({
            message: "Note pinned successfully",
            note,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};


module.exports = {
    createNote,
    editNote,
    getNotes,
    deleteNote,
    updateisPinned,
};