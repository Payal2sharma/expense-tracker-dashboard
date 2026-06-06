const { readExpenses, writeExpenses } = require("../utils/fileHelper");

const addExpense = (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({
        message: "Amount, category and date are required",
      });
    }

    const expenses = readExpenses();

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category,
      date,
      note: note || "",
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);

    writeExpenses(expenses);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// THIS FUNCTION MUST EXIST
const getExpenses = (req, res) => {
  try {
    const expenses = readExpenses();

    expenses.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExpense = (req, res) => {
  try {
    const id = Number(req.params.id);

    let expenses = readExpenses();

    const expenseExists = expenses.find(
      (expense) => expense.id === id
    );

    if (!expenseExists) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    expenses = expenses.filter(
      (expense) => expense.id !== id
    );

    writeExpenses(expenses);

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateExpense = (req, res) => {
  try {
    const id = Number(req.params.id);

    const { amount, category, date, note } = req.body;

    const expenses = readExpenses();

    const index = expenses.findIndex(
      (expense) => expense.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    expenses[index] = {
      ...expenses[index],
      amount: Number(amount),
      category,
      date,
      note,
    };

    writeExpenses(expenses);

    res.status(200).json(expenses[index]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};