import express from 'express';
import { getProducts, createProduct } from '../controllers/products.js';

const router = express.Router({ mergeParams: true });

//INDEX ROUTE
/**
 * @route   GET /products
 * @desc    Get all products
 */
router.get('/', getProducts);

//CREATE ROUTE
/**
 * @route   POST /products
 * @desc    Create new product
 * @body    {title, price, rating, image}
 */
router.post('/', createProduct);

export default router;
