const { request, response } = require("express");

const { Category } = require('../models')

const addCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()

  const categoryDb = await Category.findOne({ name })

  if (categoryDb) {
    return res.status(400).json({msg: 'The category already exists'})
  }

  const data = {
    name,
    user: req.user._id
  }

    const category = await new Category( data );
    await category.save();

    res.status(201).json(category)
}

module.exports = {
  addCategory
}