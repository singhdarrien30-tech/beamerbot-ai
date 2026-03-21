export type VehicleEntry = {
  engines: string[];
  drivetrains: string[];
};

export type VehicleData = Record<string, Record<string, VehicleEntry>>;

export const bmwVehicles: VehicleData = {
  "1996": {
    "318i": { engines: ["M42", "M44"], drivetrains: [] },
    "328i": { engines: ["M52"], drivetrains: [] },
  },
  "2003": {
    "325i": { engines: ["M54", "M56"], drivetrains: [] },
    "330i": { engines: ["M54"], drivetrains: [] },
    "X3 3.0i": { engines: ["M54"], drivetrains: ["AWD"] },
  },
  "2008": {
    "135i": { engines: ["N54"], drivetrains: [] },
    "335i": { engines: ["N54"], drivetrains: [] },
    "335xi": { engines: ["N54"], drivetrains: ["xDrive"] },
  },
  "2015": {
    "335i": { engines: ["N55"], drivetrains: [] },
    "335i xDrive": { engines: ["N55"], drivetrains: ["xDrive"] },
    "M3": { engines: ["S55"], drivetrains: [] },
  },
  "2017": {
    "330i": { engines: ["B46"], drivetrains: ["RWD", "xDrive"] },
    "340i": { engines: ["B58"], drivetrains: ["RWD", "xDrive"] },
    "M3": { engines: ["S55"], drivetrains: [] },
  },
};
