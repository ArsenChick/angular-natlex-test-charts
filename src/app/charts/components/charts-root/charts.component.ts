import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, pipe, of, combineLatest, Observable, startWith, fromEvent, filter } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Highcharts from 'highcharts';

import { ChartDataService } from '../../chart-data.service';
import { selectEveryChartSettings } from 'src/app/state/chart-manage.selectrors';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  dateRange: FormGroup;
  maxDate: Date;
  minDate: Date;

  testObservable$: Observable<any> = of([]);

  seriesData$: Observable<number[]> =
    this.chartDataService.getWeatherData("2022-09-01", "2022-09-14")
      .pipe(
        map(({ daily }) => daily.temperature_2m_max ),
        startWith([])
      );
  mockSeriesData$ = of([1, 2, 3, 1, 2]);
  chartsSettings$ = this.store.select(selectEveryChartSettings);

  logChange = () => console.log('date changed');

  constructor(
    private store: Store,
    private chartDataService: ChartDataService
  ) {
    this.maxDate = new Date();
    this.minDate = new Date(this.maxDate);
    this.minDate.setDate(this.maxDate.getDate() - 40);

    const startDate = new Date(this.maxDate);
    startDate.setDate(this.maxDate.getDate() - 10);

    const start = new FormControl<Date | null>(startDate);
    const end = new FormControl<Date | null>(this.maxDate);
    this.dateRange = new FormGroup({ start, end });

    const dateStartInput$ = start.valueChanges
      .pipe(filter(change => change !== null), startWith(startDate));
    const dateEndInput$ = end.valueChanges
      .pipe(filter(change => change !== null), startWith(this.maxDate));

    this.testObservable$ = combineLatest([dateStartInput$, dateEndInput$]).pipe(
      map(([sD, eD]) => [sD?.toDateString(), eD?.toDateString()])
    );
  }

  ngOnInit() {
    this.testObservable$.subscribe(
      value => console.log(`change detected! value is ${value}`)
    )
  }
}
