import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { ChartDataService } from '../../chart-data.service';
import { selectEveryChartSettings } from 'src/app/state/chart-manage.selectrors';
import { DateRangePickerValue } from '../../interfaces/date-picker-value.interface';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent implements OnInit {

  public chartsSettings$ = this.store.select(selectEveryChartSettings);
  public seriesData$ = new Observable<number[]>();
  public chartAxisStartDate = new Date();

  private filterSubject$ = new Subject<DateRangePickerValue>();

  private getFormattedDataString = (date: Date): string => {
    const formattedMonth = date.getMonth().toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
  }

  public updateDateRange(dateRangeValue: DateRangePickerValue): void {
    this.chartAxisStartDate = dateRangeValue.start;
    this.filterSubject$.next(dateRangeValue);
  }

  constructor(
    private store: Store,
    private chartDataService: ChartDataService
  ) { }

  ngOnInit() {
    this.seriesData$ = this.filterSubject$.asObservable().pipe(
      map(({ start, end }) => {
        return {
          start: this.getFormattedDataString(start),
          end: this.getFormattedDataString(end),
        };
      }),
      switchMap(({ start, end }) => this.chartDataService.getWeatherData(start, end)),
      map(({ daily }) => daily.temperature_2m_max ),
      startWith([]),
    );
  }
}
