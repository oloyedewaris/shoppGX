const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
    images: {
      type: Array,
      default: []
    },
    phone: {
      type: String,
      default: "Tecno"
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
    phone: "text"
  },
  {
    weights: {
      title: 5,
      phone: 1
    }
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
