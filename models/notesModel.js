const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
    notes: [
        [
            {
                notePath: {
                    type: String
                },
                type: {
                    type: String
                },
                transform: {
                    type: String
                },
                draggable: {
                    type: Boolean
                },
                letter: {
                    type: String
                },
                accidental: {
                    type: String
                },
                tabPosition: {
                    type: Number
                },
                row: {
                    type: Number
                },
                tabRow: {
                    type: Number
                }
            }
        ]
    ],
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    songId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Song'
    }
})

module.exports = mongoose.model('Notes', notesSchema)