const { request, response } = require("express")

const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require("../helpers/generateJwt")

const loginController = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({msg: 'The email or password are not correct - email'})
    }

    if (!user.state) {
      return res.status(400).json({msg: 'Disabled user'})
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({msg: 'The email or password are not correct - password'})
    }

    const token = await generateJWT(user.id)

    res.json({msg: 'USER LOGGED', user, token})

  } catch(error) {
    res.status(500).json({msg: 'Ocurred an error'})
  }
}

module.exports = { loginController }