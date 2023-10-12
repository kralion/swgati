import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Índice RM",
    },
  },
};

const labels = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Agos",
  "Sept",
  "Oct",
  "Nov",
  "Dic",
];
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "% de cumplimiento",
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function AreaGraph() {
  return <Line options={options} data={data} />;
}
