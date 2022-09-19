import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) _: any
  ) { }

  public onDelete = (): void => this.dialogRef.close(true);
  public onCancel = (): void => this.dialogRef.close();
}
