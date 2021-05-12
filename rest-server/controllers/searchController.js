const { response, request } = require('express')

const { isValidObjectId } = require('mongoose')
const { User, Category, Product } = require('../models')

const collectionsAllowed = [
  'users',
  'categories',
  'products',
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

const searchCategories = async (term = "", res = response) => {
  const isMongoId = isValidObjectId( term )

  if ( isMongoId ) {
    const category = await Category.findById( term )
    return res.json( (category) ? [ category ] : [] )
  }

  const regex = new RegExp( term, 'i' )

  const categories = await Category.find({ name: regex, state: true })
  res.json({ results: categories })
}

const searchProducts = async (term = "", res = response) => {
  const isMongoId = isValidObjectId( term )

  if ( isMongoId ) {
    const product = await Product.findById( term ).populate('category', 'name')
    return res.json( (product) ? [ product ] : [] )
  }

  const regex = new RegExp( term, 'i' )

  const products = await Product.find({ name: regex, state: true }).populate('category', 'name')
  res.json({ results: products })
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
      searchCategories(term, res)
    break;
    case 'products':
      searchProducts(term, res)
    break;
    default:
      res.status(500).json({msg: 'Server error'})
  }
  
}

module.exports = { search }
