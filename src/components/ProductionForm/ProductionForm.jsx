import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import {
  estimateProductionTime,
  validateProduction,
  updateStockAfterProduction,
} from "../../services/productionService";

function ProductionForm({ stock, setStock }) {
  const [formData, setFormData] = useState({
    productId: "P-001",
    quantity: 1,
    processType: "Cutting",
  });
  const [errors, setErrors] = useState([]);
  const [estimating, setEstimating] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEstimate(null);
    setErrors([]);
  }, [formData.productId, formData.quantity, formData.processType]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEstimate = async () => {
    try {
      setEstimating(true);
      setErrors([]);

      const validationErrors = validateProduction(
        stock,
        formData.processType,
        Number(formData.quantity),
        formData.productId
      );

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const minutes = await estimateProductionTime(
        formData.processType,
        Number(formData.quantity)
      );
      setEstimate(minutes);
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setEstimating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setErrors([]);

      const validationErrors = validateProduction(
        stock,
        formData.processType,
        Number(formData.quantity),
        formData.productId
      );

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const updatedStock = updateStockAfterProduction(
        stock,
        formData.processType,
        Number(formData.quantity),
        formData.productId
      );

      setStock(updatedStock);

      setFormData({
        productId: "P-001",
        quantity: 1,
        processType: "Cutting",
      });
      setEstimate(null);
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Production Form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product ID</label>
          <input
            className="form-input"
            value={formData.productId}
            onChange={(e) => handleInputChange("productId", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            min="1"
            className="form-input"
            value={formData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Process Type</label>
          <select
            value={formData.processType}
            onChange={(e) => handleInputChange("processType", e.target.value)}
            className="form-select"
            required
          >
            <option value="Cutting">Cutting</option>
            <option value="Sawing">Sawing</option>
            <option value="Finishing">Finishing</option>
          </select>
        </div>

        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <div key={index}>• {error}</div>
            ))}
          </div>
        )}

        <div className="form-button-group">
          <button
            type="button"
            onClick={handleEstimate}
            className="btn btn-secondary"
            disabled={estimating || isSubmitting}
          >
            {estimating ? "Estimating..." : "Estimate Time"}
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || estimating}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>

          {estimate !== null && (
            <span className="estimate-display">
              Estimated: {estimate} minutes
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}

export default ProductionForm;
