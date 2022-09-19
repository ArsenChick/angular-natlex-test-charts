import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'src/app/interfaces/chart-settings.interface';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsCardComponent {

  @Input() chartInfo?: Chart;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<Chart>();

  public deleteChart(): void {
    if (this.chartInfo)
      this.deleteEvent.emit(this.chartInfo.id);
  }

  public editChart(): void {
    if (this.chartInfo)
      this.editEvent.emit(this.chartInfo);
  }
}
