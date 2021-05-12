const { response, request } = require('express')

const { isValidObjectId } = require('mongoose')
const { User, Category, Product } = require('../models')

const collectionsAllowed = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUsers = async (term = "", res = response) => {
  const isMongoId = isValidObjectId( term )

  if ( isMongoId ) {
    const user = await User.findById( term )
    return res.json( (user) ? [ user ] : [] )
  }

  const regex = new RegExp( term, 'i' )

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }]
  })
  res.json({ results: users })
}

const search = ( req = request , res = response ) => {
  const { collection, term } = req.params

  if ( !collectionsAllowed.includes(collection) ) {
    return res.status(400).json({msg: 'Collection not permited'})
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res)
    break;
    case 'categories':

    break;
    case 'products':

    default:
      res.status(500).json({msg: 'Server error'})
  }
  
}

module.exports = { search }
