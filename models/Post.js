const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = User = mongoose.model('posts', PostSchema)