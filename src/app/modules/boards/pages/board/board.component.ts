import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { ToDo } from '@models/todo.model';
import { BoardService } from '@services/board.service';
import { ListService } from '@services/list.service';
import { CardService } from '@services/card.service';
import { List } from '@models/list.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListUI } from '@models/listUI.model';
import { forkJoin } from 'rxjs';

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
export class BoardComponent {
  constructor(
    private dialog: Dialog,
    private boardService: BoardService,
    private listService: ListService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  lists: ListUI[] = [];

  todos: ToDo[] = [
    {
      id: '1',
      title: 'Tarea 1',
    },
    {
      id: '2',
      title: 'Tarea 2',
    },
    {
      id: '3',
      title: 'Tarea 3',
    },
  ];
  doing: ToDo[] = [
    {
      id: '1',
      title: 'Tarea 1',
    },
  ];
  done: ToDo[] = [
    {
      id: '1',
      title: 'Tarea 1',
    },
    {
      id: '2',
      title: 'Tarea 2',
    },
  ];

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
    this.listService.addList('lista', 0, bid).subscribe({
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
        const listData = response.data;
        console.log(listData);

        const cardRequests = listData.map((item) =>
          this.cardService.getCardsFromList(item.lid)
        );

        forkJoin(cardRequests).subscribe({
          next: (cardResponses) => {
            this.lists = listData.map((item, index) => ({
              list: item,
              cards: cardResponses[index].data,
            }));
          },
          error: () => {},
        });
      },
      error: () => {},
    });
  }

  getCardsFromList(lid: string) {
    console.log(lid);
    return this.cardService.getCardsFromList(lid);
  }

  addCard(list: List) {
    this.cardService.addCard('Card', list.lid, 0, 'Description').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: () => {},
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
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
}
