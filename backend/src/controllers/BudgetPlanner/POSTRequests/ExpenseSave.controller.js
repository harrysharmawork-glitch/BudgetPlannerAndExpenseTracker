const mongoose = require("mongoose");
const ExpenseModel = require("../../../models/Expense.model");
const BudgetModel = require("../../../models/Budget.model");

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
      tags,
    } = req.body;

    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const expense = await ExpenseModel.create({
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
      tags,
    });

    const expenseDateObj = new Date(expenseDate);
    const month = expenseDateObj.getUTCMonth() + 1;
    const year = expenseDateObj.getUTCFullYear();

    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));

    const budget = await BudgetModel.findOne({
      userId,
      month,
      year,
      category,
    });

    let warning = null;
    let hint = null;

    if (budget) {
      const totalExpenseResult = await ExpenseModel.aggregate([
        {
          $match: {
            userId,
            category,
            isDeleted: false,
            expenseDate: { $gte: startOfMonth, $lt: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: { $ifNull: ["$amount", 0] } },
          },
        },
      ]);

      const spent = typeof totalExpenseResult[0]?.totalSpent === "number"
        ? totalExpenseResult[0].totalSpent
        : 0;
      const limitAmount = Number(budget.limitAmount);

      console.debug("[SaveExpense] budget check:", {
        category,
        month,
        year,
        startOfMonth: startOfMonth.toISOString(),
        endOfMonth: endOfMonth.toISOString(),
        spent,
        limitAmount,
        exceeded: spent > limitAmount,
      });

      if (spent > limitAmount) {
        if (!budget.isExceeded) {
          budget.isExceeded = true;
          await budget.save();
        }

        warning = {
          message: "Budget limit exceeded",
          category,
          limitAmount,
          spentAmount: spent,
        };
      } else {
        if (budget.isExceeded) {
          budget.isExceeded = false;
          await budget.save();
        }
      }
    } else {
      hint = "No budget set for this category – set one to track limits?";
    }
    return res.status(201).json({
      message: "Expense successfully added",
      expense,
      warning,
      hint,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error occurred",
    });
  }
};
