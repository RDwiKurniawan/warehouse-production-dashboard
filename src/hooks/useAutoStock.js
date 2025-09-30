import { useEffect, useState } from "react";

const simulateRealtimeUpdate = (stock) => {
  try {
    const updatedStock = JSON.parse(JSON.stringify(stock));

    updatedStock.rawMaterials = updatedStock.rawMaterials.map((material) => {
      const change = Math.floor(Math.random() * 5) - 2;
      const newQty = Math.max(0, material.qty + change);
      return { ...material, qty: newQty };
    });

    const moveChance = Math.random();

    if (moveChance > 0.85 && (updatedStock.wip.cutting[0]?.qty || 0) > 0) {
      updatedStock.wip.cutting[0].qty -= 1;
      updatedStock.wip.sawing[0].qty =
        (updatedStock.wip.sawing[0]?.qty || 0) + 1;
    }

    if (moveChance > 0.95 && (updatedStock.wip.sawing[0]?.qty || 0) > 0) {
      updatedStock.wip.sawing[0].qty -= 1;
      updatedStock.wip.finishing[0].qty =
        (updatedStock.wip.finishing[0]?.qty || 0) + 1;
    }

    return updatedStock;
  } catch (error) {
    console.error("Error in realtime update simulation:", error);
    return stock;
  }
};

export const useAutoStock = (initialStock, intervalMs = 4000) => {
  const [stock, setStock] = useState(initialStock);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let intervalId;

    try {
      intervalId = setInterval(() => {
        setStock((prevStock) => {
          try {
            return simulateRealtimeUpdate(prevStock);
          } catch (error) {
            console.error("Error in stock update:", error);
            setIsConnected(false);
            return prevStock;
          }
        });
      }, intervalMs);
    } catch (error) {
      console.error("Error setting up auto stock update:", error);
      setIsConnected(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalMs]);

  return { stock, setStock, isConnected };
};
