import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_ROUTES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  routerLinkToCharts: string = `/${APP_ROUTES.charts}`;
  routerLinkToSettings: string = `/${APP_ROUTES.settings}`;
}
