import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { UsersService } from '@services/users.service';

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
import { User } from '@models/user.model';

interface InputData {
  user: User;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
})
export class ProfileDialogComponent {
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
  updateUserForm: FormGroup = this.formBuilder.group({
    email: [''],
  });

  user: User;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.user = data.user;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  updateProfile() {
    const email = this.updateUserForm.get('email')?.value;
  
    this.usersService.changeEmail(email).subscribe({
      next: () => {
        this.closeWithRta(true)
      },
      error: () => {
        this.closeWithRta(true)
      },
    });
  }

}