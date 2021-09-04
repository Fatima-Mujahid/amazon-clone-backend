import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide an email'],
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
});

export default mongoose.model('Product', productSchema);
