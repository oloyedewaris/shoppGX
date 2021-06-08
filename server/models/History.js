const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = mongoose.Schema(
  {
    dateOfPurchase: String,
    totalPrice: Number,
    paymentId: String,
    user: {
      type: Object,
      default: {}
    },
    paymentData: {
      type: Array,
      default: {}
    },
    productData: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchema);
module.exports = { History };
