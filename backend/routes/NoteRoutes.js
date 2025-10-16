const router = require('express').Router({mergeParams: true});
const { getNotes, getNoteById, updateNote, createNote } = require('../controllers/NoteController');
const { validateNote, validateObjectId } = require('../middlewares/validationMiddleware');
const authProtect = require('../middlewares/AuthMiddleware')

// fetch all notes
router.get('/', authProtect, validateObjectId('ticketId'), getNotes);

// fetch note by id
router.get('/:noteId', authProtect, validateObjectId('noteId'),  getNoteById);

// create a note
router.post('/', authProtect, validateNote, createNote);

// edit note
router.put('/:noteId', authProtect, validateObjectId,validateNote, updateNote)

module.exports = router;