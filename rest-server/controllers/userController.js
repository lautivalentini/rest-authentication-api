const {response} = require('express')

const getUsers = (req, res = response) => {
  res.json({msg: "GET USERS"})
}

const createUser = (req, res = response) => {
  res.json({msg: "POST USERS"})
}

const updateUser = (req, res = response) => {
  res.json({msg: "UPDATE USERS"})
}

const deleteUser = (req, res = response) => {
  res.json({msg: "DELETE USERS"})
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}