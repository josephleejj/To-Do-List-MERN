const express = require('express') // import express

const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router() // create router 

router.post('/login', loginUser) // login route

router.post('/signup', signupUser) // signup route

module.exports = router // export routerdddrddd