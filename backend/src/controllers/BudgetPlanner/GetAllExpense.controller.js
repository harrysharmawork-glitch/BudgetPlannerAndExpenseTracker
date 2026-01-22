const expenseModel = require("../../models/Expense.model");
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel
      .find({
        userId: req.user.userId,
        isDeleted: false,
      })
      .sort({ expenseDate: -1 });
    res.status(200).json({
      message: "Expense fetched successfully!!",
      expenses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetched the data!!",
    });
  }
};