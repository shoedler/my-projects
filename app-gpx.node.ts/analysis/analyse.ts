import { MetricContext, Metrics, MetricType } from "../model/metrics";
import { Point, AnalysedPointCollection, AnalysedPoint } from "../model/point";
import { verticalSpeedMetersPerSecond, paceMinutesPerKilometer, slopeDegrees } from "./calculations";
import { STANDSTILL_PACE_MINUTES_PER_KILOMETER } from "./constants";
import { elapsedTimeSeconds, elevationDeltaMeters, elevationGainMeters, elevationLossMeters, haverSineMeters } from "./functions";

const runningAverage = (previousAverage: number, count: number, newValue: number): number =>
  (previousAverage * (count - 1) + newValue) / count; // https://math.stackexchange.com/a/750517

const minOrNull = (value: number | null, defaultValue: number | null): number | null =>
  value === null ? defaultValue : Math.min(value, defaultValue ?? Infinity);

const maxOrNull = (value: number | null, defaultValue: number | null): number | null =>
  value === null ? defaultValue : Math.max(value, defaultValue ?? -Infinity);

const milisecondsToTimeString = (miliseconds: number): string => {
  const seconds = Math.floor(miliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsString = (seconds % 60).toString().padStart(2, "0");
  const minutesString = (minutes % 60).toString().padStart(2, "0");
  const hoursString = hours.toString().padStart(2, "0");

  return `${hoursString}:${minutesString}:${secondsString}`;
};

export const analyze = (points: Point[]): AnalysedPointCollection => {
  let extremaPaceMin: Metrics[MetricContext.Extrema][MetricType.Pace]["min"] = Infinity;
  let extremaPaceMax: Metrics[MetricContext.Extrema][MetricType.Pace]["max"] = -Infinity;

  let extremaVerticalSpeedMin: Metrics[MetricContext.Extrema][MetricType.VerticalSpeed]["min"] = Infinity;
  let extremaVerticalSpeedMax: Metrics[MetricContext.Extrema][MetricType.VerticalSpeed]["max"] = -Infinity;

  let extremaElevationMin: Metrics[MetricContext.Extrema][MetricType.Elevation]["min"] = Infinity;
  let extremaElevationMax: Metrics[MetricContext.Extrema][MetricType.Elevation]["max"] = -Infinity;

  let extremaSlopeMin: Metrics[MetricContext.Extrema][MetricType.Slope]["min"] = Infinity;
  let extremaSlopeMax: Metrics[MetricContext.Extrema][MetricType.Slope]["max"] = -Infinity;

  let extremaHeartRateMin: Metrics[MetricContext.Extrema][MetricType.HeartRate]["min"] = null;
  let extremaHeartRateMax: Metrics[MetricContext.Extrema][MetricType.HeartRate]["max"] = null;

  let extremaCadenceMin: Metrics[MetricContext.Extrema][MetricType.Cadence]["min"] = null;
  let extremaCadenceMax: Metrics[MetricContext.Extrema][MetricType.Cadence]["max"] = null;

  let totalDistance: Metrics[MetricContext.Total][MetricType.Distance] = 0;
  let totalElevationGain: Metrics[MetricContext.Total][MetricType.Elevation]["gain"] = 0;
  let totalElevationLoss: Metrics[MetricContext.Total][MetricType.Elevation]["loss"] = 0;
  let totalTimeElapsed: Metrics[MetricContext.Total][MetricType.Time]["elapsed"] = "";

  let averagePace: Metrics[MetricContext.Average][MetricType.Pace] = 0;
  let averageSlope: Metrics[MetricContext.Average][MetricType.Slope] = 0;
  let averageHeartRate: Metrics[MetricContext.Average][MetricType.HeartRate] = null;
  let averageCadence: Metrics[MetricContext.Average][MetricType.Cadence] = null;

  let currentPoint: Point = points[0];
  let previousPoint: Point;

  const analysedPoints: AnalysedPoint[] = [];
  analysedPoints.push({
    ...currentPoint,
    [MetricContext.Current]: {} as Metrics[MetricContext.Current],
  });

  for (let i = 1; i < points.length; i++) {
    previousPoint = currentPoint;
    currentPoint = points[i];

    // Analysis Functions
    // These are based on data from the current point and the previous point
    const timeToPrevSeconds: Metrics[MetricContext.Current][MetricType.Time]["toPreviousPoint"] = elapsedTimeSeconds(
      currentPoint,
      previousPoint
    );
    const timeSinceStartSeconds: Metrics[MetricContext.Current][MetricType.Time]["sinceStart"] = elapsedTimeSeconds(
      currentPoint,
      points[0]
    );

    const distToPrevMeters: Metrics[MetricContext.Current][MetricType.Distance]["toPreviousPoint"] = haverSineMeters(
      currentPoint,
      previousPoint
    );

    const elevGainToPrevMeters: Metrics[MetricContext.Current][MetricType.Elevation]["gainToPreviousPoint"] = elevationGainMeters(
      currentPoint,
      previousPoint
    );
    const elevLossToPrevMeters: Metrics[MetricContext.Current][MetricType.Elevation]["lossToPreviousPoint"] = elevationLossMeters(
      currentPoint,
      previousPoint
    );
    const elevDeltaToPrevMeters: Metrics[MetricContext.Current][MetricType.Elevation]["deltaToPreviousPoint"] = elevationDeltaMeters(
      currentPoint,
      previousPoint
    );

    // Calculations made from values from the analysis functions
    const vertSpeedToPrevMetersPerSecond: Metrics[MetricContext.Current][MetricType.VerticalSpeed]["toPreviousPoint"] =
      verticalSpeedMetersPerSecond(elevDeltaToPrevMeters, timeToPrevSeconds);

    const paceToPrevMinutesPerKilometer: Metrics[MetricContext.Current][MetricType.Pace]["toPreviousPoint"] = paceMinutesPerKilometer(
      distToPrevMeters,
      timeToPrevSeconds
    );

    const slopeToPrevDegrees: Metrics[MetricContext.Current][MetricType.Slope]["toPreviousPoint"] = slopeDegrees(
      distToPrevMeters,
      elevDeltaToPrevMeters
    );

    const current: Metrics[MetricContext.Current] = {
      index: i,
      [MetricType.Time]: {
        toPreviousPoint: timeToPrevSeconds,
        sinceStart: timeSinceStartSeconds,
      },
      [MetricType.Distance]: {
        toPreviousPoint: distToPrevMeters,
      },
      [MetricType.Elevation]: {
        gainToPreviousPoint: elevGainToPrevMeters,
        lossToPreviousPoint: elevLossToPrevMeters,
        deltaToPreviousPoint: elevDeltaToPrevMeters,
      },
      [MetricType.VerticalSpeed]: {
        toPreviousPoint: vertSpeedToPrevMetersPerSecond,
      },
      [MetricType.Pace]: {
        toPreviousPoint: paceToPrevMinutesPerKilometer,
      },
      [MetricType.Slope]: {
        toPreviousPoint: slopeToPrevDegrees,
      },
    };

    extremaPaceMin = Math.min(extremaPaceMin, current.pace.toPreviousPoint);
    extremaPaceMax = Math.max(extremaPaceMax, current.pace.toPreviousPoint);

    extremaVerticalSpeedMin = Math.min(extremaVerticalSpeedMin, current.verticalSpeed.toPreviousPoint);
    extremaVerticalSpeedMax = Math.max(extremaVerticalSpeedMax, current.verticalSpeed.toPreviousPoint);

    extremaElevationMin = Math.min(extremaElevationMin, currentPoint.ele);
    extremaElevationMax = Math.max(extremaElevationMax, currentPoint.ele);

    extremaHeartRateMin = minOrNull(currentPoint.hr, extremaHeartRateMin);
    extremaHeartRateMax = maxOrNull(currentPoint.hr, extremaHeartRateMax);

    extremaSlopeMin = Math.min(extremaSlopeMin, current.slope.toPreviousPoint);
    extremaSlopeMax = Math.max(extremaSlopeMax, current.slope.toPreviousPoint);

    extremaCadenceMin = minOrNull(currentPoint.cad, extremaCadenceMin);
    extremaCadenceMax = maxOrNull(currentPoint.cad, extremaCadenceMax);

    totalDistance += current.distance.toPreviousPoint;
    totalElevationGain += current.elevation.gainToPreviousPoint;
    totalElevationLoss += current.elevation.lossToPreviousPoint;

    averageSlope = runningAverage(averageSlope, i, current.slope.toPreviousPoint);

    averagePace = runningAverage(averagePace, i, current.pace.toPreviousPoint < STANDSTILL_PACE_MINUTES_PER_KILOMETER ? current.pace.toPreviousPoint : averagePace);

    // Hr and Cad maybe null. The running average depends on the current index. If we just fallback to 0, the average will be wrong.
    // This is why we use the previous average as fallback, and then fallback to 0 if there is no previous average.
    averageHeartRate = runningAverage(averageHeartRate ?? 0, i, currentPoint.hr ?? averageHeartRate ?? 0);
    averageCadence = runningAverage(averageCadence ?? 0, i, currentPoint.cad ?? averageCadence ?? 0);

    // Here's the proof that this works:

    // $$
    // \begin{align}
    // \text{Running average:} \quad \mu_{next} &= \frac{\mu_{prev}(c-1)+v}{c}
    // \\
    // \text{Assumption:} \quad \mu_{prev} &= \frac{\mu_{prev}(c-1)+\mu_{prev}}{c}
    // \\
    // \mu_{prev} * c &= \mu_{prev} * c - \mu_{prev} + \mu_{prev}
    // \\
    // \mu_{prev} * c &= \mu_{prev} * c
    // \\
    // \mu_{prev} &= \mu_{prev}
    // \\
    // \text{Q.E.D}
    // \end{align}
    // $$

    analysedPoints.push({
      ...currentPoint,
      [MetricContext.Current]: current,
    });
  }

  totalTimeElapsed = milisecondsToTimeString(currentPoint.time.getTime() - points[0].time.getTime());

  return {
    points: analysedPoints,
    [MetricContext.Total]: {
      [MetricType.Distance]: totalDistance,
      [MetricType.Elevation]: {
        gain: totalElevationGain,
        loss: totalElevationLoss,
      },
      [MetricType.Time]: {
        elapsed: totalTimeElapsed,
      },
    },
    [MetricContext.Average]: {
      [MetricType.Pace]: averagePace,
      [MetricType.Slope]: averageSlope,
      [MetricType.HeartRate]: averageHeartRate,
      [MetricType.Cadence]: averageCadence,
    },
    [MetricContext.Extrema]: {
      [MetricType.Elevation]: {
        min: extremaElevationMin,
        max: extremaElevationMax,
      },
      [MetricType.Pace]: {
        min: extremaPaceMin,
        max: extremaPaceMax,
      },
      [MetricType.VerticalSpeed]: {
        min: extremaVerticalSpeedMin,
        max: extremaVerticalSpeedMax,
      },
      [MetricType.Slope]: {
        min: extremaSlopeMin,
        max: extremaSlopeMax,
      },
      [MetricType.HeartRate]: {
        min: extremaHeartRateMin,
        max: extremaHeartRateMax,
      },
      [MetricType.Cadence]: {
        min: extremaCadenceMin,
        max: extremaCadenceMax,
      },
    },
  };
};
