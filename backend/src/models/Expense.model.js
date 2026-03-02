const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersCreate",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Rent",
        "Bills",
        "Health",
        "Education",
        "Investment",
        "Stock Market",
        "SIP",
        "Gold",
        "Silver",
        "Policies",
        "Entertainment",
        "Other",
        "EMI",
      ],
      default: "Other",
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Net Banking", "Cash", "Card", "EMI"],
      default: "Cash",
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    source: {
      type: String,
      enum: ["Manual", "Bank", "Udhar"],
      default: "Manual",
    },

    merchant: String,
    tags: [String],
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringType: {
      type: String,
      enum: ["Weekly", "Monthly", "Annual", "Daily", "None"],
    },
    status: {
      type: String,
      enum: ["Pending", "Cleared"],
      default: "Cleared",
    },

    bankTransactionId: String,
    location: {
      city: String,
      Country: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    note: String,
  },
  { timestamps: true }
);
expenseSchema.index({userId:1, expenseDate:-1});
module.exports = mongoose.model("Expense", expenseSchema);
