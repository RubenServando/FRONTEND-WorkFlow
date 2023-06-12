
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@services/users.service';
import {User, UserResponse} from '@models/user.model';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {
  showProfile: boolean = false;
  user: User;

  constructor(private dialog: Dialog, private fb: FormBuilder, private usersService: UsersService) {
    this.user = {
      uid: '',
      username: '',
      email: '',
      photo: '',
    }
  };

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.usersService.getMeProfile().subscribe((userData: UserResponse<User>) => {
      this.user = userData.user;
      console.log(this.user)
    });  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      minWidth: '450px',
      maxWidth: '50%',
      data: {
        user: this.user,
      },
    });
    dialogRef.closed.subscribe(() => {
      this.getProfile();
    });  }
}
