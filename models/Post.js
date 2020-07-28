const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    visibility: {
        type: String,
        value: '',
        default: "Public"
    },
    comments: [
        {
            text: String,
            userID: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
})

module.exports = User = mongoose.model('posts', PostSchema)