import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ChartSettings } from 'src/app/chart-settings.interface';
import { CHART_TYPES } from 'src/app/constants';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent {

  chartTypes = CHART_TYPES;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { name, type, color }: ChartSettings
  ) {
    this.form = fb.group({
      name: [name, Validators.required],
      type, color
    });
  }

  onSave = () => this.dialogRef.close(this.form.value);
  onCancel = () => this.dialogRef.close();
}
