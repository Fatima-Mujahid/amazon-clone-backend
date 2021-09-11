import Order from '../models/order.js';

const getOrders = (req, res) => {
  Order.find({ user: req.user })
    .populate('user products', '-password')
    .exec((err, orders) => {
      if (err) {
        res.status(404).json({ message: err.message, success: false });
      } else {
        res.status(200).json({
          message: 'Orders Found Successfully',
          success: true,
          data: orders,
        });
      }
    });
};

const createOrder = (req, res) => {
  Order.create(req.body, (err, order) => {
    if (err) {
      res.status(404).json({ message: err.message, success: false });
    } else {
      res.status(200).json({
        message: 'Order Created Successfully',
        success: true,
        data: order,
      });
    }
  });
};

export { getOrders, createOrder };
