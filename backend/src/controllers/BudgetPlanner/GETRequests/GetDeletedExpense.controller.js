const ExpenseModel = require("../../../models/Expense.model");

exports.getDeletedExpenses = async (req, res) => {
  try {
    const deletedExpenses = await ExpenseModel.find({
      userId: req.user.userId,
      isDeleted: true,
    }).sort({ expenseDate: -1 });

    res.status(200).json({
      message: "Fetched the deleted records successfully!!",
      deletedExpenses,
    });
  } catch (Error) {
    console.error(Error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};
