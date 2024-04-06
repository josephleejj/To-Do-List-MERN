const express = require('express') // import express

const { loginUser, signupUser,  getUsers} = require('../controllers/userController')

const router = express.Router() // create router 

router.post('/login', loginUser) // login route

router.post('/signup', signupUser) // signup route

router.get('/', getUsers)

module.exports = router // export router