const router = require('express').Router()
const notesController = require('../controller/notesController')

router.get('/:songId', notesController.getNotes)
router.post('/:songId', notesController.postNotes)

module.exports = router