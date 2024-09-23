import { Point } from "./point";

export interface Gpx {
  metadata: Metadata;
  trk: Trk;
  creator: string;
  version: string;
  "xsi:schemaLocation": string;
  "xmlns:ns3": string;
  xmlns: string;
  "xmlns:xsi": string;
  "xmlns:ns2": string;
}

export interface Metadata {
  link: Link;
  time: string;
}

export interface Link {
  text: string;
  href: string;
}

export interface Trk {
  name: string;
  type: string;
  trkseg: Trkseg;
}

export interface Trkseg {
  trkpt: Trkpt[];
}

export interface Trkpt {
  ele: number;
  time: Date;
  extensions: Extensions;
  lat: number;
  lon: number;
}

export interface Extensions {
  "ns3:TrackPointExtension": Ns3TrackPointExtension;
}

export interface Ns3TrackPointExtension {
  "ns3:hr": number;
  "ns3:cad": number;
}
