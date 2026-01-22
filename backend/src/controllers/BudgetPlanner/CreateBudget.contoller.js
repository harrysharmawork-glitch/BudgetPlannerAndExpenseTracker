const BudgetModel = require("../../models/Budget.model");
exports.createBudget = async (req, res) => {
  try {
    const { month, year, category, limitAmount } = req.body;
    const userId = req.user.userId;

    const budget = await BudgetModel.create({
      userId,
      month,
      year,
      category,
      limitAmount,
    });

    if (!budget) {
      return res.status(500).json({
        message: "Something went wrong!",
      });
    } else {
      return res.status(201).json({
        message: "Budget Created Successfully!!",
        budget,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Budget Already exists for this category and month",
      });
    }
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
