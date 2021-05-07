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

module.exports =  { validateRole, validateEmail }