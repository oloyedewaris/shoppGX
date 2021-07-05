const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: {
      type: Array,
      default: [],
      required: true
    },
    product: {
      type: String,
      required: true
    },
    cartUsers: {
      type: [
        {
          userFirstName: String,
          userLastName: String,
          userEmail: String,
          userId: String,
          quantity: Number,
          timestamp: Number
        }
      ],
      default: []
    },
    sold: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

ProductSchema.index(
  {
    title: "text",
    product: "text"
  },
  {
    weights: {
      title: 5,
      product: 1
    }
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
