import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-chart-datepicker',
  templateUrl: './chart-datepicker.component.html',
  styleUrls: ['./chart-datepicker.component.sass']
})
export class ChartDatepickerComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<{ start: Date, end: Date }>();

  dateRange: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  minDate: Date = new Date();

  filter = () => this.filterEvent.emit(this.dateRange.value);

  changeDate(controlName: string, { value }: MatDatepickerInputEvent<Date>) {
    this.dateRange.controls[controlName].setValue(
      value ? this.normalizeDate(value) : value
    );
  }

  private initializeDates() {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setHours(0, 0, 0, 0));
    this.minDate = new Date(this.maxDate);
    this.minDate.setDate(this.maxDate.getDate() - 40);

    const startDate = new Date(this.maxDate);
    startDate.setDate(this.maxDate.getDate() - 10);

    const start = new FormControl<Date | null>(startDate);
    const end = new FormControl<Date | null>(this.maxDate);
    this.dateRange = new FormGroup({ start, end });
  }

  private normalizeDate(date: Date) {
    if (date < this.minDate) return this.minDate;
    if (date > this.maxDate) return this.maxDate;
    return date;
  }

  constructor() { }

  ngOnInit(): void {
    this.initializeDates();
  }
}
