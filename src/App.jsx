import React from "react";
import StockSummary from "./components/StockSummary/StockSummary";
import ProductionForm from "./components/ProductionForm/ProductionForm";
import StockChart from "./components/StockChart/StockChart";
import { useAutoStock } from "./hooks/useAutoStock";

// Initial Data
const INITIAL_STOCK = {
  rawMaterials: [
    { productId: "RM-001", name: "Fabric A", qty: 120 },
    { productId: "RM-002", name: "Thread", qty: 50 },
  ],
  wip: {
    cutting: [{ productId: "P-001", qty: 10 }],
    sawing: [{ productId: "P-001", qty: 0 }],
    finishing: [{ productId: "P-001", qty: 0 }],
  },
  finished: [{ productId: "P-001", qty: 5 }],
};

function App() {
  const { stock, setStock, isConnected } = useAutoStock(INITIAL_STOCK, 4000);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="header-title">Warehouse & Production Dashboard</h1>
          <span className="header-subtitle">
            Realtime updates every 4s
            {!isConnected && (
              <span style={{ color: "red", marginLeft: "10px" }}>
                • Connection Issues
              </span>
            )}
          </span>
        </header>

        <div className="grid grid-2col">
          <div className="grid" style={{ gap: "20px" }}>
            <StockSummary stock={stock} />
            <ProductionForm stock={stock} setStock={setStock} />
          </div>
          <StockChart stock={stock} />
        </div>

        <footer className="footer">
          Copyright © 2025 Dwi Kurniawan • React Production System
        </footer>
      </div>
    </div>
  );
}

export default App;
