import Product from '../models/product.js';

const getProducts = (req, res) => {
  Product.find((err, products) => {
    if (err) {
      res.status(404).json({ message: err.message, success: false });
    } else {
      res.status(200).json({
        message: 'Products Found Successfully',
        success: true,
        data: products,
      });
    }
  });
};

const createProduct = (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) {
      res.status(404).json({ message: err.message, success: false });
    } else {
      res.status(200).json({
        message: 'Product Created Successfully',
        success: true,
        data: product,
      });
    }
  });
};

export { getProducts, createProduct };
