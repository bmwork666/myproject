import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fm({ data }) {
  return (
<div
  className="card p-4"
  style={{
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    background: "#a4e2f3",
    border: "4px solid #61bdf1",
    display: "flex",
    flexDirection: "column",
  }}
>


      <h2
        className="text-center mb-4 p-2"
        style={{
          background: "#1cd497",  // FM green header
          borderRadius: "10px",
          fontSize: "2rem",
          fontWeight: "600"
        }}
      >
        FM Line Dashboard
      </h2>

      {/* SHIFT & COUNT */}
      <div
        className="row text-center mb-4"
        style={{ fontSize: "2rem", fontWeight: "400" }}
      >
        <div className="col-6">
          <strong>Shift:</strong>
          <div
            className="badge bg-primary mt-3 p-3"
            style={{ fontSize: "2.2rem" }}
          >
            {data.shift || "..."}
          </div>
        </div>

        <div className="col-6">
          <strong>Count:</strong>
          <div
            className="badge bg-success mt-3 p-3"
            style={{ fontSize: "2.2rem" }}
          >
            {data.count ?? "0"}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Fm;
