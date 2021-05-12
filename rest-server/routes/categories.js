const { Router } = require('express')
const { check } = require('express-validator');

const { 
  addCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController');

const { validateJWT, validateFields, isAdmin } = require('../middlewares')

const { existingCategory } = require('../helpers/validatorsDb')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existingCategory ),
  validateFields,
],getCategoryById)

router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  validateFields,
], addCategory )

router.put('/:id', [
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  check('id').custom( existingCategory ),
  validateFields,
], updateCategory )

router.delete('/:id', [
  validateJWT,
  isAdmin,
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existingCategory ),
  validateFields
],deleteCategory)

module.exports = router;