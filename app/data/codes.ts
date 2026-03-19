export type FaultCodeData = {
  code: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  causes: string[];
  fixes: string[];
  estimatedRepairCost: string;
};

export const faultCodes: Record<string, FaultCodeData> = {
  P0171: {
    code: "P0171",
    title: "System Too Lean (Bank 1)",
    severity: "Medium",
    causes: [
      "Vacuum leak",
      "Dirty or failing MAF sensor",
      "Weak fuel pressure",
    ],
    fixes: [
      "Check for vacuum leaks",
      "Clean or replace MAF sensor",
      "Check fuel system pressure",
    ],
    estimatedRepairCost: "$100 - $800",
  },

  P0420: {
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold",
    severity: "Medium",
    causes: [
      "Bad catalytic converter",
      "O2 sensor issues",
      "Exhaust leak",
    ],
    fixes: [
      "Check catalytic converter",
      "Replace faulty O2 sensors",
      "Fix exhaust leaks",
    ],
    estimatedRepairCost: "$150 - $2500",
  },

  "2C57": {
    code: "2C57",
    title: "Boost Pressure Control Issue",
    severity: "High",
    causes: [
      "Boost leak",
      "Bad charge pipe",
      "Wastegate issue",
    ],
    fixes: [
      "Inspect boost system",
      "Check charge pipe",
      "Check turbo components",
    ],
    estimatedRepairCost: "$150 - $2000",
  },

  P0300: {
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire Detected",
    severity: "High",
    causes: [
      "Bad spark plugs",
      "Ignition coil failure",
      "Fuel injector issues",
    ],
    fixes: [
      "Replace spark plugs",
      "Check ignition coils",
      "Inspect fuel injectors",
    ],
    estimatedRepairCost: "$150 - $1200",
  },

  P0301: {
    code: "P0301",
    title: "Cylinder 1 Misfire Detected",
    severity: "High",
    causes: [
      "Bad spark plug",
      "Faulty ignition coil",
      "Fuel injector issue",
    ],
    fixes: [
      "Replace spark plug",
      "Swap ignition coil",
      "Check injector",
    ],
    estimatedRepairCost: "$150 - $900",
  },

  P0302: {
    code: "P0302",
    title: "Cylinder 2 Misfire Detected",
    severity: "High",
    causes: [
      "Bad spark plug",
      "Faulty ignition coil",
      "Fuel injector issue",
    ],
    fixes: [
      "Replace spark plug",
      "Swap ignition coil",
      "Check injector",
    ],
    estimatedRepairCost: "$150 - $900",
  },

  P0456: {
    code: "P0456",
    title: "Evaporative Emissions System Leak (Small Leak)",
    severity: "Low",
    causes: [
      "Loose gas cap",
      "Cracked EVAP hose",
      "Faulty purge valve",
    ],
    fixes: [
      "Tighten or replace gas cap",
      "Inspect EVAP system",
      "Replace purge valve",
    ],
    estimatedRepairCost: "$50 - $300",
  },

  P112F: {
    code: "P112F",
    title: "Manifold Absolute Pressure to Throttle Angle",
    severity: "Medium",
    causes: [
      "Boost leak",
      "Dirty MAP sensor",
      "Throttle body issue",
    ],
    fixes: [
      "Check boost leaks",
      "Clean MAP sensor",
      "Inspect throttle body",
    ],
    estimatedRepairCost: "$100 - $800",
  },

  "2AAF": {
    code: "2AAF",
    title: "Fuel Pump Plausibility",
    severity: "High",
    causes: [
      "Low fuel pressure",
      "Failing high-pressure fuel pump",
      "Fuel sensor issue",
    ],
    fixes: [
      "Test fuel pressure",
      "Replace HPFP if needed",
      "Check fuel system",
    ],
    estimatedRepairCost: "$300 - $2000",
  },
};
