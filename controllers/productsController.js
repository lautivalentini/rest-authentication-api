const { request, response } = require("express");

const { Product, Category } = require('../models')

const addProduct = async (req = request, res = response) => {
  try {
    const { state, user, ...body } = req.body;

    const productDb = await Category.findOne({ name: body.name })

    if (productDb) {
      return res.status(400).json({msg: 'The product already exists'})
    }

    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.user._id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json({msg: 'ADD PRODUCT', product})
  } catch (err) {
    console.log(err)
  }
}

const getProducts = async (req = request, res = response) => {
  const { from, limit } = req.query;
  const query = { state: true }

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
    .populate('user', 'name')
    .populate('category', 'name')
    .skip( Number( from ) )
    .limit( Number( limit ) )
  ])

  res.json({msg: "GET PRODUCTS", total, products})
}

const getProductById = async (req = request, res = response) => {
  const { id } = req.params

  const product = await Product.findById(id)
  .populate('user', 'name')
  .populate('category', 'name')

  res.json( product )
}

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json( product )
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndUpdate(id, { state: false }, { new: true })

  res.status(200).json( deletedProduct )
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}