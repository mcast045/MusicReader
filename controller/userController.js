const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Song = require('../models/songsModel')
const Note = require('../models/notesModel')
const { validationResult } = require('express-validator')

const errorMessage = 'Server Error'
exports.loadUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const song = await Song.find({ userId: userId }, null, { sort: { date: -1 } })
        const notes = await Note.find({ userId: userId })
        const user = await User.findById(userId).select('-password')

        res.json({ song: song, notes: notes, user: user })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const { email, password, username } = req.body
        const existingUser = await User.findOne({ email: email })

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 12)

        if (!existingUser) {
            const newUser = new User({
                password: hashedPassword,
                email,
                username
            })

            const user = await newUser.save()
            req.session.isLoggedIn = true
            req.session.user = user
            res.json(user)
        }
        else if (existingUser)
            return res.status(400).json({ errors: [{ msg: 'Email is already in use' }] })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    try {
        if (!user)
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

        else if (isMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            res.json(user)
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}

exports.logoutUser = (req, res, next) => {
    req.session.destroy()
}

exports.deleteUser = async (req, res, next) => {
    try {
        await Note.deleteMany({ userId: req.session.user._id })
        await Song.deleteMany({ userId: req.session.user._id })
        await User.findByIdAndRemove(req.session.user._id)
        req.session.destroy()

        res.json({ msg: 'User deleted' })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send(errorMessage)
    }
}