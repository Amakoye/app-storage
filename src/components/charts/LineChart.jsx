import React from "react";
import ChartContainer from "./ChartContainer";
import { Line } from "react-chartjs-2";
import { useChartData } from "./useChartData";

function LineChartGraph() {
  const [chartData] = useChartData();
  return (
    <ChartContainer>
      <h3>Line Chart</h3>
      <Line
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

export default LineChartGraph;
