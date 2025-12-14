import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fm({ data }) {
  return (
    <div
      className="shadow-lg p-4"
      style={{
        width: "100%",
        height: "100%", // auto-fit to slide
        borderRadius: "22px",
        background: "linear-gradient(145deg, #d3f8ef, #a4e2f3)",
        border: "6px solid",
        borderImage: "linear-gradient(45deg, #0fd68a, #0a8f55) 1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <h2
        className="text-center mb-4  px-4 py-2"
        style={{
          background: "linear-gradient(90deg, #0fd68a, #0abf6c)",
          borderRadius: "14px",
          fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
          fontWeight: 800,
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          //width: "fit-content",
        }}
      >
        FM Line Dashboard
      </h2>

      {/* MAIN CONTENT */}
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ flex: 1, width: "100%" }}
      >

        {/* SHIFT ROW */}
        <div
          className="d-flex align-items-center justify-content-center mb-5"
          style={{
            width: "100%",
            gap: "3rem",
          }}
        >
          <strong
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              textAlign: "right",
              minWidth: "220px", // ensures label stays aligned
            }}
          >
            Shift :
          </strong>

          <div
            style={{
              background: "linear-gradient(90deg, #1e90ff, #1c6cd6)",
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              borderRadius: "18px",
              padding: "clamp(15px, 2vw, 25px) clamp(30px, 4vw, 60px)",
              minWidth: "clamp(180px, 25vw, 300px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
          >
            {data.shift || "..."}
          </div>
        </div>

        {/* COUNT ROW */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "100%",
            gap: "3rem",
          }}
        >
          <strong
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              textAlign: "right",
              minWidth: "220px",
            }}
          >
          Count :
          </strong>

          <div
            style={{
              background: "linear-gradient(90deg, #2ecc71, #27ae60)",
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              borderRadius: "18px",
              padding: "clamp(15px, 2vw, 25px) clamp(30px, 4vw, 60px)",
              minWidth: "clamp(180px, 25vw, 300px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
          >
            {data.count ?? "0"}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Fm;
