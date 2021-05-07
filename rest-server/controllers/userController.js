const {response, request} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const getUsers = (req = request, res = response) => {
  res.json({msg: "GET USERS"})
}

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User( {name, email, password, role} )

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt )
  
  await user.save()
  
  res.json({ msg: "POST USERS", user })
}

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt )
  }

  const user = await User.findByIdAndUpdate( id, rest )

  res.json({msg: "UPDATE USERS", user})
}

const deleteUser = (req = request, res = response) => {
  res.json({msg: "DELETE USERS"})
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}