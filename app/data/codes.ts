export type FaultCodeData = {
  code: string;
  title: string;
  meaning: string;
  severity: "Low" | "Medium" | "High";
  causes: string[];
  symptoms: string[];
  fixes: string[];
  estimatedRepairCost: string;
  bmwInsight: string;
};

export const faultCodes: Record<string, FaultCodeData> = {
  P0171: {
    code: "P0171",
    title: "System Too Lean (Bank 1)",
    meaning:
      "The engine is running with too much air and not enough fuel on Bank 1, which is very common on BMW engines due to unmetered air entering the system.",
    severity: "Medium",
    causes: [
      "Cracked or disconnected vacuum lines (very common on BMW)",
      "Failing or contaminated MAF sensor",
      "Intake boot cracks (especially on older BMWs)",
      "Weak fuel pump or clogged fuel filter",
      "Leaking PCV/CCV system",
    ],
    symptoms: [
      "Rough idle or shaking at idle",
      "Hesitation during acceleration",
      "Check engine light",
      "Poor fuel economy",
      "Possible stalling",
    ],
    fixes: [
      "Smoke test intake system for vacuum leaks",
      "Inspect and replace cracked intake boots",
      "Clean or replace MAF sensor",
      "Check fuel pressure and fuel pump",
      "Inspect PCV/CCV system for leaks",
    ],
    estimatedRepairCost: "$100 - $800",
    bmwInsight:
      "On BMWs, this is most commonly caused by vacuum leaks rather than fuel system issues—always smoke test before replacing parts.",
  },

  P0420: {
    code: "P0420",
    title: "Catalyst System Efficiency Below Threshold",
    meaning:
      "The catalytic converter is no longer efficiently reducing emissions, often due to aging or upstream engine issues.",
    severity: "Medium",
    causes: [
      "Worn or failing catalytic converter",
      "Faulty upstream or downstream O2 sensors",
      "Exhaust leaks before the catalytic converter",
      "Running rich or misfires damaging the cat",
    ],
    symptoms: [
      "Check engine light",
      "Reduced fuel efficiency",
      "Sulfur or rotten egg smell",
      "Possible slight power loss",
    ],
    fixes: [
      "Verify O2 sensor readings before replacing cat",
      "Check for exhaust leaks",
      "Replace faulty O2 sensors",
      "Replace catalytic converter if confirmed failed",
    ],
    estimatedRepairCost: "$150 - $2500",
    bmwInsight:
      "BMW cats rarely fail on their own—this code is often the result of long-term misfires or fueling issues.",
  },

  "2C57": {
    code: "2C57",
    title: "Boost Pressure Control Issue",
    meaning:
      "The DME is unable to properly control turbo boost pressure, typically due to leaks or control component failure.",
    severity: "High",
    causes: [
      "Cracked or blown charge pipe (very common on N54/N55)",
      "Boost leaks in intercooler piping",
      "Faulty wastegate actuator",
      "Bad boost solenoid",
    ],
    symptoms: [
      "Loss of power or slow acceleration",
      "Turbo not building boost",
      "Check engine light",
      "Possible limp mode",
    ],
    fixes: [
      "Inspect charge pipe for cracks or failure",
      "Pressure test boost system",
      "Check wastegate operation",
      "Replace boost solenoid if needed",
    ],
    estimatedRepairCost: "$150 - $2000",
    bmwInsight:
      "Plastic charge pipes on turbo BMW engines are a known weak point—upgrading to aluminum is a permanent fix.",
  },

  P0300: {
    code: "P0300",
    title: "Random/Multiple Cylinder Misfire Detected",
    meaning:
      "Multiple cylinders are misfiring randomly, indicating a system-wide ignition or fueling issue.",
    severity: "High",
    causes: [
      "Worn spark plugs (common on turbo BMWs)",
      "Failing ignition coils",
      "Fuel injector issues",
      "Vacuum leaks",
      "Carbon buildup on intake valves (direct injection engines)",
    ],
    symptoms: [
      "Engine shaking or rough idle",
      "Loss of power",
      "Flashing check engine light",
      "Poor acceleration",
    ],
    fixes: [
      "Replace spark plugs",
      "Replace or swap ignition coils",
      "Check injectors for proper operation",
      "Inspect for vacuum leaks",
      "Consider walnut blasting for carbon buildup",
    ],
    estimatedRepairCost: "$150 - $1200",
    bmwInsight:
      "BMW turbo engines (N54/N55/B58) are very sensitive to ignition components—plugs and coils are frequent maintenance items.",
  },

  P0301: {
    code: "P0301",
    title: "Cylinder 1 Misfire Detected",
    meaning:
      "Cylinder 1 is not firing correctly due to ignition, fuel, or compression issues.",
    severity: "High",
    causes: [
      "Faulty ignition coil on cylinder 1",
      "Worn spark plug",
      "Clogged or failing fuel injector",
      "Carbon buildup",
    ],
    symptoms: [
      "Rough idle",
      "Engine vibration",
      "Loss of power",
      "Check engine light",
    ],
    fixes: [
      "Swap ignition coil with another cylinder to confirm",
      "Replace spark plug",
      "Check injector function",
      "Inspect for carbon buildup",
    ],
    estimatedRepairCost: "$150 - $900",
    bmwInsight:
      "Swapping coils between cylinders is the fastest way to confirm a bad coil on BMW engines.",
  },

  P0302: {
    code: "P0302",
    title: "Cylinder 2 Misfire Detected",
    meaning:
      "Cylinder 2 is misfiring due to ignition, fuel delivery, or internal engine issues.",
    severity: "High",
    causes: [
      "Bad ignition coil",
      "Worn spark plug",
      "Fuel injector malfunction",
      "Air/fuel imbalance",
    ],
    symptoms: [
      "Rough running engine",
      "Loss of power",
      "Check engine light",
      "Possible shaking at idle",
    ],
    fixes: [
      "Swap ignition coil to diagnose",
      "Replace spark plug",
      "Check injector performance",
      "Inspect intake system",
    ],
    estimatedRepairCost: "$150 - $900",
    bmwInsight:
      "BMW misfires are most often ignition-related—start with plugs and coils before deeper diagnosis.",
  },

  P0456: {
    code: "P0456",
    title: "Evaporative Emissions System Leak (Small Leak)",
    meaning:
      "A small leak has been detected in the EVAP system, allowing fuel vapors to escape.",
    severity: "Low",
    causes: [
      "Loose or faulty gas cap",
      "Cracked EVAP hoses",
      "Faulty purge valve",
      "Leaking charcoal canister",
    ],
    symptoms: [
      "Check engine light",
      "No noticeable drivability issues",
      "Slight fuel smell",
    ],
    fixes: [
      "Tighten or replace gas cap",
      "Inspect EVAP lines for cracks",
      "Replace purge valve if faulty",
      "Smoke test EVAP system",
    ],
    estimatedRepairCost: "$50 - $300",
    bmwInsight:
      "This code rarely affects performance—BMW EVAP leaks are usually minor and easy to fix.",
  },

  P112F: {
    code: "P112F",
    title: "Manifold Absolute Pressure to Throttle Angle",
    meaning:
      "The relationship between boost pressure and throttle position is out of expected range, often due to airflow inconsistencies.",
    severity: "Medium",
    causes: [
      "Boost leaks",
      "Dirty or faulty MAP sensor",
      "Throttle body malfunction",
      "Charge pipe issues",
    ],
    symptoms: [
      "Reduced power",
      "Hesitation under acceleration",
      "Check engine light",
      "Inconsistent throttle response",
    ],
    fixes: [
      "Inspect for boost leaks",
      "Clean or replace MAP sensor",
      "Check throttle body operation",
      "Inspect charge pipes",
    ],
    estimatedRepairCost: "$100 - $800",
    bmwInsight:
      "On turbo BMWs, this code is commonly tied to charge pipe or boost leak issues rather than sensor failure.",
  },

  "2AAF": {
    code: "2AAF",
    title: "Fuel Pump Plausibility",
    meaning:
      "The high-pressure fuel system is not meeting expected values, often indicating HPFP or fuel delivery issues.",
    severity: "High",
    causes: [
      "Failing high-pressure fuel pump (HPFP)",
      "Low fuel pressure from low-pressure pump",
      "Faulty fuel pressure sensor",
      "Fuel supply restrictions",
    ],
    symptoms: [
      "Long crank or hard start",
      "Loss of power under load",
      "Engine hesitation",
      "Check engine light",
    ],
    fixes: [
      "Test high-pressure fuel system",
      "Replace HPFP if confirmed faulty",
      "Check low-pressure fuel pump",
      "Inspect fuel pressure sensors",
    ],
    estimatedRepairCost: "$300 - $2000",
    bmwInsight:
      "This code is strongly associated with HPFP failures on N54 engines—one of BMW’s most well-known issues.",
  },
};
