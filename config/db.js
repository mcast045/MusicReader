const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDb = () => {
    try {
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log('MongoDb Connected!!')
    }
    catch (err) {
        console.error(err.mongoose)
        process.exit(1)
    }
}

module.exports = connectDb

//-------------------- MONGODB ONLY CONNECTION --------------------
// const mongodb = require('mongodb').MongoClient

// let _db

// const mongoConnect = async () => {
//     try {
//         await mongodb.connect(
//             'mongodb+srv://testUser:kGB9VS0hSouUj1nZ@cluster0-ebbsz.mongodb.net/test?retryWrites=true&w=majority',
//             { useNewUrlParser: true, useUnifiedTopology: true }
//         )
//             .then(client => {
//                 console.log('MongoDb Connected!')
//                 _db = client.db()
//             })
//     }
//     catch (err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

// const getDb = () => {
//     if (_db)
//         return _db
//     else
//         throw 'No Database Found!'
// }

// module.exports = {
//     mongoConnect,
//     getDb
// }