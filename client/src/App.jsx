import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import api from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
          (expense) => expense.category === selectedCategory
        );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        padding: "30px",
        color: "white",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "25px",
            background:
              "linear-gradient(90deg,#38bdf8,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Expense Tracker Dashboard
        </h1>

        <ExpenseForm
          onExpenseAdded={fetchExpenses}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            padding: "15px",
            borderRadius: "15px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              marginRight: "10px",
              fontWeight: "bold",
            }}
          >
            Filter By Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white",
            }}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <ExpenseSummary expenses={filteredExpenses} />

        <ExpenseList
          expenses={filteredExpenses}
          onExpenseDeleted={fetchExpenses}
          onEdit={setEditingExpense}
        />
      </div>
    </div>
  );
}

export default App;