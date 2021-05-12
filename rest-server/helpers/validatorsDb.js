const { Role, Category, User, Product } = require('../models')

const validateRole = async (role = "") => {
  const existingRole = await Role.findOne({role});
  if (!existingRole) {
    throw new Error(`The role ${role} is not correct`)
  }
}

const validateEmail = async (email = "") => {
  const existingEmail = await User.findOne({email})
  if (existingEmail) {
    throw new Error(`The email ${email} already exists`)
  }
}

const existingUser = async (id = "") => {
  const userExists = await User.findById( id )
  if (!userExists) {
    throw new Error(`The id ${id} does not exist`)
  }
}

const existingCategory = async (id = "") => {
  const categoryExists = await Category.findById( id )
  if (!categoryExists) {
    throw new Error(`This category does not exist`)
  }
}

const existingProduct = async (id = "") => {
  const productExists = await Product.findById( id )
  if (!productExists) {
    throw new Error(`This product does not exist`)
  }
}

module.exports =  {
  validateRole, 
  validateEmail, 
  existingUser, 
  existingCategory,
  existingProduct
}