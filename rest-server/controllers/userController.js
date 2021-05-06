const {response, request} = require('express')

const getUsers = (req = request, res = response) => {
  res.json({msg: "GET USERS"})
}

const createUser = (req = request, res = response) => {
  res.json({msg: "POST USERS"})
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