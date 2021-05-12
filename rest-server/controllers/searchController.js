const { response, request } = require('express')

const search = ( req = request , res = response ) => {
  res.json({msg: 'search'})
}

module.exports = { search }
