const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    // console.log(token, process.env.SECRET_KEY)
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    // console.log('user_id1:', id)
    // const user = await User.findOne({ _id: id }).select('_id');
    // console.log('id:', user._id.toString())
    req.user = await User.findOne({ _id: id }).select('_id')
    // console.log(req.user)
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth