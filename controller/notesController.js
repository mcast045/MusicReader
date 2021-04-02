const Note = require('../models/notesModel')
const Song = require('../models/songsModel')
const { catchBlockErrorMessage } = require('./userController')

exports.getNotes = async (req, res, next) => {
    try {
        //Force songId to be defined before Notes.find()
        //Create new song sometimes failed 
        await Song.findById(req.params.songId)
        const notes = await Note.find({ songId: req.params.songId })
        res.json(notes)
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.postNotes = async (req, res, next) => {
    try {
        const songNotes = req.body
        let oldNote = await Note.find({ songId: req.params.songId })

        //Update
        if (oldNote.length > 0) {
            oldNote = await Note.findOneAndUpdate({ songId: req.params.songId }, { $set: { notes: songNotes } }, { $new: true })
            return res.json(oldNote)
        }
        //Create 
        else {
            const newNote = new Note({
                userId: req.user._id,
                songId: req.params.songId,
                notes: songNotes
            })
            const note = await newNote.save()
            res.json(note)
        }
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}