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
import { Card } from '@models/card.model';
import { CardService } from '@services/card.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface InputData {
  card: Card;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
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
  updateCardForm: FormGroup = this.formBuilder.group({
    title: [''],
    description: [''],
  });

  card: Card;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private cardService: CardService,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.card = data.card;
    this.updateCardForm.patchValue({
      title: this.card.title,
      description: this.card.description,
    });
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  deleteCard() {
    this.cardService.deleteCard(this.card.cid).subscribe({
      next: () => {
        this.closeWithRta(true);
      },
      error: () => {},
    });
  }

  updateCard() {
    let title = this.updateCardForm.get('title')?.value || this.card.title;
    let description =
      this.updateCardForm.get('description')?.value || this.card.description;
    this.cardService.updateCard(title, description, this.card.cid).subscribe({
      next: (response) => {
        this.closeWithRta(true);
      },
      error: () => {},
    });
  }
}
