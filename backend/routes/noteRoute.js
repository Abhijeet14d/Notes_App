const express = require('express');

const router = express.Router();
const { createNote, editNote, getNotes, deleteNote, updateisPinned, searchNotes } = require('../controllers/notesController');
const { generateAccessToken } = require('../utils/jwt');

router.post('/create', generateAccessToken,createNote);

router.put('/edit/:id', generateAccessToken, editNote);

router.get('/allNotes', generateAccessToken, getNotes);

router.delete('/delete/:id', generateAccessToken, deleteNote);

router.put('/pin/:id', generateAccessToken, updateisPinned);

router.get('/search/', generateAccessToken, searchNotes);

module.exports = router;