import {
  getBudgets,
  getMonthlyExpensesAndBudget,
  getSingleBudget,
  addBudget,
  getExpenses,
  createExpense,
} from '../controllers/expenseController';
import { verifyTokenMiddleware } from '../middleware/auth';
import { Router } from 'express';

// /expense
const router = Router();

router.get('/', verifyTokenMiddleware, getExpenses);
router.post('/', verifyTokenMiddleware, createExpense);

router.get('/budget', verifyTokenMiddleware, getSingleBudget);
router.post('/budget', verifyTokenMiddleware, addBudget);
router.post('/budget/all', verifyTokenMiddleware, getBudgets);

router.post('/month', verifyTokenMiddleware, getMonthlyExpensesAndBudget);
router.post('/month', verifyTokenMiddleware, getMonthlyExpensesAndBudget);

// router.post('/verify-token', verifyTokenMiddleware, (_, res) => {
// res.send('ok');
// });

// router.post('/', createUser);
// router.get('/', verifyTokenMiddleware, getUserDetails);
// router.put('/', verifyTokenMiddleware, updateUserDetails);

export default router;
