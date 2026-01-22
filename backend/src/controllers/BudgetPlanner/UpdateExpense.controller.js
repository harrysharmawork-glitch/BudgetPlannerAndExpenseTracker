const expenseModel = require("../../models/Expense.model");

exports.updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: req.user.userId,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found or already deleted!!",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully!!",
      updatedExpense,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update expense!!",
    });
  }
};
