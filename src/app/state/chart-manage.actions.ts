import { createAction, props } from "@ngrx/store";
import { ChartSettings } from "../chart-settings.interface";

export const addChart = createAction(
  '[Settings page] Add chart',
  props<{ settings?: ChartSettings }>()
);

export const deleteChart = createAction(
  '[Settings page] Delete chart',
  props<{ idToDelete: number }>()
);

export const editChart = createAction(
  '[Settings page] Edit chart',
  props<{ idToEdit: number, newSettings: ChartSettings }>()
)
