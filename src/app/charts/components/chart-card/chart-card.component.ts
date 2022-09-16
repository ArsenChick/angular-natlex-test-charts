import { Component, Input, SimpleChanges } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ChartSettings } from 'src/app/chart-settings.interface';


@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.sass']
})
export class ChartCardComponent {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() seriesValues: number[] = [];
  @Input() chartOptions: ChartSettings = { name: 'My Chart', type: 'line', color: "#7cb5ec" };

  hcInitialChartOptions: Highcharts.Options = {};

  constructor() { }

  ngOnChanges(_: SimpleChanges) {
    const { name, type, color } = this.chartOptions;
    this.hcInitialChartOptions = {
      title: { text: name },
      xAxis: { title: { text: "Date" }, type: "datetime" },
      series: [{
        data: this.seriesValues,
        name: "Temperature",
        type: type, color: color }]
    };
  }

}
