const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
const auth = require('../middleware/auth')

// @route   POST /api/auth
// @desc    Login user
// @access  Public

router.post('/', (req, res) => {

    const { email, password } = req.body

    // filed validation
    if (!email || !password) res.status(400).json({ msg: 'Fields cannot be empty.' })

    // Check if user is registered
    User
        .findOne({ email })
        .then(user => {
            if (!user) res.status(400).json({ msg: `User doesn't exist.` })
            //console.log(user)
            // validate password
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' })

                    // if password matches, send token and user
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    first_name: user.first_name,
                                    last_name: user.last_name
                                }
                            })
                        }
                    )
                })
        })

})
// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private

router.get('/user', auth, (req, res) => {
    User
        .findById(req.user.id)
        .select('-password')
        .then(user => res.json({ user }))
})


// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private

router.get('/users', auth, (req, res) => {
    User
        .find()
        .sort({ registration_date: -1 })
        .then(user => res.json(user))
})

module.exports = router