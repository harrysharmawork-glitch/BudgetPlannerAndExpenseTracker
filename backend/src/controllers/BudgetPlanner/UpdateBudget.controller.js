const Budget = require("../../models/Budget.model");

exports.updateBudget = async (req, res) => {
  try {
    const { limitamount } = req.body;
    const { id } = req.params;
    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { limitamount },
      { new: true },
    );

    if (!budget) {
      return res.status(404).json({
        message: "Budget with given userId not found!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!!",
    });
  }
};
