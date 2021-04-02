const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/userModel')
const sessionsImport = require('./middleware/Session')
const path = require('path')
const connectDB = require('./config/db')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DB Connection
connectDB()

//Create Session
app.use(sessionsImport)

//Middleware to store user in req
app.use(async (req, res, next) => {
    if (!req.session.user)
        return next()

    const user = await User.findById(req.session.user._id)
    req.user = user
    next()
})

app.use('/songs', require('./routes/songs'))
app.use('/notes', require('./routes/notes'))
app.use('/user', require('./routes/user'))

//Serve static assests in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))