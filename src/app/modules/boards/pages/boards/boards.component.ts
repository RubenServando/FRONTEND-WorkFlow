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

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent {
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

  addBoard() {
    this.boardService.addBoard('tablero', BgType.Color, '#008000').subscribe({
      next: (response) => {
        this.boards.push(response);
      },
      error: () => {},
    });
  }
}
