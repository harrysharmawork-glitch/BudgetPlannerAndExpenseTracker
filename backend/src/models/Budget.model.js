const mongoose = require("mongoose");

const BudgetFixing = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersCreate",
      required: true,
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    limitAmount: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true },
);
BudgetFixing.index(
  { userId: 1, month: 1, year: 1, category: 1 },
  { unique: true },
);

module.exports = mongoose.model("Budget", BudgetFixing);
