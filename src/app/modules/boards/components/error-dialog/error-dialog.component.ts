import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { faClose, faFrog } from '@fortawesome/free-solid-svg-icons';

interface OutputData {
    rta: boolean;
  }

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class DialogoErrorComponent {
  faClose = faClose;
  faFrog = faFrog;

  constructor(
    private dialog: Dialog,
    private dialogRef: DialogRef<OutputData>
  ) {}

  close() {
    this.dialogRef.close();
  }

  showError() {
    this.dialog.openDialogs;
  }
}
