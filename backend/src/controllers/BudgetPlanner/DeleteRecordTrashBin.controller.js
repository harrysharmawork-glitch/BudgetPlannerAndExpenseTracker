const ExpenseModel = require("../../models/Expense.model");

exports.deleteRecord = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const recordToDelete = await ExpenseModel.findOneAndDelete({
      _id: expenseId,
      userId: req.user.userId,
    });
    if (!recordToDelete) {
      return res.status(404).json({
        message: "Failed to delete!!",
      });
    } else {
      return res.status(200).json({
        message: "Expense Deleted successfully!!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Someting went wrong internal server error!!",
    });
  }
};
