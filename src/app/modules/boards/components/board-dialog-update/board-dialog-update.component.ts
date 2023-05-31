import { Component, Inject } from '@angular/core';
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
import { BoardService } from '@services/board.service';
import { BgType, Board } from '@models/board.model';

interface InputData {
  board: Board;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-board-dialog-update',
  templateUrl: './board-dialog-update.component.html',
})
export class BoardDialogUpdate {
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

  board: Board;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private boardService: BoardService,
    private location: Location,
    private route: ActivatedRoute,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.board = data.board;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  deleteCard() {

  }
}
