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
  
  // Save in DB
  await user.save()
  
  res.json({msg: "POST USERS", user})
}

const updateUser = (req = request, res = response) => {
  res.json({msg: "UPDATE USERS"})
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