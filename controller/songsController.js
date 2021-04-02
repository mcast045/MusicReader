const Song = require('../models/songsModel')
const Note = require('../models/notesModel')
const User = require('../models/userModel')
const { catchBlockErrorMessage } = require('./userController')

const ITEMS_PER_PAGE = 10

exports.getUserSong = async (req, res, next) => {
    try {
        const userSongs = await Song.find({ userId: req.params.id })
        const selectedSong = userSongs.find(song => song.id === req.params.songId)
        if (!selectedSong) throw new Error('No Song Found')
        res.json(selectedSong)
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.getPublishedSong = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId)
        res.json(song)
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.getFilteredSong = async (req, res, next) => {
    try {
        const { title, author } = req.body
        let song
        let totalMatches

        if (title && author) {
            song = await Song.find({ title, author, isPublished: true })
            totalMatches = await Song.countDocuments({ title, author, isPublished: true })
        }

        else if (title && !author) {
            song = await Song.find({ title, isPublished: true })
            totalMatches = await Song.countDocuments({ title, isPublished: true })
        }

        else if (!title && author) {
            song = await Song.find({ author, isPublished: true })
            totalMatches = await Song.countDocuments({ author, isPublished: true })
        }


        res.json({ song, totalMatches })
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.getPublishedSongs = async (req, res, next) => {
    try {
        const page = +req.query.page || 1

        const totalPublishedSongs = await Song.countDocuments({ isPublished: true })

        const publishedSongs = await Song.find({ isPublished: true })
            .sort({ date: -1 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)

        res.json({ published: publishedSongs, count: totalPublishedSongs })
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
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
        return catchBlockErrorMessage(res, err)
    }
}

exports.publishSong = async (req, res, next) => {
    try {
        const song = await Song.findOneAndUpdate({ _id: req.params.songId }, { $set: { isPublished: true } }, { new: true })
        return res.json(song)
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.redactSong = async (req, res, next) => {
    try {
        const song = await Song.findOneAndUpdate({ _id: req.params.songId }, { $set: { isPublished: false } }, { new: true })
        return res.json(song)
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}

exports.deleteSong = async (req, res, next) => {
    try {
        await Note.findOneAndRemove({ songId: req.params.songId })
        await Song.findOneAndRemove({ _id: req.params.songId })

        res.json({ msg: 'Song Removed' })
    }
    catch (err) {
        return catchBlockErrorMessage(res, err)
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