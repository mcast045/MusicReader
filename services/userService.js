const User = require('../models/userModel')
const Song = require('../models/songsModel')
const Note = require('../models/notesModel')
const bcrypt = require('bcryptjs')

exports.getUsers = async () => User.find().select('-password')
exports.getUserById = async (userId) => await User.findById(userId).select('-password')
exports.returnError = (res, message) => res.status(400).json({ errors: [{ msg: message }] })
exports.getUserNotes = async (userId) => await Note.find({ userId: userId })
exports.destorySession = session => session.destroy()
exports.getUserByEmail = async (email) => await User.findOne({ email })
exports.deleteUserSongs = async (id) => await Song.deleteMany({ userId: id })
exports.deleteUserNotes = async (id) => await Note.deleteMany({ userId: id })
exports.hashUserPassword = async (password) => await bcrypt.hash(password, 12)
exports.deleteUserAccount = async (id) => await User.findByIdAndRemove(id)
exports.getAndSortUserSongs = async (userId) => await Song.find({ userId: userId }, null, { sort: { date: -1 } })
exports.compareUserHashPassword = async (password, user) => await bcrypt.compare(password, user.password)



exports.postNewUser = async (username, email, password) => {
    const newUser = new User({ username, email, password })
    return await newUser.save()
}

exports.createUserSession = (user, session) => {
    session.isLoggedIn = true
    session.user = user
}