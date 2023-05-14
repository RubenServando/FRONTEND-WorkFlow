import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    CdkTableModule
  ]
})
export class UsersModule { }
