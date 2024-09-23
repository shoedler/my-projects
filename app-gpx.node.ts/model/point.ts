import { MetricContext, Metrics } from "./metrics";
import { Trkpt } from "./gpx";

export interface Point {
  ele: number;
  lat: number;
  lon: number;
  time: Date;
  hr: number | null;
  cad: number | null;
}

export type AnalysedPoint = Point & {
  [MetricContext.Current]: Metrics[MetricContext.Current];
};

export interface AnalysedPointCollection {
  points: AnalysedPoint[];
  [MetricContext.Total]: Metrics[MetricContext.Total];
  [MetricContext.Average]: Metrics[MetricContext.Average];
  [MetricContext.Extrema]: Metrics[MetricContext.Extrema];
}
