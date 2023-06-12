import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { BackgroundComponent } from './components/background/background.component';
import { SharedModule } from '@shared/shared.module';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';


@NgModule({
  declarations: [ProfileComponent,
    ProfileFormComponent,
    BackgroundComponent,
    ProfileDialogComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
