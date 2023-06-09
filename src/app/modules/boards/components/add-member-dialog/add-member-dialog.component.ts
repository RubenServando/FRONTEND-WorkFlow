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
import { BoardService } from '@services/board.service';
import { UsersService } from '@services/users.service';
import { ActivatedRoute } from '@angular/router';

interface InputData {
  bid: string;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-list-dialog-update',
  templateUrl: './add-member-dialog.component.html',
})
export class AddMemberDialog {
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
    email: [''],
  });

  bid: string;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private boardService: BoardService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.bid = data.bid;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  addMember() {
    let email = this.updateListForm.get('email')?.value || '';
    this.usersService.getUserByEmail(email).subscribe({
      next: (response) => {
        let uid = response.data[0].uid;
        this.boardService.addMemberToBoard(uid, this.bid).subscribe({
          next: (response) => {
            this.close();
          },
          error: () => {},
        });
      },
      error: () => {},
    });
  }
}
