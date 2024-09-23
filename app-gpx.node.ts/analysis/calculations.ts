export const slopeDegrees = (dMeters: number, ΔhMeters: number) => {
  if (dMeters === 0) {
    return 0;
  }

  return Math.atan(ΔhMeters / dMeters) * (180 / Math.PI); /* [°] */
};

export const verticalSpeedMetersPerSecond = (ΔhMeters: number, ΔtSeconds: number) => {
  if (ΔtSeconds === 0 || ΔhMeters === 0) {
    return 0;
  }

  return ΔhMeters / ΔtSeconds; /* [m/s] */
};

export const paceMinutesPerKilometer = (dMeters: number, ΔtSeconds: number) => {
  if (ΔtSeconds === 0 || dMeters === 0) {
    return 0;
  }

  return ΔtSeconds / 60 / (dMeters / 1000); /* [min/km] */
};
