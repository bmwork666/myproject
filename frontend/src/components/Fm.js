import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fm({ data }) {
  return (
    <div
      className="card h-100 w-100 p-4"
      style={{ borderRadius: "20px", background: "#81e7a0", border: "4px solid #24e477" }}
    >
      <h2 className="text-center mb-4 p-2" style={{ background: "#1cd497" }}>
        FM Line Dashboard
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
    </div>
  );
}

export default Fm;
