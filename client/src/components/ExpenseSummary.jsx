function ExpenseSummary({ expenses }) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => Number(e.amount)))
      : 0;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) +
      Number(expense.amount);
    return acc;
  }, {});

  const cardStyle = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "20px",
    minWidth: "250px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Expenses</h3>

        <h2
          style={{
            color: "#38bdf8",
            fontSize: "30px",
          }}
        >
          ₹{totalAmount}
        </h2>
      </div>

      <div style={cardStyle}>
        <h3>Highest Expense</h3>

        <h2
          style={{
            color: "#8b5cf6",
            fontSize: "30px",
          }}
        >
          ₹{highestExpense}
        </h2>
      </div>

      <div style={cardStyle}>
        <h3>Category Totals</h3>

        {Object.entries(categoryTotals).map(
          ([category, amount]) => (
            <p
              key={category}
              style={{
                marginBottom: "8px",
              }}
            >
              {category}: ₹{amount}
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default ExpenseSummary;