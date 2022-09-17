import { Chart, ChartSettings } from "../interfaces/chart-settings.interface";

export enum ChartTypes {
  Line = "line",
  Spline = "spline",
  Area = "area"
}

export const DEFAULT_CHART_COLOR: string = "#7cb5ec"

export const DEFAULT_CHART_SETTINGS: ChartSettings = {
  name: "My Chart",
  type: ChartTypes.Line,
  color: DEFAULT_CHART_COLOR
}

// Initial state object for store 'charts' feature
export const INITIAL_STORE_STATE: ReadonlyArray<Chart> = [
  { id: 0, settings: { name: 'My Chart 1', type: ChartTypes.Line, color: DEFAULT_CHART_COLOR }},
  { id: 1, settings: { name: 'My Chart 2', type: ChartTypes.Spline, color: DEFAULT_CHART_COLOR }},
  { id: 2, settings: { name: 'My Chart 3', type: ChartTypes.Area, color: DEFAULT_CHART_COLOR }},
];
