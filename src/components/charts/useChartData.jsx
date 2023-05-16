import { Data } from "./data";
import { useState } from "react";

const useChartData = () => {
  const [chartData, setChartData] = useState({
    labels: Data?.map((data) => data.year),
    datasets: [
      {
        label: "Users gained",
        data: Data?.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return [chartData, setChartData];
};

export { useChartData };
