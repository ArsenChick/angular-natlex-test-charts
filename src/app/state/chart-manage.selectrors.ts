import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Chart } from "../chart-settings.interface";

export const selectCharts = createFeatureSelector<ReadonlyArray<Chart>>('charts');
export const selectEveryChartSettings = createSelector(
  selectCharts,
  (charts) => charts.map(chart => chart.settings)
);
