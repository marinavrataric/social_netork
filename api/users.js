const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

// uploading images
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.put('/:id', upload.single('fileImage'), (req, res) => {
    const profile_image = req.file.path

    const userUpdates = {
        ...req.body
    }

    console.log('body:',req.body)
    console.log('photo:',profile_image)
    const {first_name, last_name, user_bio} = req.body
    
    User
        .findByIdAndUpdate({ _id: req.params.id }, {first_name,last_name,user_bio, profile_image})
        .then(() => {
            User
                .findOne({ _id: req.params.id })
                .then((user) => {
                    console.log('user', user, profile_image)
                    //return res.json({...user, profile_image: req.file.path})
                    return res.json(user)
                })
                .catch(err => console.log(err))
        })
    /* Users
        .findById(req.params.id, (error, user) => {
            if (error) res.status(400).json({ msg: `error: ${error}` })

            const { likes } = req.body
            if (likes) user.likes = likes;

            console.log(likes)
            console.log(user)

            user
                .save(err => {
                    if (err) res.status(400).json({ msg: `error: ${error}` })
                    return res.json({ msg: 'success' })
                }) 
        })*/
})

// @route   POST /api/users
// @desc    Create new user
// @access  Public

router.post('/', (req, res) => {

    //console.log(req.body)

    const { first_name, last_name, email, password } = req.body

    // Filed validation
    if (!first_name || !last_name || !email || !password) res.status(400).json({ msg: 'Fields cannot be empty.' })

    // Finding user by email, creating new user if not existing
    User
        .findOne({ email })
        .then(user => {
            if (user) res.status(400).json({ msg: `Email '${email}' is already in use.` })

            const newUser = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            })

            // Create hash and salt
            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    newUser.password = hash

                    newUser
                        .save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                (err, token) => {
                                    if (err) throw err

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            first_name: user.first_name,
                                            last_name: user.last_name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })

                })
            })
        })
        .catch(err => console.log(err))
})

module.exports = router