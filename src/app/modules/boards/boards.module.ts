import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@shared/shared.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './pages/dashboard/dashboard.component';
import { BoardComponent } from './pages/activity-task/activity-task.component';
import { TodoDialogComponent } from './components/task-dialog/task-dialog.component';
import { BoardDialogUpdate } from './components/board-dialog-update/board-dialog-update.component';
import { ListDialogUpdate } from './components/list-dialog-update/list-dialog-update.component';
import { AddMemberDialog } from './components/add-member-dialog/add-member-dialog.component';
import { DialogoErrorComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    TodoDialogComponent,
    BoardDialogUpdate,
    ListDialogUpdate,
    AddMemberDialog,
    DialogoErrorComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    DragDropModule,
    CdkAccordionModule,
    DialogModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BoardsModule {}
