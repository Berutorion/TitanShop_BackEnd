const { Order } = require('../models');

const OrderController = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = OrderController;