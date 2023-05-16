import BarChartGraph from "./BarChartGraph";
import LineChartGraph from "./LineChart";
import PieChartGraph from "./PieChart";
import DoughnutChart from "./DoughnutChart";

function RenderCharts() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        rowGap: "2em",
        gap: "1em",
      }}
    >
      <PieChartGraph />
      <LineChartGraph />
      <BarChartGraph />
      <DoughnutChart />
    </div>
  );
}

export default RenderCharts;
