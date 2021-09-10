import express from 'express';
import { getOrders, createOrder } from '../controllers/orders.js';

const router = express.Router({ mergeParams: true });

//INDEX ROUTE
/**
 * @route   GET /orders
 * @desc    Get all orders
 */
router.get('/', getOrders);

//CREATE ROUTE
/**
 * @route   POST /orders
 * @desc    Create new order
 * @body    {user, payerEmail, paymentId, amount, products, status}
 */
router.post('/', createOrder);

export default router;
