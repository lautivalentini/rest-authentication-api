const { response, request } = require('express')

const search = ( req = request , res = response ) => {
  
  const { collection, term } = req.params
  
  res.json({collection, term})
}

module.exports = { search }
