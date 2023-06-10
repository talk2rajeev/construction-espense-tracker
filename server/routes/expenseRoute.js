const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/expense', authMiddleware, expenseController.createExpense);
router.get('/expenses', authMiddleware, expenseController.getExpenseList);
router.get('/expense/:id', authMiddleware, expenseController.getExpenseById);
router.post('/expensebydate', authMiddleware, expenseController.expensebydate);
router.delete('/expense', authMiddleware, expenseController.deleteExpense);
router.put('/expense', authMiddleware, expenseController.updateeExpense);
router.post('/expense/filter', authMiddleware, expenseController.expenseFilter);
module.exports = router;