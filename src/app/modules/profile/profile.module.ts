import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { BackgroundComponent } from './components/background/background.component';


@NgModule({
  declarations: [ProfileComponent,
    ProfileFormComponent,
    BackgroundComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
