const { validationResult } = require('express-validator')
const { getUserById, getUserNotes, getAndSortUserSongs, getUsers, getUserByEmail, deleteUserAccount, deleteUserSongs, deleteUserNotes, hashUserPassword, compareUserHashPassword, postNewUser, createUserSession, returnError, destorySession } = require('../services/userService')



const catchBlockErrorMessage = (res, err) => {
    console.log(err.message)
    return res.status(500).send('Server Error')
}



exports.loadUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const song = await getAndSortUserSongs(userId)
        const notes = await getUserNotes(userId)
        const user = await getUserById(userId)
        res.json({ song: song, notes: notes, user: user })
    } catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}



exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}



exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const { username, email, password } = req.body
        const existingUser = await getUserByEmail(email)

        if (!existingUser) {
            const hashedPassword = await hashUserPassword(password)
            const newUser = await postNewUser(username, email, hashedPassword)
            createUserSession(newUser, req.session)
            res.json(newUser)
        } else if (existingUser) return returnError(res, 'Email is already in use')
    } catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}



exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body
    const returningUser = await getUserByEmail(email)

    try {
        if (!returningUser)
            return returnError(res, 'Invalid Credentials')

        const isMatch = await compareUserHashPassword(password, returningUser)

        if (isMatch) {
            createUserSession(returningUser, req.session)
            res.json(returningUser)
        } else return returnError(res, 'Invalid Credentials')

    } catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}



exports.logoutUser = (req, res, next) => {
    destorySession(req.session)
    res.json({ msg: "User Logged Out" })
}



exports.deleteUser = async (req, res, next) => {
    try {
        await deleteUserNotes(req.session.user._id)
        await deleteUserSongs(req.session.user._id)
        await deleteUserAccount(req.session.user._id)
        destorySession(req.session)
        res.json({ msg: 'User deleted' })
    } catch (err) {
        return catchBlockErrorMessage(res, err)
    }
}