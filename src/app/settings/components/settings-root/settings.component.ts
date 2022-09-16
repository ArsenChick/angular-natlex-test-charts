import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Chart } from 'src/app/chart-settings.interface';
import { addChart, deleteChart, editChart } from 'src/app/state/chart-manage.actions';
import { selectCharts } from 'src/app/state/chart-manage.selectrors';

import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {

  charts$ = this.store.select(selectCharts);

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  onAdd() {
    this.store.dispatch(addChart({}));
  }

  onDelete(idToDelete: number): void {
    const dialogRef = this.openDialog(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed)
          this.store.dispatch(deleteChart({ idToDelete }));
      }
    );
  }

  onEdit(chartDataToEdit: Chart): void {
    const dialogRef = this.openDialog(EditDialogComponent, chartDataToEdit.settings);
    dialogRef.afterClosed().subscribe(
      settings => {
        if (settings)
          this.store.dispatch(editChart({
            idToEdit: chartDataToEdit.id,
            newSettings: settings
          }));
      }
    );
  }

  openDialog<T>(dialogComponent: ComponentType<T>, dialogData?: any) {
    const dialogConfig = new MatDialogConfig();
    if (dialogData) dialogConfig.data = dialogData;
    return this.dialog.open(dialogComponent, dialogConfig);
  }
}
