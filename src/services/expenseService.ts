import { Budget } from '@prisma/client';
import dbClient from '../db';

export const getBudget = async (day: string, userId: number) => {
  const startOfDay = new Date(day);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  const budget = await dbClient.budget.findFirst({
    where: {
      day: {
        gte: startOfDay,
        lt: endOfDay,
      },
      userId,
    },
  });
  return budget;
};

export const getMonthlyExpenses = async (mid: string, userId: number) => {
  const monthlyExpenses = await dbClient.monthlyExpense.findMany({
    where: { mid, userId },
  });

  const totalSpend = monthlyExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Calculate the maximum spend in a single day and track the date
  const dailySpendMap = new Map<string, number>();

  monthlyExpenses.forEach((expense) => {
    const dateKey = expense.date.toISOString().split('T')[0]; // Get the date part
    const currentSpend = dailySpendMap.get(dateKey) || 0;
    dailySpendMap.set(dateKey, currentSpend + expense.amount);
  });

  let maxSpendInDay = 0;
  let maxSpendDate = '';

  dailySpendMap.forEach((dailySpend, date) => {
    if (dailySpend > maxSpendInDay) {
      maxSpendInDay = dailySpend;
      maxSpendDate = date;
    }
  });

  return {
    monthlyExpenses,
    totalSpend,
    maxSpendInDay: {
      amount: maxSpendInDay,
      date: maxSpendDate,
    },
  };
};

export const getBudgetsInPagination = async (
  page: number,
  limit: number,
  userId: number
) => {
  const offset = (page - 1) * limit;

  const [budgets, total] = await Promise.all([
    dbClient.budget.findMany({
      where: {
        userId,
      },
      skip: offset,
      take: limit,
      orderBy: {
        day: 'desc',
      },
    }),
    dbClient.budget.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    budgets,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: offset + budgets.length < total,
    },
  };
};

const addBudget = async (amount: number, userId: number) => {
  return await dbClient.budget.create({
    data: {
      amount,
      userId,
      remaining: amount,
    },
  });
};

export const getExpenseInPagination = async (
  page: number,
  limit: number,
  day: string,
  userId: number
) => {
  const dayToFind = new Date(day);
  const nextDay = new Date(day);
  nextDay.setDate(nextDay.getDate() + 1);

  const offset = (page - 1) * limit;

  const budget = await dbClient.budget.findFirst({
    where: {
      userId,
      day: {
        gte: dayToFind,
        lte: nextDay,
      },
    },
  });

  const [expenses, total] = await Promise.all([
    dbClient.expense.findMany({
      where: { userId, budgetId: budget?.id },
      skip: offset,
      take: limit,
      orderBy: {
        date: 'desc',
      },
    }),
    dbClient.expense.count({
      where: {
        userId,
        budgetId: budget?.id,
      },
    }),
  ]);
  return {
    expenses,
    budget,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: offset + expenses.length < total,
    },
  };
};

const addExpense = async (
  amount: number,
  description: string,
  budgetId: number,
  userId: number
) => {
  const [expense] = await Promise.all([
    dbClient.expense.create({
      data: {
        userId,
        budgetId,
        amount,
        description,
      },
    }),
    dbClient.budget.update({
      where: { id: budgetId },
      data: {
        remaining: {
          decrement: amount,
        },
      },
    }),
  ]);

  return expense;
};

const updateBudget = async (budgetId: number, data: Partial<Budget>) => {
  return dbClient.budget.update({
    where: { id: budgetId },
    data,
  });
};

const expenseService = {
  getBudget,
  getMonthlyExpenses,
  getBudgetsInPagination,
  addBudget,
  getExpenseInPagination,
  addExpense,
  updateBudget,
};

export default expenseService;
