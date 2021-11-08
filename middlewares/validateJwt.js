const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async ( req = request, res = response, next ) => {
  const token = req.header('x-token')

  if(!token) {
    return res.status(401).json({msg: 'Invalid token'})
  }

  try {
    const { uid } =  jwt.verify( token, process.env.SECRET_KEY )
    
    const user = await User.findById(uid)

    if ( !user ) {
      return res.status(401).json({msg: 'No exists a user'}) 
    }

    if ( !user.state ) {
      return res.status(401).json({msg: 'User already disabled'})
    }

    req.user = user
    
    next()
  } catch(error) {
    console.log(error)
    res.status(401).json({msg: 'Invalid token'})
  }

}

module.exports = { validateJWT }