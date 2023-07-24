const { Cart } = require('../models');

const CartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findAll({
        where: {
          userId: req.params.id,
        },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addToCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.body.productId,
        },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: {
          id: req.params.id,
        },
      });
      await cart.update(req.body);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const cart = await Cart.findByPk(req.params.id);
      await cart.destroy();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCartByUser: async (req, res) => {
    try {
      const cart = await Cart.destroy({
        where: {
          userId: req.params.id,
        },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTotalPrice: async (req, res) => {
    try {
      const cart = await Cart.findAll({
        where: {
          userId: req.params.id,
        },
      });
      const totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      res.status(200).json(totalPrice);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


module.exports = CartController;
