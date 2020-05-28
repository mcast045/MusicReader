const Song = require('../models/songsModel')
const Note = require('../models/notesModel')
const User = require('../models/userModel')

const errorMessage = 'Server Error'

exports.getUserSong = async (req, res, next) => {
    try {
        const userSongs = await Song.find({ userId: req.params.id })
        const selectedSong = userSongs.find(song => song.id === req.params.songId)
        res.json(selectedSong)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(errorMessage)
    }
}

exports.getPublishedSong = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId)
        res.json(song)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(errorMessage)
    }
}

exports.getPublishedSongs = async (req, res, next) => {
    try {
        const publishedSongs = await Song.find({ isPublished: true })
        res.json(publishedSongs)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(errorMessage)
    }
}

exports.postSong = async (req, res, next) => {
    try {
        const author = await User.findById(req.user._id)

        const newSong = new Song({
            title: req.body.title,
            tempo: req.body.tempo,
            keySignature: req.body.keySignature,
            author: author.username,
            userId: req.user._id
        })

        const song = await newSong.save()
        res.json(song)
    }
    catch (err) {
        console.log('POST Songs')
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.publishSong = async (req, res, next) => {
    try {
        const song = await Song.findOneAndUpdate({ _id: req.params.songId }, { $set: { isPublished: true } }, { new: true })
        return res.json(song)
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.redactSong = async (req, res, next) => {
    try {
        const song = await Song.findOneAndUpdate({ _id: req.params.songId }, { $set: { isPublished: false } }, { new: true })
        return res.json(song)
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.deleteSong = async (req, res, next) => {
    try {
        await Note.findOneAndRemove({ songId: req.params.songId })
        await Song.findOneAndRemove({ _id: req.params.songId })

        res.json({ msg: 'Song Removed' })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

//-------------------- MONGODB SONG CONTROLLER --------------------
// exports.getAllSongs = (req, res, next) => {
//     try {
//         const song = Song.getAllSongs()
//         res.json(song)
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(500).send('Server Error')
//     }
// }

// exports.createSong = (req, res, next) => {
//     try {
//         const title = req.body.title
//         const description = req.body.description
//         const tempo = req.body.tempo
//         const notes = req.body.notes

//         const song = new Song(title, description, tempo, notes)
//         song.save()
//         return res.json(song)

//     } catch (err) {
//         return res.status(500).send('Server Error')
//     }
// }