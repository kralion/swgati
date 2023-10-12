import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import BackgroundBasic from "@components/BackgroundBasic";
import StatsCard from "@components/stats-card";
import { File } from "lucide-react";
import { BadgeAlert } from "lucide-react";
import { Percent } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AreaGraph } from "@components/area-graph";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

export default function Reportes() {
  const [value, onChange] = useState(new Date());

  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Registros de Activos TI",
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(255, 99, 132, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: "Activos de TI en Mantenimiento",
        data: [2, 3, 20, 5, 1, 4, 2, 3, 20, 5, 1, 4],
        backgroundColor: ["rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Reporte de Registros Mensuales",
      },
    },
    responsive: true,

    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="flex gap-7">
      <div className="flex w-full rounded-xl flex-col    ">
        <BackgroundBasic text={"Reportes de Registros"}>
          <div className="">
            <Bar data={data} options={options} />
          </div>
        </BackgroundBasic>
        <BackgroundBasic text={"Stats Relevantes"}>
          <div className="flex gap-3.5 ">
            <StatsCard
              props={{
                title: "Registrados",
                icon: <File />,
                hyperlinkText: "Consulta Aquí",

                description:
                  "Estos son los registros de activos TI que realizan en un rango mensual",
              }}
            />
            <StatsCard
              props={{
                icon: <BadgeAlert />,
                title: "Mantenimiento",
                hyperlinkText: "Ver mas",

                description:
                  "Estos son los activos de TI que se encuentran en mantenimiento",
              }}
            />
            <StatsCard
              props={{
                icon: <Percent />,
                title: "Metrica RM",
                hyperlinkText: "Ver mas",
                description:
                  "Esta metrica nos indica el indice de mantenimiento de los activos TI mensualmente",
              }}
            />
          </div>
        </BackgroundBasic>
      </div>
      <BackgroundBasic text="Búsqueda Específica">
        <div className="flex justify-center items-center">
          <Calendar className=" rounded-xl" onChange={onChange} value={value} />
        </div>
        <div className="w-[450px]">
          <div class="space-y-3">
            {/* <p className="font-semibold pt-3 font-mono">
            Fecha: {value.getDate()}/{value.getMonth() + 1}/
            {value.getFullYear()}
          </p> */}
            <h1 class="text-2xl font-bold pt-7">Reporte General</h1>
            <p class="mt-2 text-lg font-semibold text-gray-600">Activos TI</p>
            <p class="mt-1 text-gray-500 ">
              En{" "}
              <span
                className="
            text-slate-700 font-bold 
            "
              >
                Octubre
              </span>{" "}
              se observa que se registraron{" "}
              <span
                className="
            text-slate-700 font-bold  
            "
              >
                24
              </span>{" "}
              activos TI, de los cuales{" "}
              <span
                className="
              text-red-500 font-bold px-1 
              "
              >
                5
              </span>{" "}
              se encuentran en mantenimiento. Esta informacion significa que el
              indice de mantenimiento ha incrementado en un
              <span
                className="
              text-red-500 font-bold px-1 
              "
              >
                4.3%
              </span>
              con respecto al mes anterior.
            </p>
            <AreaGraph />
          </div>
        </div>
      </BackgroundBasic>
    </div>
  );
}
