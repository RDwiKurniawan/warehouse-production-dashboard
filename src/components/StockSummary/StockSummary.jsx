import React from "react";
import Card from "../Card/Card";

function StockSummary({ stock }) {
  const totalRaw = stock.rawMaterials.reduce(
    (sum, material) => sum + material.qty,
    0
  );
  const totalWip = Object.values(stock.wip).reduce(
    (sum, process) => sum + (process[0]?.qty || 0),
    0
  );
  const totalFinished = stock.finished.reduce(
    (sum, product) => sum + product.qty,
    0
  );

  const renderStockList = (items, isObject = false) => {
    if (!items || items.length === 0) {
      return <p className="out-of-stock">Out of Stock</p>;
    }

    if (isObject) {
      return Object.entries(items).map(([process, items]) => (
        <li key={process}>
          <span>{process}:</span>
          <span className="stock-value">{items[0]?.qty || 0}</span>
        </li>
      ));
    }

    return items.map((item) => (
      <li key={item.productId || item.name}>
        <span>{item.name || item.productId}:</span>
        <span className="stock-value">{item.qty}</span>
      </li>
    ));
  };

  return (
    <Card title="Stock Summary (Monitoring)">
      <div className="summary-grid">
        <div className="summary-card">
          <h4>Raw Materials</h4>
          {totalRaw === 0 ? (
            <p className="out-of-stock">Out of Stock</p>
          ) : (
            <ul>{renderStockList(stock.rawMaterials)}</ul>
          )}
        </div>

        <div className="summary-card">
          <h4>Workloads</h4>
          <div className="workloads-section">
            <p>WIP</p>
            {totalWip === 0 ? (
              <p className="out-of-stock">Out of Stock</p>
            ) : (
              <div className="workloads-grid">
                <div className="workload-item">
                  <div className="workload-value">
                    {stock.wip.cutting[0]?.qty || 0}
                  </div>
                  <div className="workload-label">Cutting</div>
                </div>
                <div className="workload-item">
                  <div className="workload-value">
                    {stock.wip.sawing[0]?.qty || 0}
                  </div>
                  <div className="workload-label">Sawing</div>
                </div>
                <div className="workload-item">
                  <div className="workload-value">
                    {stock.wip.finishing[0]?.qty || 0}
                  </div>
                  <div className="workload-label">Finishing</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card">
          <h4>Finished Goods</h4>
          {totalFinished === 0 ? (
            <p className="out-of-stock">Out of Stock</p>
          ) : (
            <ul>{renderStockList(stock.finished)}</ul>
          )}
        </div>
      </div>
    </Card>
  );
}

export default StockSummary;
