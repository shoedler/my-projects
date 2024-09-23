import { XMLParser } from "fast-xml-parser";
import { readFileSync, writeFileSync } from "fs";
import { Gpx } from "./model/gpx";

import { analyze } from "./analysis/analyse";
import { GPXParser } from "./parser/generic";

const parser = new GPXParser();
const gpxString = readFileSync("./file.gpx", "utf-8");

const gpx = parser.parse(gpxString).gpx as Gpx;
const points = parser.normalizePoints(gpx.trk.trkseg.trkpt);

const analysis = analyze(points);

writeFileSync("./file.json", JSON.stringify(gpx, null, 2));

console.table(analysis.average);
console.table(analysis.extrema);
console.table(analysis.total);
