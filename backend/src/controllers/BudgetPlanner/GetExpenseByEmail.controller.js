const expenseModel = require("../../models/Expense.model");
const User = require("../../models/UsersCreate.model");

exports.getExpenseByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({
        message: "User with given email id not found!!",
      });
    } else {
      const userExpenses = await expenseModel
        .find({
          userId: userData._id,
          isDeleted: false,
        })
        .sort({ expenseDate: -1 });
      return res.status(200).json({
        message: "Expenses of the user fetched successfully!!",
        userExpenses,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};
