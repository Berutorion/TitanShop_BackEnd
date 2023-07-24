const { Op } = require('sequelize');
const { Products } = require('../models');

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await Products.findAll({
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
        limit: Number.parseInt(req.query.limit, 10) || 20,
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const product = await Products.findByPk(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const product = await Products.create(req.body);
      console.log('create product', product);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const product = await Products.findByPk(req.params.id);
      await product.update(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const product = await Products.findByPk(req.params.id);
      await product.destroy();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMyProducts: async (req, res) => {
    try {
      const products = await Products.findAll({
        where: {
          seller: req.params.id,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMyProduct: async (req, res) => {
    try {
      const product = await Products.findOne({
        where: {
          id: req.params.productId,
          seller: req.params.id,
        },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateMyProduct: async (req, res) => {
    try {
      const product = await Products.findOne({
        where: {
          id: req.params.id,
          seller: req.user.id,
        },
      });
      await product.update(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteMyProduct: async (req, res) => {
    try {
      const product = await Products.findOne({
        where: {
          id: req.params.id,
          seller: req.user.id,
        },
      });
      await product.destroy();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  search: async (req, res) => {
    try {
      const products = await Products.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { ProductController };
