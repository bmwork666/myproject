import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Rm({ data }) {
  return (
    <div
      className="card h-100 w-100 p-4"
      style={{ borderRadius: "20px", background: "#a4e2f3", border: "4px solid #61bdf1" }}
    >
      <h2 className="text-center mb-4 p-2" style={{ background: "#4da8e6" }}>
        RM Line Dashboard
      </h2>

      <div className="row text-center mb-4">
        <div className="col-6">
          <strong>Shift:</strong>
          <div className="badge bg-primary mt-2 p-2">{data.shift || "..."}</div>
        </div>
        <div className="col-6">
          <strong>Count:</strong>
          <div className="badge bg-success mt-2 p-2">{data.count ?? "0"}</div>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-6 mb-3">
          <strong>PETROL-AT:</strong>
          <div className="badge bg-secondary mt-2 p-2">{data.PetrolAT ?? "0"}</div>
        </div>

        <div className="col-6 mb-3">
          <strong>PETROL-MT:</strong>
          <div className="badge bg-secondary mt-2 p-2">{data.PetrolMT ?? "0"}</div>
        </div>

        <div className="col-6 mb-3">
          <strong>DIESEL-AT:</strong>
          <div className="badge bg-secondary mt-2 p-2">{data.DieselAT ?? "0"}</div>
        </div>

        <div className="col-6 mb-3">
          <strong>DIESEL-MT:</strong>
          <div className="badge bg-secondary mt-2 p-2">{data.DieselMT ?? "0"}</div>
        </div>
      </div>
    </div>
  );
}

export default Rm;
