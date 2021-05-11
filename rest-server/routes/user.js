const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateJWT, isRole } = require('../middlewares')

const { validateRole, validateEmail, existingUser } = require('../helpers/validatorsDb')

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController')

const router = Router()

router.get('/', getUsers)

router.post('/', [
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password is required and have 6 letters minium').isLength({min: 6}),
  check('email').custom( validateEmail ),
  check('email', 'The email is incorrect').isEmail(),
  check('role').custom( validateRole ),
  validateFields
], createUser)

router.put('/:id', [
  check('id', 'The id is invalid').isMongoId(),
  check('id').custom( existingUser ),
  check('role').custom( validateRole ),
  validateFields
], updateUser)

router.delete('/:id', [
  validateJWT,
  isRole,
  isRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'The id is invalid').isMongoId(),
  check('id').custom( existingUser ),
  validateFields,
], deleteUser)

module.exports = router;