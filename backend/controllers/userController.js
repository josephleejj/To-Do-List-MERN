const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createJWT = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY)
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        // login user from the static method in userModel
        const user = await User.login(email, password)

        // create jwt
        const token = createJWT(user._id)        
        res.status(200).json({email, token})

    } catch (e) {
        res.status(400).json({error:e.message})

    }

}

const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        // create user from the static method in userModel
        const user = await User.signup(email, password)

        // create jwt
        const token = createJWT(user._id)        
        res.status(200).json({email, token})

    } catch (e) {
        res.status(400).json({error:e.message})
    }
}

// get all todos
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports = {loginUser, signupUser, getUsers}
