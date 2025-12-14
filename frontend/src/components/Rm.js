import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Rm({ data }) {
  return (
    <div
      className="shadow-lg p-4"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "22px",
        background: "linear-gradient(145deg, #d3f8ef, #a4e2f3)",
        border: "6px solid",
        borderImage: "linear-gradient(45deg, #3aa0ff, #005fcc) 1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        className="text-center mb-4 px-4 py-2"
        style={{
          background: "linear-gradient(90deg, #4da8e6, #006bbf)",
          borderRadius: "14px",
          fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
          fontWeight: 800,
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        RM Line Dashboard
      </h2>

      {/* MAIN CONTENT */}
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ flex: 1 }}>

        {/* SHIFT */}
        <div className="d-flex align-items-center justify-content-center mb-5" style={{ gap: "3rem" }}>
          <strong style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", minWidth: "220px", textAlign: "right" }}>
            Shift :
          </strong>

          <div
            style={{
              background: "linear-gradient(90deg, #1e90ff, #005fcc)",
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              borderRadius: "18px",
              padding: "clamp(15px, 2vw, 25px) clamp(30px, 4vw, 60px)",
              minWidth: "clamp(180px, 25vw, 300px)",
            }}
          >
            {data.shift || "..."}
          </div>
        </div>

        {/* COUNT */}
        <div className="d-flex align-items-center justify-content-center mb-5" style={{ gap: "3rem" }}>
          <strong style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", minWidth: "220px", textAlign: "right" }}>
            Count :
          </strong>

          <div
            style={{
              background: "linear-gradient(90deg, #2ecc71, #1b8f4a)",
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              borderRadius: "18px",
              padding: "clamp(15px, 2vw, 25px) clamp(30px, 4vw, 60px)",
              minWidth: "clamp(180px, 25vw, 300px)",
            }}
          >
            {data.count ?? "0"}
          </div>
        </div>

        {/* TYPE COUNTS */}
        <div className="row w-100 mt-4">
          {["PetrolAT", "PetrolMT", "DieselAT", "DieselMT"].map((key, i) => (
            <div key={i} className="col-6 mb-4 text-center">
              <strong style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                {key.replace(/([A-Z])/g, "-$1").toUpperCase()} :
              </strong>

              <div
                className="mt-3"
                style={{
                  background: "linear-gradient(90deg, #6c757d, #495057)",
                  color: "white",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  borderRadius: "16px",
                  padding: "clamp(15px, 2vw, 25px)",
                  minWidth: "clamp(150px, 20vw, 260px)",
                  margin: "auto",
                }}
              >
                {data[key] ?? "0"}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Rm;
