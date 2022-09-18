import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, of, Observable, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { ChartDataService } from '../../chart-data.service';
import { selectEveryChartSettings } from 'src/app/state/chart-manage.selectrors';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent implements OnInit {

  testObservable$: Observable<any> = of([]);

  seriesData$: Observable<number[]> =
    this.chartDataService.getWeatherData("2022-09-01", "2022-09-14")
      .pipe(
        map(({ daily }) => daily.temperature_2m_max ),
        startWith([])
      );
  mockSeriesData$ = of([1, 2, 3, 1, 2]);
  chartsSettings$ = this.store.select(selectEveryChartSettings);

  logChange = ({start, end}: any) => console.log(`${start.toDateString()} ${end.toDateString()}`);

  constructor(
    private store: Store,
    private chartDataService: ChartDataService
  ) {
    // const dateStartInput$ = start.valueChanges
    //   .pipe(filter(change => change !== null), startWith(startDate));
    // const dateEndInput$ = end.valueChanges
    //   .pipe(filter(change => change !== null), startWith(this.maxDate));

    // this.testObservable$ = combineLatest([dateStartInput$, dateEndInput$]).pipe(
    //   map(([sD, eD]) => [sD?.toDateString(), eD?.toDateString()])
    // );
  }

  ngOnInit() {
    this.testObservable$.subscribe(
      value => console.log(`change detected! value is ${value}`)
    )
  }
}
