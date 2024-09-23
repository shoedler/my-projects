import { Point } from "./point";

export enum MetricType {
  Time = "time",
  Distance = "distance",
  Elevation = "elevation",
  Slope = "slope",
  HeartRate = "heartRate",
  Cadence = "cadence",
  VerticalSpeed = "verticalSpeed",
  Pace = "pace",
}

export enum MetricContext {
  Total = "total",
  Current = "current",
  Average = "average",
  Extrema = "extrema",
}

export type Metrics = {
  [MetricContext.Total]: {
    [MetricType.Time]: {
      elapsed: string;
    };
    [MetricType.Distance]: number;
    [MetricType.Elevation]: {
      gain: number;
      loss: number;
    };
  };

  [MetricContext.Average]: {
    [MetricType.Pace]: number;
    [MetricType.Slope]: number;
    [MetricType.HeartRate]: number | null;
    [MetricType.Cadence]: number | null;
  };

  [MetricContext.Extrema]: {
    [MetricType.Elevation]: {
      min: number;
      max: number;
    };
    [MetricType.VerticalSpeed]: {
      min: number;
      max: number;
    };
    [MetricType.Pace]: {
      min: number;
      max: number;
    };
    [MetricType.Slope]: {
      min: number;
      max: number;
    };
    [MetricType.HeartRate]: {
      min: number | null;
      max: number | null;
    };
    [MetricType.Cadence]: {
      min: number | null;
      max: number | null;
    };
  };

  [MetricContext.Current]: {
    index: number;
    [MetricType.Time]: {
      toPreviousPoint: number;
      sinceStart: number;
    };
    [MetricType.Distance]: {
      toPreviousPoint: number;
    };
    [MetricType.Elevation]: {
      gainToPreviousPoint: number;
      lossToPreviousPoint: number;
      deltaToPreviousPoint: number;
    };
    [MetricType.VerticalSpeed]: {
      toPreviousPoint: number;
    };
    [MetricType.Pace]: {
      toPreviousPoint: number;
    };
    [MetricType.Slope]: {
      toPreviousPoint: number;
    };
  };
};
