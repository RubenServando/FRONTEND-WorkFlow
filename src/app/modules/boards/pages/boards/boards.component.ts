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
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

import { HttpClient } from '@angular/common/http';
import { BoardService } from '@services/board.service';
import { BgType, Board } from '@models/board.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
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

  constructor(private http: HttpClient, private boardService: BoardService) {}

  boards: Board[] = [];

  ngOnInit(): void {
    this.getAllBoard();
  }

  addBoard() {
    this.boardService.addBoard('tablero', BgType.Color, '#16803d').subscribe({
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
}
