import mongoose from 'mongoose';

//review schema ke liye alag folder bhi bana sakte the par chota tha isliye isi me daal //diya
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      req: true,
    },
    rating: {
      type: Number,
      req: true,
    },
    comment: {
      type: String,
      req: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    //ye rating average rating hai reviews ke andar har object ki rating hai
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
