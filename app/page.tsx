"use client";

import { useMemo, useState } from "react";
import { faultCodes } from "./data/codes";
import { vehicleData as bmwVehicles } from "./data/vehicles";
import { bmwYears } from "./data/years";

type FaultCodeResult = {
  code: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  causes: string[];
  fixes: string[];
  estimatedRepairCost: string;
  meaning?: string;
  symptoms?: string[];
  bmwInsight?: string;
};

type TrimEntry = {
  engines?: string[];
  drivetrains?: string[];
};

type YearWithLegacyModels = {
  models?: string[];
};

type YearWithTrimMap = Record<string, TrimEntry>;

type YearData = YearWithLegacyModels | YearWithTrimMap;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasLegacyModelsArray(yearData: YearData): yearData is YearWithLegacyModels {
  return "models" in yearData && Array.isArray(yearData.models);
}

function getYearData(year: string): YearData | undefined {
  return (bmwVehicles as Record<string, YearData | undefined>)[year];
}

function getTrimsForYear(year: string): string[] {
  if (!year) return [];

  const yearData = getYearData(year);
  if (!yearData || !isRecord(yearData)) return [];

  if (hasLegacyModelsArray(yearData)) {
    return yearData.models ?? [];
  }

  return Object.keys(yearData);
}

function getTrimData(year: string, trim: string): TrimEntry | undefined {
  if (!year || !trim) return undefined;

  const yearData = getYearData(year);
  if (!yearData || !isRecord(yearData)) return undefined;

  if (hasLegacyModelsArray(yearData)) {
    return undefined;
  }

  return yearData[trim];
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<FaultCodeResult | null>(null);

  const years = bmwYears;

  const trims = useMemo(() => {
    return getTrimsForYear(selectedYear);
  }, [selectedYear]);

  const engines = useMemo(() => {
    const trimData = getTrimData(selectedYear, selectedTrim);
    return trimData?.engines ?? [];
  }, [selectedYear, selectedTrim]);

  function handleYearChange(value: string) {
    setSelectedYear(value);
    setSelectedTrim("");
    setSelectedEngine("");
    setResult(null);
  }

  function handleTrimChange(value: string) {
    setSelectedTrim(value);
    setSelectedEngine("");
    setResult(null);
  }

  function decodeCode() {
    const cleaned = code.toUpperCase().trim();
    const found = faultCodes[cleaned] as FaultCodeResult | undefined;
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
            value={selectedTrim}
            onChange={(e) => handleTrimChange(e.target.value)}
            disabled={!selectedYear || trims.length === 0}
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
              opacity: selectedYear && trims.length > 0 ? 1 : 0.6,
            }}
          >
            <option value="">
              {selectedYear && trims.length === 0
                ? "No trims added yet"
                : "Select Trim"}
            </option>
            {trims.map((trim) => (
              <option key={trim} value={trim}>
                {trim}
              </option>
            ))}
          </select>

          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            disabled={!selectedTrim || engines.length === 0}
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
              opacity: selectedTrim && engines.length > 0 ? 1 : 0.6,
            }}
          >
            <option value="">
              {selectedTrim && engines.length === 0
                ? "No engines added yet"
                : "Select Engine"}
            </option>
            {engines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>

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
              {selectedYear || "—"} / {selectedTrim || "—"} / {selectedEngine || "—"}
            </div>

            <h2 style={{ color: "#22c55e", marginTop: 0 }}>{result.code}</h2>
            <p style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }}>
              {result.title}
            </p>

            {result.meaning && (
              <>
                <h3 style={{ marginTop: "20px" }}>Meaning</h3>
                <p style={{ lineHeight: 1.8 }}>{result.meaning}</p>
              </>
            )}

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
              {result.causes.map((cause, i) => (
                <li key={i}>{cause}</li>
              ))}
            </ul>

            {result.symptoms && result.symptoms.length > 0 && (
              <>
                <h3 style={{ marginTop: "20px" }}>Symptoms</h3>
                <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
                  {result.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 style={{ marginTop: "20px" }}>Fixes</h3>
            <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
              {result.fixes.map((fix, i) => (
                <li key={i}>{fix}</li>
              ))}
            </ul>

            {result.bmwInsight && (
              <>
                <h3 style={{ marginTop: "20px" }}>BMW Insight</h3>
                <p style={{ lineHeight: 1.8 }}>{result.bmwInsight}</p>
              </>
            )}

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