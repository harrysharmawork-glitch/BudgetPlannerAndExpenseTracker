const expenseModel = require("../../../models/Expense.model");
exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const deletedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: req.user.userId,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found or already deleted!!",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully!!",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete expense!!",
    });
  }
};
