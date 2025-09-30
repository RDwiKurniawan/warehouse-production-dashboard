import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Card from "../Card/Card";

const COLORS = ["#3498db", "#2ecc71", "#e74c3c"];

function StockChart({ stock }) {
  const chartData = useMemo(() => {
    try {
      const raw = stock.rawMaterials.reduce(
        (sum, material) => sum + (material.qty || 0),
        0
      );
      const wip = Object.values(stock.wip).reduce(
        (sum, process) => sum + (process[0]?.qty || 0),
        0
      );
      const finished = stock.finished.reduce(
        (sum, product) => sum + (product.qty || 0),
        0
      );

      return [
        { name: "Raw Materials", value: raw },
        { name: "WIP", value: wip },
        { name: "Finished", value: finished },
      ].filter((item) => item.value >= 0);
    } catch (error) {
      console.error("Error preparing chart data:", error);
      return [
        { name: "Raw Materials", value: 0 },
        { name: "WIP", value: 0 },
        { name: "Finished", value: 0 },
      ];
    }
  }, [stock]);

  if (!chartData || chartData.length === 0) {
    return (
      <Card title="Stock Distribution">
        <div className="chart-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p>No data available for chart</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Stock Distribution">
      <div className="chart-container">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Quantity"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default StockChart;
