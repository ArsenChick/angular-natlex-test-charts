import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    TopBarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LayoutModule,
    MatToolbarModule,
  ],
  providers: [],
})
export class SharedModule { }
