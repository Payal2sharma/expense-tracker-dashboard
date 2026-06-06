import api from "../services/api";

function ExpenseList({
  expenses,
  onExpenseDeleted,
  onEdit,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);
      onExpenseDeleted();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  if (expenses.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "16px",
          marginTop: "20px",
          color: "#cbd5e1",
        }}
      >
        <h3>No expenses found</h3>
        <p>Add your first expense above.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "25px" }}>
      <h2
        style={{
          color: "#38bdf8",
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        Expense List
      </h2>

      {expenses.map((expense) => (
        <div
          key={expense.id}
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "15px",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                color: "#38bdf8",
                fontSize: "30px",
                margin: 0,
              }}
            >
              ₹{expense.amount}
            </h3>

            <span
              style={{
                background: "#1e293b",
                padding: "6px 12px",
                borderRadius: "20px",
                color: "#f8fafc",
              }}
            >
              {expense.category}
            </span>
          </div>

          <p
            style={{
              marginTop: "12px",
              color: "#cbd5e1",
            }}
          >
            📅 {expense.date}
          </p>

          <p
            style={{
              color: "#e2e8f0",
            }}
          >
            📝 {expense.note || "No note added"}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() => onEdit(expense)}
              style={{
                background:
                  "linear-gradient(90deg,#8b5cf6,#7c3aed)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow:
                  "0 4px 20px rgba(139,92,246,0.4)",
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() =>
                handleDelete(expense.id)
              }
              style={{
                background:
                  "linear-gradient(90deg,#ef4444,#dc2626)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow:
                  "0 4px 20px rgba(239,68,68,0.4)",
              }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;