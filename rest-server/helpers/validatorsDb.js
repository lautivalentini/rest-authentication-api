const Role = require('../models/role')
const User = require('../models/user')

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

module.exports =  { validateRole, validateEmail, existingUser }