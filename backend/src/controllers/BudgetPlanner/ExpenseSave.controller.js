const expenseModel = require("../../models/Expense.model");
const User = require("../../models/UsersCreate.model");

exports.SaveExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      currency,
      category,
      paymentMethod,
      expenseDate,
      source,
      merchant,
      recurringType,
      status,
      bankTransactionId,
      note,
      tags
    } = req.body;
    const userId = req.user.userId;
    const expense = await expenseModel.create({
      userId,
      title,
      amount,
      currency,
      category,
      paymentMethod,
      expenseDate,
      source,
      merchant,
      recurringType,
      status,
      bankTransactionId,
      note,
      tags
    });
    return res.status(201).json({
      message: "Expense successfully added!!",
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error occured!!",
    });
  }
};