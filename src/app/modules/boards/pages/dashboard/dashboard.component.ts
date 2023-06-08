import { Component } from '@angular/core';
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleUp,
  faAngleDown,
  faHeart,
  faBorderAll,
  faUsers,
  faGear,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { BoardService } from '@services/board.service';
import { BgType, Board } from '@models/board.model';
import { OnInit } from '@angular/core';
import { BoardDialogUpdate } from '@boards/components/board-dialog-update/board-dialog-update.component';

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
})
export class BoardsComponent implements OnInit {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faPencil = faPencil;

  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private dialog: Dialog
  ) {}

  boards: Board[] = [];

  ngOnInit(): void {
    this.getAllBoard();
  }

  addBoard() {
    this.boardService.addBoard('Tablero', BgType.Color, '#9e91d9').subscribe({
      next: (response) => {
        this.boards.push(response.data);
      },
      error: () => {},
    });
  }

  getAllBoard() {
    this.boardService.getAllBoard().subscribe({
      next: (response) => {
        this.boards = response.data;
      },
      error: () => {},
    });
  }
  openDialogToUpdateBoard(board: Board) {
    const dialogRef = this.dialog.open(BoardDialogUpdate, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        board: board,
      },
    });
    dialogRef.closed.subscribe((output) => {
      this.getAllBoard();
    });
  }
  
}
