require('dotenv').config();
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'session'
})

module.exports = (session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))