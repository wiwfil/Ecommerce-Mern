const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    storename: {
      type: String,
      required: true,
      unique: true,
    },
    storeImg: {
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    soldProducts: [
      {
        orderId: {
          type: String,
          unique: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", Store);
