import { createReducer, on } from '@ngrx/store';
import { ChartTypes, DEFAULT_CHART_COLOR, INITIAL_STORE_STATE } from '../constants';
import { addChart, deleteChart, editChart } from './chart-manage.actions';

export const chartManageReducer = createReducer(
  INITIAL_STORE_STATE,
  // Add chart to store (settings are optional)
  on(addChart, (state, { settings }) => {
    const newId = state.length === 0 ? 0 : state[state.length - 1].id + 1;
    const newChartSettings = settings
      ? settings
      : {
          name: `My Chart ${newId + 1}`,
          type: ChartTypes.Line,
          color: DEFAULT_CHART_COLOR
        };
    return [...state, { id: newId, settings: newChartSettings }]
  }),
  // Delete chart with the specified id
  on(deleteChart, (state, { idToDelete }) => {
    return state.filter((chart) => chart.id !== idToDelete);
  }),
  // Edit specific chart with the provided settings
  on(editChart, (state, { idToEdit, newSettings }) => {
    return state.map((chart) => chart.id !== idToEdit
      ? chart
      : { ...chart, settings: newSettings });
  })
);
