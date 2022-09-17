import { ChartTypes } from "../constants";

export interface Chart {
  id: number;
  settings: ChartSettings;
}

export interface ChartSettings {
  name: string,
  type: ChartTypes,
  color: string,
}
