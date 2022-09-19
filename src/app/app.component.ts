import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_ROUTES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public routerLinkToCharts: string = `/${APP_ROUTES.charts}`;
  public routerLinkToSettings: string = `/${APP_ROUTES.settings}`;
}
