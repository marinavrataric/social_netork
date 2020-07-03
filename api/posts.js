const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const Post = require('../models/Post')

// @route   POST /api/posts
// @desc    Create new post
// @access  Private

router.post('/', auth, (req, res) => {

    const newPost = new Post({
        userID: req.user.id,
        content: req.body.content
    })

    console.log('new post', newPost)

    newPost
        .save()
        .then(post => {
            res.json(post)
            console.log(post)
        })
        .catch(err => console.log(err))
})

// @route   GET /api/posts
// @desc    get all posts
// @access  Private

router.get('/', auth, (req, res) => {
    //console.log(req.user.id)
    Post
        .find()
        .sort({ date: -1 })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

//ne radi
// @route   GET /api/posts/:id
// @desc    get user post
// @access  Private

router.get('/user', auth, (req, res) => {
    console.log(req.params)
    Post
        .findById({ userID: req.user.id })
        .sort({ date: -1 })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, (req, res) => {
    console.log('deleted');

    Post
        .findById(req.params.id)
        .then(post => post.remove()
            .then(() => {
                console.log('deleted');
                res.json({ success_delete: true })
            })
            .catch(() => res.json({ success_delete: false })))
})

module.exports = router