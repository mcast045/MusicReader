const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tempo: {
        type: Number,
        required: true
    },
    keySignature: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    author: { type: String },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Song', songSchema)

//-------------------- MONGODB SONG MODEL --------------------
// const mongodb = require('mongodb')
// const { getDb } = require('../util/db')

// class Song {
//     constructor(title, description, tempo, notes, id) {
//         this.title = title
//         this.description = description
//         this.tempo = tempo
//         this.notes = notes
//         this._id = id ? new mongodb.ObjectId(id) : null
//     }

//     save() {
//         try {
//             const db = getDb()
//             let dbOperation

//             if (this._id) {
//                 dbOperation = db.collection('song').updateOne({ _id: this._id }, { $set: this })
//             } else {
//                 dbOperation = db.collection('song').insertOne(this)
//             }
//             return dbOperation
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     static getAllSongs() {
//         const db = getDb()
//         try {
//             db.collection('songs').find().toArray()
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
// }

// module.exports = Song