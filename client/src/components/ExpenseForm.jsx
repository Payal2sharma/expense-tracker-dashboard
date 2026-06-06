import { useEffect, useState } from "react";
import api from "../services/api";

function ExpenseForm({
  onExpenseAdded,
  editingExpense,
  setEditingExpense,
}) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "",
      date: "",
      note: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        await api.put(
          `/expenses/${editingExpense.id}`,
          formData
        );

        setEditingExpense(null);
        alert("Expense Updated Successfully");
      } else {
        await api.post("/expenses", formData);
        alert("Expense Added Successfully");
      }

      resetForm();
      onExpenseAdded();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(15,23,42,0.9)",
    color: "white",
    marginBottom: "14px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(15px)",
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#38bdf8",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {editingExpense
          ? "✏️ Update Expense"
          : "💰 Add Expense"}
      </h2>

      <input
        type="number"
        name="amount"
        placeholder="Enter Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Category</option>
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Bills">📄 Bills</option>
        <option value="Entertainment">🎬 Entertainment</option>
        <option value="Other">📦 Other</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        style={{
          ...inputStyle,
          colorScheme: "dark",
        }}
      />

      <textarea
        name="note"
        placeholder="Add Note"
        value={formData.note}
        onChange={handleChange}
        style={{
          ...inputStyle,
          minHeight: "100px",
          resize: "none",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          background:
            "linear-gradient(90deg,#06b6d4,#8b5cf6)",
          color: "white",
          border: "none",
          padding: "16px",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "17px",
          boxShadow:
            "0 4px 20px rgba(139,92,246,0.4)",
        }}
      >
        {editingExpense
          ? "Update Expense"
          : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;