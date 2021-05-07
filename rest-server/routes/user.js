const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validateFields')
const { validateRole, validateEmail } = require('../helpers/validatorsDb')

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

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router;