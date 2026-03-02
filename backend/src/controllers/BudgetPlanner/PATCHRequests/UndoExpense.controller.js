const expenseModel = require("../../../models/Expense.model");

exports.undoDeleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const restoredExpense = await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: req.user.userId,
        isDeleted: true,
      },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredExpense) {
      return res.status(404).json({
        message: "Deleted expense not found!!",
      });
    }

    res.status(200).json({
      message: "Expense restored successfully!!",
      restoredExpense,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to restore expense!!",
    });
  }
};
