const {response, request} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');

const getUsers = async (req = request, res = response) => {
  const { from, limit } = req.query;
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip( Number( from ) )
    .limit( Number( limit ) )
  ])

  res.json({msg: "GET USERS", total, users})
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

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false })
  const authenticatedUser = req.user

  res.json({msg: "DELETE USERS", user, authenticatedUser})
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}