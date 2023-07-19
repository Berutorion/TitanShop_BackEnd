const { product } = require('../models');

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await product.findAll({ attributes: ['id', 'name', 'price', 'description'] });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await product.findByPk(id, { attributes: ['id', 'name', 'price', 'description'] });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        name, price, description,
      } = req.body;
      const products = await product.create({
        name,
        price,
        description,
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name, price, description,
      } = req.body;
      const products = await product.findByPk(id);
      await products.update({
        name,
        price,
        description,
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const products = await product.findByPk(id);
      await products.destroy();
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = ProductController;
