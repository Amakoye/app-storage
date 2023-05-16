import { Bar } from "react-chartjs-2";
import ChartContainer from "./ChartContainer";
import { useChartData } from "./useChartData";

function BarChartGraph() {
  const [chartData] = useChartData();
  return (
    <ChartContainer>
      <h3>Bar Chart</h3>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users gained between 2016-2020",
            },
          },
        }}
      />
    </ChartContainer>
  );
}

export default BarChartGraph;
