const { Carts, Products, Order } = require('../models');

const CartController = {
  getCart: async (req, res) => {
    try {
      // get product dat from cart
      const cart = await Carts.findAll({
        raw: true,
        nest: true,
        where: {
          user_id: req.params.id,
        },
        include: {
          model: Products,
          attributes: ['name', 'description', 'price', 'stock', 'seller'],
        },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addToCart: async (req, res) => {
    try {
      const cart = await Carts.findOne({
        where: {
          user_id: req.body.userId,
          product_id: req.body.productId,
        },
      });
      if (!cart) {
        await Carts.create({
          user_id: req.body.userId,
          product_id: req.body.productId,
          quantity: req.body.quantity,
        });
        return res.status(200).json({ message: '成功加入購物車' });
      }
      res.status(200).json({ message: '此商品已在購物車中' });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateCart: async (req, res) => {
    try {
      const cart = await Carts.findOne({
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
      const cart = await Carts.findByPk(req.params.id);
      await cart.destroy();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCartByUser: async (req, res) => {
    try {
      const cart = await Carts.destroy({
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
      const cart = await Carts.findAll({
        raw: true,
        nest: true,
        where: {
          userId: req.params.id,
        },
        include: {
          model: Products,
          attributes: ['name', 'description', 'price', 'stock', 'seller'],
        },
      });
      const totalPrice = cart.reduce((acc, cur) => acc + cur.Product.price * cur.Product.quantity, 0);
      res.status(200).json(totalPrice);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  purchase: async (req, res) => {
    try {
      const cart = await Carts.findAll({
        raw: true,
        nest: true,
        where: {
          user_id: req.body.userId,
        },
        include: {
          model: Products,
          attributes: ['price', 'stock', 'seller', 'id'],
        },
      });
      const totalPrice = cart.reduce((acc, cur) => acc + cur.Product.price * cur.quantity, 0);
      cart.forEach(async (item) => {
        const product = await Products.findByPk(item.Product.id);
        await product.update({
          stock: product.stock - item.quantity,
        });
      });
      await Carts.destroy({
        where: {
          user_id: req.body.userId,
        },
      });
      const order = await Order.create({
        totalPrice,
        user_id: req.body.userId,
      });
      res.status(200).json({ message: '成功購買', orderId: order.id });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = CartController;
