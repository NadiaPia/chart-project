import React from "react";
import {
  Chart as ChartJS,
  defaults,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
defaults.plugins.title.color = "black";

function MyDoughnut(props) {

  let total = 840;
  let blocked = 200;
  let percentage = Math.floor((blocked / total) * 100);

  const getColor = (percentage) => {
    const color = {
      green: "rgb(0, 255, 0)",
      orange: "rgb(255, 140, 0)",
      red: "rgb(255,15,15)",
    };
    if (percentage <= 10) return color.green;
    if (percentage >= 30) return color.red;
    return color.orange;
  };

  const data = {
    labels: [`blocked: ${blocked}`, `Total Traffic: ${total}`],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [getColor(percentage), "rgb(211, 211, 211)"],
      },
    ],
  };
  
  const options = {
    aspectRatio: 10 / 8,
    plugins: {
      legend: {
        display: false,
      },
    },

    rotation: 270,
    circumference: 180,
    cutout: `75%`,
    animation: {
      duration: 2500,
      animateRotate: true,
    },
  };

  const innerLabel = {
    id: "innerLabel",
    afterDatasetDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      const meta = args.meta;
      let x = meta.data[0].x;
      let y = meta.data[0].y;
      // const perc = (chart.data.datasets[0].data[0] / meta.total) * 100;
      const fontColor = getColor(percentage);
      ctx.save();
      ctx.textAlign = "center";
      let fontSize = ctx.canvas.clientWidth * 0.15; // Font size for numbers
      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = fontColor;
      ctx.fillText(`${percentage}%`, x, y - ctx.canvas.clientHeight * 0.25);
       fontSize = ctx.canvas.clientWidth * 0.05; // Font size for other parts
      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(
        "ut aliquip ex ea commodo",
        x,
        y - ctx.canvas.clientHeight * 0.13,
      );
      ctx.fillText("velit esse", x, y - ctx.canvas.clientHeight * 0.05);
      ctx.restore();
    },
  };

  const plugins = [innerLabel];

  return (
    <div className="charts-section">
    <div className="chart-container">
      <div className="chart-title-container">
        <p className="chart-title">Lorem ipsum dolor sit amet</p>
        <p className="chart-subtitle">(last 24 hours)</p>
      </div>

      <div className="chart">
        <Doughnut data={data} options={options} plugins={plugins} />
      </div>

      <div className="chart-legend">

        <div className="legend-1">
          <div className="box-legend-1"></div>
          <div className="text-lable">normal risk level</div>
        </div>

        <div className="legend-2">
          <div
            className="box-legend-2"></div>
          <div className="text-lable">elevated risk level</div>
        </div>

        <div className="legend-3">
          <div
            className="box-legend-3"></div>
          <div className="text-lable">high risk level</div>
        </div>
      </div>

      
    </div>
    </div>
  );
}

export default MyDoughnut;

