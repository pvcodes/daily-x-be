import expenseService from '../services/expenseService';
import { Request, Response } from 'express';

export const getSingleBudget = async (req: Request, res: Response) => {
  try {
    const day = req.query.day as string; // 18-02-2025
    const expense = await expenseService.getBudget(day, req.user!.id);
    res.json(expense);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};

export const getMonthlyExpensesAndBudget = async (
  req: Request,
  res: Response
) => {
  try {
    const mid = req.query.mid as string;
    const expenses = await expenseService.getMonthlyExpenses(mid, req.user!.id);
    res.json(expenses);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const budgets = await expenseService.getBudgetsInPagination(
      page,
      limit,
      req.user!.id
    );
    res.json(budgets);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};

export const addBudget = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const budget = await expenseService.addBudget(amount, req.user!.id);
    res.json(budget);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const day = req.query.day as string; // 18-02-2025
    console.log('fian');
    const expenses = await expenseService.getExpenseInPagination(
      page,
      limit,
      day,
      req.user!.id
    );
    res.json(expenses);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { amount, description, budgetId } = req.body;
    const expense = await expenseService.addExpense(
      amount,
      description,
      budgetId,
      req.user!.id
    );

    res.json(expense);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    return;
  }
};
