"use client";

import { useMemo, useState } from "react";
import { faultCodes } from "./data/codes";
import { bmwVehicles } from "./data/vehicles";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedDrivetrain, setSelectedDrivetrain] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);

  const years = Object.keys(bmwVehicles);

  const models = useMemo(() => {
    if (!selectedYear) return [];
    const yearData = bmwVehicles[selectedYear];
    return yearData ? Object.keys(yearData) : [];
  }, [selectedYear]);

  const engines = useMemo(() => {
    if (!selectedYear || !selectedModel) return [];
    const yearData = bmwVehicles[selectedYear];
    if (!yearData) return [];
    const modelData = yearData[selectedModel];
    return modelData ? modelData.engines : [];
  }, [selectedYear, selectedModel]);

  const drivetrains = useMemo(() => {
    if (!selectedYear || !selectedModel) return [];
    const yearData = bmwVehicles[selectedYear];
    if (!yearData) return [];
    const modelData = yearData[selectedModel];
    return modelData ? modelData.drivetrains : [];
  }, [selectedYear, selectedModel]);

  const showDrivetrainDropdown = drivetrains.length > 0;

  function handleYearChange(value: string) {
    setSelectedYear(value);
    setSelectedModel("");
    setSelectedEngine("");
    setSelectedDrivetrain("");
    setResult(null);
  }

  function handleModelChange(value: string) {
    setSelectedModel(value);
    setSelectedEngine("");
    setSelectedDrivetrain("");
    setResult(null);
  }

  function decodeCode() {
    const cleaned = code.toUpperCase().trim();
    const found = faultCodes[cleaned];
    setResult(found || null);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "760px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>BeamerBot AI</h1>
        <p style={{ color: "#bbb", marginBottom: "24px" }}>
          BMW Fault Code Decoder
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
            }}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!selectedYear}
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
              opacity: selectedYear ? 1 : 0.6,
            }}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            disabled={!selectedModel}
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
              opacity: selectedModel ? 1 : 0.6,
            }}
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>

          {showDrivetrainDropdown ? (
            <select
              value={selectedDrivetrain}
              onChange={(e) => setSelectedDrivetrain(e.target.value)}
              style={{
                padding: "12px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                borderRadius: "10px",
              }}
            >
              <option value="">Select Drivetrain</option>
              {drivetrains.map((drivetrain) => (
                <option key={drivetrain} value={drivetrain}>
                  {drivetrain}
                </option>
              ))}
            </select>
          ) : (
            <input
              placeholder="Enter BMW code (ex: P0171)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                padding: "12px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                borderRadius: "10px",
              }}
            />
          )}

          {showDrivetrainDropdown && (
            <input
              placeholder="Enter BMW code (ex: P0171)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                padding: "12px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                borderRadius: "10px",
                gridColumn: "1 / -1",
              }}
            />
          )}
        </div>

        <button
          onClick={decodeCode}
          style={{
            padding: "12px 18px",
            background: "#22c55e",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Decode
        </button>

        {result && (
          <div
            style={{
              marginTop: "20px",
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #333",
            }}
          >
            <div style={{ marginBottom: "14px", color: "#aaa", fontSize: "14px" }}>
              <strong>Selected BMW:</strong>{" "}
              {selectedYear || "—"} / {selectedModel || "—"} / {selectedEngine || "—"}
              {showDrivetrainDropdown ? ` / ${selectedDrivetrain || "—"}` : ""}
            </div>

            <h2 style={{ color: "#22c55e", marginTop: 0 }}>{result.code}</h2>
            <p style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }}>
              {result.title}
            </p>
            <p>
              Severity:{" "}
              <span
                style={{
                  color:
                    result.severity === "High"
                      ? "red"
                      : result.severity === "Medium"
                      ? "orange"
                      : "#22c55e",
                  fontWeight: "bold",
                }}
              >
                {result.severity}
              </span>
            </p>

            <h3 style={{ marginTop: "20px" }}>Causes</h3>
            <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
              {result.causes.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <h3 style={{ marginTop: "20px" }}>Fixes</h3>
            <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
              {result.fixes.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <p style={{ marginTop: "18px", fontWeight: "bold" }}>
              Estimated Cost: {result.estimatedRepairCost}
            </p>
          </div>
        )}

        <p
          style={{
            marginTop: "40px",
            color: "#666",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Built by Darrien Singh
        </p>
      </div>
    </main>
  );
}
