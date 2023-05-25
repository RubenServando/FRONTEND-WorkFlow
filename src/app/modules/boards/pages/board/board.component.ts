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
import { List } from '@models/list.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private location: Location
  ) {}

  lists: List[] = [];

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
        this.lists.push(response.data);
      },
      error: () => {},
    });
  }

  getAllList() {
    this.listService.getAllList().subscribe({
      next: (response) => {
        this.lists = response.data;
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
