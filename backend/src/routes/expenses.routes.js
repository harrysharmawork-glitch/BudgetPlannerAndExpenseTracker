const express = require("express");
const router = express.Router();

const {
  SaveExpense,
} = require("../controllers/BudgetPlanner/ExpenseSave.controller");
const {
  getAllExpenses,
} = require("../controllers/BudgetPlanner/GetAllExpense.controller");
const {
  getExpenseByEmail,
} = require("../controllers/BudgetPlanner/GetExpenseByEmail.controller");
const {
  deleteExpense,
} = require("../controllers/BudgetPlanner/DeleteExpense.controller");
const {
  getDeletedExpenses,
} = require("../controllers/BudgetPlanner/GetDeletedExpense.controller");
const {
  undoDeleteExpense,
} = require("../controllers/BudgetPlanner/UndoExpense.controller");
const {
  updateExpense,
} = require("../controllers/BudgetPlanner/UpdateExpense.controller");
const{
  deleteRecord,
} = require("../controllers/BudgetPlanner/DeleteRecordTrashBin.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/addExpense", authMiddleware, SaveExpense);

router.get("/getAllExpenses", authMiddleware, getAllExpenses);
router.get("/expenses/user/:email", authMiddleware, getExpenseByEmail);

router.put("/expenses/update/:expenseId", authMiddleware, updateExpense);

router.delete("/expenses/delete/:expenseId", authMiddleware, deleteExpense);

router.get(
  "/expenses/getAllDeletedExpense",
  authMiddleware,
  getDeletedExpenses,
);

router.patch("/expenses/undo/:expenseId", authMiddleware, undoDeleteExpense);

router.delete("/expenses/deletePermanent/:expenseId", authMiddleware, deleteRecord);

module.exports = router;
