import { Doughnut } from "react-chartjs-2";
import { useChartData } from "./useChartData";
import ChartContainer from "./ChartContainer";

function DoughnutChart() {
  const [chartData] = useChartData();
  return (
    <ChartContainer>
      <h3>Doughnut</h3>
      <Doughnut
        style={{
          height: 400,
          width: 400,
        }}
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

export default DoughnutChart;
