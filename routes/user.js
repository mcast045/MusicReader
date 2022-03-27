const router = require('express').Router()
const { getAllUsers, loadUser, logoutUser, registerUser, loginUser, deleteUser } = require('../controller/userController')
const { check } = require('express-validator')

router.get('/', getAllUsers)
router.get('/:userId', loadUser)
router.post('/logout', logoutUser)
router.post('/register',
    [
        check('username', 'Username should only contain letters and numbers').isAlphanumeric(),
        check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
        check('password', 'Password must have at least 3 characters').isLength({ min: 3 }).trim(),
        check('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords must match')
            return true
        })
    ], registerUser)

router.post('/login',
    [
        check('email', 'Invalid Credentials').isEmail().normalizeEmail(),
        check('password', 'Invalid Credentials').isLength({ min: 3 }).trim()
    ], loginUser)

router.delete('/', deleteUser)

module.exports = router