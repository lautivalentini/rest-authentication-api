const { request, response } = require("express");

const { Category } = require('../models')

const addCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase()

  const categoryDb = await Category.findOne({ name })

  if (categoryDb) {
    return res.status(400).json({msg: 'The category already exists'})
  }

  const data = {
    name,
    user: req.user._id
  }

    const category = new Category(data);
    await category.save();

    res.status(201).json({msg: 'ADD CATEGORY', category})
  } catch (err) {
    console.log(err)
  }
}

const getCategories = async (req = request, res = response) => {
  const { from, limit } = req.query;
  const query = { state: true }

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
    .populate('user', 'name')
    .skip( Number( from ) )
    .limit( Number( limit ) )
  ])

  res.json({msg: "GET USERS", total, categories})
}

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params

  const category = await Category.findById(id)

  res.json(category)
}

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  res.json(category)
}

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndUpdate(id, { state: false }, { new: true })

  res.status(200).json(deletedCategory)
}

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}