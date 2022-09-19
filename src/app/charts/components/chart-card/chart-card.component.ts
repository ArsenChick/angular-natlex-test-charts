import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ChartSettings } from 'src/app/interfaces/chart-settings.interface';
import { DEFAULT_CHART_SETTINGS, DEFAULT_DATE_RANGE_LENGTH, TIMEZONE_HOURS_DIFFERENCE } from 'src/app/constants';


@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {
  public Highcharts: typeof Highcharts = Highcharts;
  public highchartsCompatibleOptions: Highcharts.Options = {};

  private _seriesValues: number[] = [];
  private _chartSettings: ChartSettings = DEFAULT_CHART_SETTINGS;
  private _chartAxisStartDate: Date =
    new Date(new Date().setDate(-DEFAULT_DATE_RANGE_LENGTH));

  get seriesValues(): number[] {
    return this._seriesValues;
  }
  @Input()
  set seriesValues(v: number[]) {
    this._seriesValues = v;
    this.updateHighchartsOptions();
  }

  get chartSettings(): ChartSettings {
    return this._chartSettings;
  }
  @Input()
  set chartSettings(v: ChartSettings) {
    this._chartSettings = v;
    this.updateHighchartsOptions();
  }

  get chartAxisStartDate(): Date {
    return this._chartAxisStartDate;
  }
  @Input()
  set chartAxisStartDate(v: Date) {
    this._chartAxisStartDate = v;
    this._chartAxisStartDate.setHours(TIMEZONE_HOURS_DIFFERENCE);
    this.updateHighchartsOptions();
  }

  ngOnInit() {
    this.updateHighchartsOptions();
  }

  // Update Highcharts-compatible options based on private fields
  private updateHighchartsOptions(): void {
    const { name, type, color } = this._chartSettings;
    this.highchartsCompatibleOptions = {
      title: { text: name },
      xAxis: {
        title: { text: 'Date' },
        type: 'datetime',
        labels: { format: '{value: %m/%d}' },
      },
      tooltip: {
        useHTML: true,
				headerFormat: '<div>{point.x: %m/%d/%Y}</div>',
        valueSuffix: '°C'
      },
      yAxis: {
        title: { text: 'Temperature'},
        labels: { format: '{value} °C' }
      },
      series: [{
        data: this._seriesValues,
        pointStart: this._chartAxisStartDate.valueOf(),
        pointIntervalUnit: 'day',
        name: 'Max temperature',
        type: type, color: color
      }]
    };
  }
}
