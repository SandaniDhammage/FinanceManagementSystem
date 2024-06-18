const { addExpense, getExpense, deleteExpense,updateExpense,getExpensesById } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome,updateIncome,getIncomeById } = require('../controllers/income');
const router = require('express').Router();

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes) // Corrected route definition
      .get('/get-income-byId/:id',getIncomeById )
      .put('/update-income/:id', updateIncome)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpense)
      .get('/get-expenses-byId/:id',getExpensesById )
      .put('/update-expense/:id', updateExpense)
      .delete('/delete-expense/:id', deleteExpense)

module.exports = router;
