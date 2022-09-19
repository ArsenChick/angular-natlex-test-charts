import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DEFAULT_DATE_RANGE_LENGTH, MAX_DATE_RANGE_LENGTH } from 'src/app/constants';
import { DateRangePickerValue } from '../../interfaces/date-picker-value.interface';

@Component({
  selector: 'app-chart-datepicker',
  templateUrl: './chart-datepicker.component.html',
  styleUrls: ['./chart-datepicker.component.sass']
})
export class ChartDatepickerComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<DateRangePickerValue>();

  public dateRange: FormGroup = new FormGroup({});
  public maxDate: Date = new Date();
  public minDate: Date = new Date();
  private prevStartDate: Date = new Date();
  private prevEndDate: Date = new Date();

  // To make less requests to WeatherAPI I decided to add a button.
  // Also, indicating whether the values differ so that a new request could be made
  public filter(): void {
    if (this.canFilterDates()) {
      const newStartDate = this.dateRange.value.start ?? this.minDate;
      const newEndDate = this.dateRange.value.end ?? this.maxDate;
      this.prevStartDate = newStartDate;
      this.prevEndDate = newEndDate;
      this.filterEvent.emit({ start: newStartDate, end: newEndDate });
    }
  }

  public canFilterDates = (): boolean =>
    !this.checkDatesEquality(
      this.prevStartDate,
      this.dateRange.value.start ?? this.minDate)
    || !this.checkDatesEquality(
      this.prevEndDate,
      this.dateRange.value.end ?? this.maxDate);

  private checkDatesEquality = (date1: Date, date2: Date): boolean =>
    date1.getDate() === date2.getDate();

  private initializeDates(): void {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setHours(0, 0, 0, 0));
    this.minDate = new Date(currentDate);
    this.minDate.setDate(currentDate.getDate() - MAX_DATE_RANGE_LENGTH);

    const startDate = new Date(currentDate);
    startDate.setDate(this.maxDate.getDate() - DEFAULT_DATE_RANGE_LENGTH);

    const start = new FormControl<Date | null>({ value: startDate, disabled: true });
    const end = new FormControl<Date | null>({ value: currentDate, disabled: true });
    this.dateRange = new FormGroup({ start, end });

    this.prevStartDate = startDate;
    this.prevEndDate = currentDate;
  }

  ngOnInit(): void {
    this.initializeDates();
    this.filterEvent.emit(this.dateRange.value);
  }
}
