const { Router } = require('express')
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdmin } = require('../middlewares')

const { 
  getProducts, 
  getProductById , 
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')

const { existingProduct, existingCategory } = require('../helpers/validatorsDb')

const router = Router()

router.get('/', getProducts);

router.get('/:id', [
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existingProduct ),
  validateFields
],getProductById)

router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  check('category', 'Invalid id for category').not().isEmpty(),
  validateFields
], addProduct )

router.put('/:id', [
  validateJWT,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existingProduct ),
  validateFields
], updateProduct )

router.delete('/:id', [
  validateJWT,
  isAdmin,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existingProduct ),
], deleteProduct)

module.exports = router;