import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
  faTrashCan,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { DialogRef, Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { ToDo } from '@models/todo.model';
import { BoardService } from '@services/board.service';
import { ListService } from '@services/list.service';
import { CardService } from '@services/card.service';
import { List } from '@models/list.model';
import { Card } from '@models/card.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListUI } from '@models/listUI.model';
import { forkJoin , of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDialogUpdate } from '@boards/components/list-dialog-update/list-dialog-update.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faTrashCan = faTrashCan;
  faPencil = faPencil;

  constructor(
    private dialog: Dialog,
    private boardService: BoardService,
    private listService: ListService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  lists: ListUI[] = [];
  
  ngOnInit(): void {
    this.getAllList();
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addList() {
    let urlSegments = this.route.snapshot.url;
    let bid = urlSegments[urlSegments.length - 1].path;
    this.listService.addList('Columna', 0, bid).subscribe({
      next: (response) => {
        this.lists.push({ list: response.data, cards: [] });
      },
      error: () => {},
    });
  }

  getAllList() {
    let urlSegments = this.route.snapshot.url;
    let bid = urlSegments[urlSegments.length - 1].path;
    this.listService.getAllList(bid).subscribe({
      next: (response) => {
        this.lists = [];
        try {
          const listData = response.data;
          console.log(listData);

          const cardRequests = listData.map((item) =>
            this.cardService
              .getCardsFromList(item.lid)
              .pipe(catchError(() => of({ data: [] })))
          );

          forkJoin(cardRequests).subscribe({
            next: (cardResponses) => {
              this.lists = listData.map((item, index) => ({
                list: item,
                cards: cardResponses[index].data || [],
              }));
            },
            error: () => {},
          });
        } catch (error) {
          this.lists = [];
        }
      },
      error: () => {},
    });
  }

  getCardsFromList(lid: string) {
    console.log(lid);
    return this.cardService.getCardsFromList(lid);
  }

  addCard(list: List) {
    this.cardService.addCard('Tarea', list.lid, 0, '').subscribe({
      next: (response) => {
        this.getAllList();
      },
      error: () => {},
    });
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      this.getAllList();
    });
  }
  deleteBoard() {
    let urlSegments = this.route.snapshot.url;
    let bid = urlSegments[urlSegments.length - 1].path;
    this.boardService.deleteBoard(bid).subscribe({
      next: () => {
        this.location.back();
      },
      error: () => {},
    });
  }

  deleteList(list: List) {
    this.listService.deleteList(list.lid).subscribe({
      next: () => {
        this.getAllList();
      },
      error: () => {},
    });
  }
  openDialogToUpdateList(list: List) {
    const dialogRef = this.dialog.open(ListDialogUpdate, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        list: list,
      },
    });
    dialogRef.closed.subscribe((output) => {
      this.getAllList();
    });
  }
}
