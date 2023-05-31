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
  updateBoardForm: FormGroup = this.formBuilder.group({
    title: [''],
    background: [''],
  });

  board: Board;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    private boardService: BoardService,
    private formBuilder: FormBuilder,
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

  updateBoard() {
    let title = this.updateBoardForm.get('title')?.value || this.board.title;
    let background =
      this.updateBoardForm.get('background')?.value || this.board.background;
    this.boardService
      .updateBoard(title, BgType.Color, background, this.board.bid)
      .subscribe({
        next: (response) => {
          this.closeWithRta(true);          
        },
        error: () => {},
      });
  }
}
