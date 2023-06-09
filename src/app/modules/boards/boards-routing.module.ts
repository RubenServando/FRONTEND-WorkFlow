import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardsComponent } from './pages/dashboard/dashboard.component';
import { BoardComponent } from './pages/activity-task/activity-task.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
