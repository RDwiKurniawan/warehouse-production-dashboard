// Production estimation service
export const estimateProductionTime = async (processType, quantity) => {
  if (!processType || !quantity || quantity <= 0) {
    throw new Error("Invalid parameters for production time estimation");
  }

  const perItemTimes = {
    Cutting: 2,
    Sawing: 3,
    Finishing: 5,
  };

  const timePerItem = perItemTimes[processType];

  if (!timePerItem) {
    throw new Error(`Unknown process type: ${processType}`);
  }

  const minutes = timePerItem * quantity;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Estimation service unavailable"));
      } else {
        resolve(minutes);
      }
    }, 700);
  });
};

export const validateProduction = (stock, processType, quantity, productId) => {
  const errors = [];

  if (!productId || productId.trim() === "") {
    errors.push("Product ID is required");
  }

  if (!quantity || quantity <= 0) {
    errors.push("Quantity must be greater than 0");
  }

  if (!processType) {
    errors.push("Process type is required");
  }

  const qty = Number(quantity);

  if (processType === "Cutting") {
    const rawMaterial = stock.rawMaterials[0];
    if (!rawMaterial || rawMaterial.qty < qty) {
      errors.push(
        `Not enough raw material (${
          rawMaterial?.name || "Fabric A"
        }). Available: ${rawMaterial?.qty || 0}, Required: ${qty}`
      );
    }
  } else if (processType === "Sawing") {
    const cuttingWip = stock.wip.cutting[0]?.qty || 0;
    if (cuttingWip < qty) {
      errors.push(
        `Not enough Cutting WIP. Available: ${cuttingWip}, Required: ${qty}`
      );
    }
  } else if (processType === "Finishing") {
    const sawingWip = stock.wip.sawing[0]?.qty || 0;
    if (sawingWip < qty) {
      errors.push(
        `Not enough Sawing WIP. Available: ${sawingWip}, Required: ${qty}`
      );
    }
  }

  return errors;
};

export const updateStockAfterProduction = (
  stock,
  processType,
  quantity,
  productId
) => {
  const updatedStock = JSON.parse(JSON.stringify(stock));
  const qty = Number(quantity);

  try {
    if (processType === "Cutting") {
      updatedStock.rawMaterials[0].qty -= qty;
      updatedStock.wip.cutting[0].qty += qty;
    } else if (processType === "Sawing") {
      updatedStock.wip.cutting[0].qty -= qty;
      updatedStock.wip.sawing[0].qty += qty;
    } else if (processType === "Finishing") {
      updatedStock.wip.sawing[0].qty -= qty;
      const finishedProduct = updatedStock.finished.find(
        (f) => f.productId === productId
      );
      if (finishedProduct) {
        finishedProduct.qty += qty;
      } else {
        updatedStock.finished.push({ productId, qty });
      }
    }

    return updatedStock;
  } catch (error) {
    throw new Error("Failed to update stock: " + error.message);
  }
};
