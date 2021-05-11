const validateFields = require('../middlewares/validateFields')
const validateJwt = require('../middlewares/validateJwt')
const validateRoles = require('../middlewares/validateRoles')

module.exports = {
  ...validateFields,
  ...validateJwt,
  ...validateRoles
}