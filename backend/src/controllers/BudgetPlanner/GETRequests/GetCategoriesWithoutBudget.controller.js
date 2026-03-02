const ExpenseModel = require("../../../models/Expense.model");
const BudgetModel = require("../../../models/Budget.model");

exports.getCategoriesWithoutBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const categoriesWithExpenses = await ExpenseModel.distinct("category", {
      userId,
      isDeleted: false,
      expenseDate: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    const budgetsForPeriod = await BudgetModel.find({
      userId,
      month,
      year,
    }).select("category");

    const budgetedCategories = budgetsForPeriod.map((b) => b.category);

    const categoriesWithoutBudget = categoriesWithExpenses.filter(
      (cat) => !budgetedCategories.includes(cat)
    );

    return res.status(200).json({
      message: "Categories without budget fetched successfully",
      success: true,
      month,
      year,
      categoriesWithoutBudget,
      count: categoriesWithoutBudget.length,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
