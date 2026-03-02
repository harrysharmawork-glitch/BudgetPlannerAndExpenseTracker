const express = require("express");
const router = express.Router();

const {
  SaveExpense,
} = require("../controllers/BudgetPlanner/POSTRequests/ExpenseSave.controller");
const {
  createBudget,
} = require("../controllers/BudgetPlanner/POSTRequests/CreateBudget.controller");
const {
  getAllExpenses,
} = require("../controllers/BudgetPlanner/GETRequests/GetAllExpense.controller");
const {
  getExpenseByEmail,
} = require("../controllers/BudgetPlanner/GETRequests/GetExpenseByEmail.controller");
const {
  deleteExpense,
} = require("../controllers/BudgetPlanner/DELETERequests/DeleteExpense.controller");
const {
  getDeletedExpenses,
} = require("../controllers/BudgetPlanner/GETRequests/GetDeletedExpense.controller");
const {
  undoDeleteExpense,
} = require("../controllers/BudgetPlanner/PATCHRequests/UndoExpense.controller");
const {
  updateExpense,
} = require("../controllers/BudgetPlanner/PUTRequests/UpdateExpense.controller");
const{
  deleteRecord,
} = require("../controllers/BudgetPlanner/DELETERequests/DeleteRecordTrashBin.controller.js");

const{
  getExpensesByDate,
} = require("../controllers/BudgetPlanner/GETRequests/FilterBasedOnDate.controller.js");

const{
  getExpensesByAmount,
} = require("../controllers/BudgetPlanner/GETRequests/FilterBasedOnDate.controller.js");
const {
  getCategoriesWithoutBudget,
} = require("../controllers/BudgetPlanner/GETRequests/GetCategoriesWithoutBudget.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/addExpense", authMiddleware, SaveExpense);
router.post("/budget/create", authMiddleware, createBudget);

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

router.get(
  "/expenses/getExpensesByDate/:startingDate/:endingDate",
  authMiddleware,
  getExpensesByDate,
);

router.get(
  "/expenses/getExpensesByAmount/:startAmount/:endAmount",
  authMiddleware,
  getExpensesByAmount,
);

router.get(
  "/expenses/categoriesWithoutBudget",
  authMiddleware,
  getCategoriesWithoutBudget,
);
module.exports = router;
