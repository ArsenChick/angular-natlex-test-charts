import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ChartSettings } from 'src/app/interfaces/chart-settings.interface';
import { DEFAULT_CHART_SETTINGS } from 'src/app/constants';


@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  highchartsCompatibleOptions: Highcharts.Options = {};
  private _seriesValues: number[] = [];
  private _chartSettings: ChartSettings = DEFAULT_CHART_SETTINGS;

  @Input()
  get seriesValues(): number[] {
    return this._seriesValues;
  }
  set seriesValues(v: number[]) {
    this._seriesValues = v;
    this.updateHighchartsOptions();
  }

  @Input()
  get chartSettings(): ChartSettings {
    return this._chartSettings;
  }
  set chartSettings(v: ChartSettings) {
    this._chartSettings = v;
    this.updateHighchartsOptions();
  }

  constructor() {
    this.updateHighchartsOptions();
  }

  // Update Highcharts-compatible options based on private fields
  private updateHighchartsOptions() {
    const { name, type, color } = this._chartSettings;
    this.highchartsCompatibleOptions = {
      title: { text: name },
      xAxis: { title: { text: "Date" }, type: "datetime" },
      series: [{
        data: this._seriesValues,
        name: "Temperature",
        type: type, color: color }]
    };
  }
}
