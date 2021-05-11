const { Router } = require('express')
const { check } = require('express-validator');
const { addCategory } = require('../controllers/categoriesController');

const { validateJWT, validateFields } = require('../middlewares')

const router = Router()

// get categories - public
router.get('/', (req, res ) => {
  res.json({msg: 'GET CATEGORIES'})
})

// get category by id - public
router.get('/:id', (req, res ) => {
  res.json({msg: 'GET CATEGORIES BY ID'})
})

// add category - private
router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').not().isEmpty(),
  validateFields,
], addCategory )

//update category - private
router.put('/:id', (req, res ) => {
  res.json({msg: 'UPDATE CATEGORY'})
})

//delete category - private - admin
router.delete('/:id', (req, res ) => {
  res.json({msg: 'DELETE CATEGORY'})
})

module.exports = router;