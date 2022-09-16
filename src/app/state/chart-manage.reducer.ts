import { createReducer, on } from '@ngrx/store';
import { Chart, ChartSettings } from '../chart-settings.interface';
import { addChart, deleteChart, editChart } from './chart-manage.actions';

export const initialState: ReadonlyArray<Chart> = [
  { id: 0, settings: { name: 'My Chart 1', type: 'line', color: "#7cb5ec" }},
  { id: 1, settings: { name: 'My Chart 2', type: 'spline', color: "#7cb5ec" }},
  { id: 2, settings: { name: 'My Chart 3', type: 'area', color: "#7cb5ec" }},
];

export const chartManageReducer = createReducer(
  initialState,
  on(addChart, (state, { settings }) => {
    const newId = state.length === 0 ? 0 : state[state.length - 1].id + 1;
    const newChartSettings = settings
      ? settings
      : { name: `My Chart ${newId + 1}`, type: 'line', color: "#7cb5ec" } as ChartSettings;
    return [...state, { id: newId, settings: newChartSettings }]
  }),
  on(deleteChart, (state, { idToDelete }) => {
    return state.filter((chart) => chart.id !== idToDelete);
  }),
  on(editChart, (state, { idToEdit, newSettings }) => {
    return state.map((chart) => chart.id !== idToEdit
      ? chart
      : { ...chart, settings: newSettings });
  })
);
