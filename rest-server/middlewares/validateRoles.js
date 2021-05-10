const { request, response } = require("express")

const isAdmin = (req = request, res = response, next) => {
  if ( !req.user ) {
    return res.status(500).json({msg: 'No token'})
  }

  const { role, name } = req.user

  if (role !== 'ADMIN_ROLE') {
    res.status(401).json({msg: `${name} is not an admin`})
  }

  next()
}

const isRole = ( ...roles ) => {

  return (req = request, res = response, next) => {
    if ( !req.user ) {
      return res.status(500).json({msg: 'No token'})
    }

    if ( !roles.includes(req.user.role) ) {
      return res.status(401).json({msg: 'You do not have the permissions'})
    }
    
    next()
  }
}

module.exports = { isAdmin, isRole }