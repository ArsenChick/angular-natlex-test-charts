import { CHART_TYPE_LITERALS } from "./constants";

export interface Chart {
  id: number;
  settings: ChartSettings;
}

export interface ChartSettings {
  name: string,
  type: typeof CHART_TYPE_LITERALS[number],
  color: string,
}
