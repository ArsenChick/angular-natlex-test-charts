import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './constants';

const routes: Routes = [
  { path: '', redirectTo: `/${APP_ROUTES.charts}`, pathMatch: 'full' },
  {
    path: APP_ROUTES.charts,
    loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: APP_ROUTES.settings,
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**', redirectTo: `/${APP_ROUTES.charts}`, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
