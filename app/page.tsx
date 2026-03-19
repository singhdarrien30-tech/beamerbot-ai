"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { faultCodes } from "./data/codes";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  function decodeCode(inputCode?: string) {
    const cleaned = (inputCode || code).toUpperCase().trim();
    const found = faultCodes[cleaned];

    if (cleaned) {
      router.replace(`/?code=${cleaned}`);
    } else {
      router.replace("/");
    }

    if (found) {
      setResult(found);
    } else {
      setResult(null);
    }
  }

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");

    if (codeFromUrl) {
      setCode(codeFromUrl);
      const found = faultCodes[codeFromUrl.toUpperCase().trim()];
      if (found) {
        setResult(found);
      } else {
        setResult(null);
      }
    }
  }, [searchParams]);

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
      <div style={{ width: "100%", maxWidth: "650px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>BeamerBot AI</h1>
        <p style={{ color: "#bbb", marginBottom: "24px" }}>
          BMW Fault Code Decoder
        </p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            placeholder="Enter BMW code (ex: P0171)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              padding: "12px",
              flex: 1,
              background: "#111",
              color: "white",
              border: "1px solid #333",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          <button
            onClick={() => decodeCode()}
            style={{
              padding: "12px 18px",
              background: "#22c55e",
              color: "black",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Decode
          </button>
        </div>

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
            <h2 style={{ color: "#22c55e", marginTop: 0 }}>{result.code}</h2>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                marginBottom: "10px",
              }}
            >
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
      </div>
    </main>
  );
}
