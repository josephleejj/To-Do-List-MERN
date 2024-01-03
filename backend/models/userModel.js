const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})


// static signup method - we cannot use arrow function because we are using 'this', which dont have their bindings.
// we used a static method because the method is associated with the model itself, not with a specific instance of the model.
userSchema.statics.signup = async function(email, password)  {

    // validation (empty email or password)
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // validation (valid email)
    if (!validator.isEmail(email)) {
        throw Error('Invalid Email')
    }

    // validation (valid password)
    if (!validator.isStrongPassword(password)) {
        throw Error('Invalid Password - 8 characters long containing 1 Uppercase, 1 Lowercase, 1 Special Character and 1 Number')
    }
    
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email is in use')
    }

    // salt adds extra string to the password before hashing
    const salt = await bcrypt.genSalt(10) 
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password:hash })

    return user
}

userSchema.statics.login = async function(email, password)  {
    
    // validation (empty email or password)
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // validation (whether user is in database)
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    // validation (whether password matches after hashing)
    // it extracts the salt info from user.password and apply it onto password to compare
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)