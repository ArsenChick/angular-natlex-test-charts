import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { Chart } from 'src/app/interfaces/chart-settings.interface';
import { addChart, deleteChart, editChart } from 'src/app/state/chart-manage.actions';
import { selectCharts } from 'src/app/state/chart-manage.selectrors';

import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  charts$ = this.store.select(selectCharts);

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  // When clicked the "Add" button on page.
  // TO DO: Maybe open up the edit dialog to choose initial settings?
  onAdd = (): void => this.store.dispatch(addChart({}));

  // When received 'delete' event from SettingsCard.
  // Open the delete dialog and dispatches action if got confirmation.
  onDelete(idToDelete: number): void {
    this.openDialog(DeleteDialogComponent).afterClosed()
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.store.dispatch(deleteChart({ idToDelete })));
  }

  // When received 'edit' event from SettingsCard.
  // Opens the edit dialog and dispatches action if has gotten settings from it.
  onEdit({ id, settings }: Chart): void {
    this.openDialog(EditDialogComponent, settings).afterClosed()
      .pipe(filter(settings => settings))
      .subscribe((newSettings) => this.store.dispatch(editChart({ idToEdit: id, newSettings })));
  }

  // The generic method for opening a dialog modal.
  // Takes the type of the component which will be shown as a parameter
  // (along with some additional data, if necessary).
  private openDialog<T, P>(dialogComponent: ComponentType<T>, dialogData?: P) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData ?? {};
    return this.dialog.open(dialogComponent, dialogConfig);
  }
}
