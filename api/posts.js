const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const Post = require('../models/Post')

// @route   DELETE /api/posts/comment/:id
// @desc    Delete comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );
  
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
   
      // Get remove index
      const removeIndex = post.comments
        .map(comment => comment.userID.toString())
        .indexOf(req.user.id);
  
      post.comments.splice(removeIndex, 1);
  
      await post.save();
  
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   PUT /api/posts/comment
// @desc    Create comment
// @access  Private

router.put('/comment', auth, (req, res) => {
    const comment = {
        text: req.body.text,
        userID: req.user.id
    }
    //console.log('body', req.body)
    //console.log('user', req.user.id)

    Post.findByIdAndUpdate((req.body.postId), {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate('comments.userID', "_id first_name last_name profile_image")
        .exec((err, result) => {
            if (err) res.status(422).json({ msg: err })

            //console.log('result', result.comments.userID)
            res.json(result)
        })
})

//obrisati
// @route   GET /api/posts/comment
// @desc    Get all posts
// @access  Private

router.get('/comment', auth, (req, res) => {
    Post.find()
        .populate('userID comments.userID', "_id first_name last_name profile_image")
        .sort({ registration_date: -1 })
        .then(result => res.json(result))
        .catch(err => res.json({ msg: err }))
})

// @route   PUT /api/posts/like
// @desc    Like post
// @access  Private

router.put('/like', auth, (req, res) => {
    //console.log('body', req.body)
    //console.log('user', req.user.id)

    Post.findByIdAndUpdate((req.body.postId), {
        $push: { likes: req.user.id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) res.status(422).json({ msg: err })
        res.json(result)
    })
})

// @route   PUT /api/posts/unlike
// @desc    Unlike post
// @access  Private

router.put('/unlike', auth, (req, res) => {
    //console.log('body', req.body)
    //console.log('user', req.user.id)

    Post.findByIdAndUpdate((req.body.postId), {
        $pull: { likes: req.user.id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) res.status(422).json({ msg: err })
        res.json(result)
    })
})


// @route   POST /api/posts
// @desc    Create new post
// @access  Private

router.post('/', auth, (req, res) => {

    const newPost = new Post({
        userID: req.user.id,
        content: req.body.content
    })

    //console.log('new post', newPost)

    newPost
        .save()
        .then(post => {
            res.json(post)
            //console.log(post)
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
        .populate('userID', 'first_name last_name profile_image _id')
        .sort({ registration_date: -1 })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

// @route   GET /api/posts/subscribedPost
// @desc    get all subscribed post
// @access  Private

router.get('/subscribedPost', auth, (req, res) => {
    console.log('-',req.user)

    Post
        .find({userID: req.user.following})
        .populate('userID', 'first_name last_name profile_image _id')
        .sort({ registration_date: -1 })
        .then(post => res.json(post))
        .catch(err => res.json(err))
    
})

// @route   GET /api/posts/:id
// @desc    get user post
// @access  Private

router.get('/user', auth, (req, res) => {
    //console.log(req.params)
    Post
        .findById({ userID: req.user.id })
        .sort({ registration_date: -1 })
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, (req, res) => {
    //console.log('deleted');

    Post
        .findById(req.params.id)
        .then(post => post.remove()
            .then(() => {
                //console.log('deleted');
                res.json({ success_delete: true })
            })
            .catch(() => res.json({ success_delete: false })))
})

module.exports = router