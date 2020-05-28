const config = require('config')
const db = config.get('mongoURI');
const token = config.get('sessionSecret');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const store = new MongoDBStore({
    uri: db,
    collection: 'session'
})

module.exports = (session({
    secret: token,
    resave: false,
    saveUninitialized: false,
    store: store
}))