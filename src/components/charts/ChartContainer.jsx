function ChartContainer({ children }) {
  return (
    <div
      className="chart-container"
      style={{
        display: "grid",
        placeItems: "center",
        width: 500,
        height: 500,
        borderRadius: "1em",
        overflow: "hidden",
        padding: "1em",
        background: "#eee",
      }}
    >
      {children}
    </div>
  );
}

export default ChartContainer;
