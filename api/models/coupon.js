const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    lastDate: {
      type: Date,
      required: true,
    },
    max_redemptions: {
      type: Number,
      required: true,
    },
    max_count: {
      type: Number,
      default: Infinity,
    },
    count: {
      type: Number,
      default: 0,
    },
    redeem_by: {
      type: Object,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupons", CouponSchema);