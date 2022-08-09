const mongoose = require("mongoose");
const Product = require("./Product.js");
const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },

    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
          required: true,
        },
        productImgs: [
          {
            type: String,
            required: true,
          },
        ],
        productCategories: [{ type: String, required: true }],

        productPrice: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    billingDetails: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        address: {
          state: {
            type: String,
          },
          city: {
            type: String,
            required: true,
          },
          line1: {
            type: String,
            required: true,
          },
          postal_code: {
            type: String,
            required: true,
          },
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },

    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
