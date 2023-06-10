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
import { TodoDialogComponent } from '@boards/components/task-dialog/task-dialog.component';
import { ToDo } from '@models/todo.model';
import { BoardService } from '@services/board.service';
import { ListService } from '@services/list.service';
import { CardService } from '@services/card.service';
import { List } from '@models/list.model';
import { Card } from '@models/card.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListUI } from '@models/listUI.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDialogUpdateComponent } from '@boards/components/list-dialog-update/list-dialog-update.component';
import { AddMemberDialogComponent } from '@boards/components/add-member-dialog/add-member-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './activity-task.component.html',
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

  addList() {
    let urlSegments = this.route.snapshot.url;
    let bid = urlSegments[urlSegments.length - 1].path;
    let maxPosition = Math.max(...this.lists.map((l) => l.list.position), -1);

    this.listService.addList('Columna', maxPosition + 1, bid).subscribe({
      next: () => {
        this.getAllList();
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
          listData.sort((a, b) => a.position - b.position);
          const cardRequests = listData.map((item) =>
            this.cardService
              .getCardsFromList(item.lid)
              .pipe(catchError(() => of({ data: [] })))
          );
          forkJoin(cardRequests).subscribe({
            next: (cardResponses) => {
              this.lists = listData.map((item, index) => {
                let cards = cardResponses[index].data || [];
                cards.sort((a, b) => a.position - b.position);

                return {
                  list: item,
                  cards: cards,
                };
              });
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
    return this.cardService.getCardsFromList(lid);
  }

  addCard(list: List) {
    this.cardService.addCard('Tarea', list.lid, '').subscribe({
      next: () => {
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
    const dialogRef = this.dialog.open(ListDialogUpdateComponent, {
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

  openAddMemberDialog() {
    let urlSegments = this.route.snapshot.url;
    let bid = urlSegments[urlSegments.length - 1].path;
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        bid: bid,
      },
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  
      const movedCard: Card = event.container.data[event.currentIndex];
      const currentList: ListUI | undefined = this.lists.find(l => l.list.lid === movedCard.lid);
  
      if (!currentList) {
        return;
      }
  
      this.cardService.updateCardPosition(event.currentIndex, movedCard.lid, movedCard.cid).subscribe(() => {
        for (let i = event.currentIndex + 1; i < currentList.cards.length; i++) {
          this.cardService.updateCardPosition(i, currentList.cards[i].lid, currentList.cards[i].cid).subscribe(() => {});
        }
      });
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      
      const movedCard: Card = event.container.data[event.currentIndex];
      const newList: ListUI | undefined = this.lists.find(l => l.list.lid === movedCard.lid);
  
      if (!newList) {
        return;
      }
  
      this.cardService.updateCardPosition(event.currentIndex, newList.list.lid, movedCard.cid).subscribe(() => {
        for (let i = event.currentIndex + 1; i < newList.cards.length; i++) {
          this.cardService.updateCardPosition(i, newList.cards[i].lid, newList.cards[i].cid).subscribe(() => {});
        }
      });
  
      const oldList: ListUI | undefined = this.lists.find(l => l.list.lid === event.previousContainer.data[0].lid);
      if (oldList) {
        for (let i = event.previousIndex; i < oldList.cards.length; i++) {
          this.cardService.updateCardPosition(i, oldList.cards[i].lid, oldList.cards[i].cid).subscribe(() => {});
        }
      }
    }
  }
  
  
  
  
}
