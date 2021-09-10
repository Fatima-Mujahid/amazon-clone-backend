import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  payerEmail: {
    type: String,
    required: [true, 'Please provide a payer email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  paymentId: {
    type: String,
    required: [true, 'Please provide a payment id'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  status: {
    type: String,
    required: [true, 'Please provide a status'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Order', orderSchema);
