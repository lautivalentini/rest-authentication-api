const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '' ) => {
  return new Promise ( (resolve, reject) => {
      const payload = { uid }

      jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '4h'
      }, ( err, token ) => {
        if (err) {
          console.log(err)
          reject('Can not generate the token')
        } else {
          resolve( token )
        }
      })
  } )
}

module.exports = { generateJWT }