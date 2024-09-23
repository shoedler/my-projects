import { Point } from "../model/point";
import { EARTH_RADIUS_METERS } from "./constants";

export type AnalysisFunction<T> = (current: Point, previous: Point) => T;

export const elevationGainMeters: AnalysisFunction<number> = (current: Point, previous: Point) => Math.max(0, current.ele - previous.ele);
export const elevationLossMeters: AnalysisFunction<number> = (current: Point, previous: Point) => Math.max(0, previous.ele - current.ele);
export const elevationDeltaMeters: AnalysisFunction<number> = (current: Point, previous: Point) => current.ele - previous.ele;

export const elapsedTimeSeconds: AnalysisFunction<number> = (current: Point, previous: Point) => {
  const Δt = (current.time.getTime() - previous.time.getTime()) / 1000; /* [s] */
  return Δt;
};

export const haverSineMeters: AnalysisFunction<number> = (current: Point, previous: Point) => {
  let lat1 = previous.lat;
  let lon1 = previous.lon;

  let lat2 = current.lat;
  let lon2 = current.lon;

  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS_METERS * c; // Distance in meters

  return d;
};
