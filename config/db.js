const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log('MongoDb Connected!!')
    }
    catch (err) {
        console.error(err.mongoose)
        process.exit(1)
    }
}

module.exports = connectDb