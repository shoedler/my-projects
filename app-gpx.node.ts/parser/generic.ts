import { XMLParser } from "fast-xml-parser";
import { Trkpt } from "../model/gpx";
import { Point } from "../model/point";

export class GPXParser extends XMLParser {
  constructor() {
    super({
      ignoreAttributes: false, // We need attributes, e.g. lat and lon: <trkpt lat="46.2" lon="7.9">
      attributeNamePrefix: "", // We don't want the attributes to be prefixed when we lift them to the parent object. Might result in collisions for other filetypes
      attributeValueProcessor: (name, value, _) => {
        if (name === "lat" || name === "lon") {
          return parseFloat(value);
        }

        return value;
      },
      tagValueProcessor: (name, value, _) => {
        if (name === "time") {
          return new Date(value);
        }

        if (name === "ele") {
          if (typeof value === "string") {
            return parseFloat(value);
          }
        }

        if (name === "ns3:hr" || name === "ns3:cad") {
          return parseFloat(value);
        }
      },
    });
  }

  public normalizePoints = (trkseg: Trkpt[]): Point[] => {
    return trkseg.map(this.trkptToPoint);
  };

  private trkptToPoint = (trkpt: Trkpt): Point => {
    return {
      ...trkpt,
      hr: trkpt.extensions["ns3:TrackPointExtension"]["ns3:hr"] ?? null,
      cad: trkpt.extensions["ns3:TrackPointExtension"]["ns3:cad"] * 2 ?? null,
    };
  };
}
