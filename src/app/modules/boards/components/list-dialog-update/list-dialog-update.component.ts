import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  faClose,
  faCheckToSlot,
  faBars,
  faUser,
  faTag,
  faCheckSquare,
  faClock,
  faTrashCan,
  faEnvelopeOpenText,
  faBookOpen,
  faEdit,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { ListService } from '@services/list.service';
import { List } from '@models/list.model';
import { ActivatedRoute } from '@angular/router';

interface InputData {
  list: List;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-list-dialog-update',
  templateUrl: './list-dialog-update.component.html',
})
export class ListDialogUpdateComponent {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faTrashCan = faTrashCan;
  faEnvelopeOpenText = faEnvelopeOpenText;
  faBookOpen = faBookOpen;
  faEdit = faEdit;
  faPencil = faPencil;
  updateListForm: FormGroup = this.formBuilder.group({
    title: [''],
  });

  list: List;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private listService: ListService,
    private formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.list = data.list;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  updateList() {
    let title = this.updateListForm.get('title')?.value || this.list.title;
    this.listService.updateList(title, this.list.lid).subscribe({
      next: (response) => {
        this.closeWithRta(true);
      },
      error: () => {},
    });
  }
}
