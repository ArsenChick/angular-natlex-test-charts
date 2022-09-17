import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_ROUTES } from 'src/app/constants';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {

  routerLinkToCharts: string = `/${APP_ROUTES.charts}`;
  routerLinkToSettings: string = `/${APP_ROUTES.settings}`;

  constructor() {}

}
