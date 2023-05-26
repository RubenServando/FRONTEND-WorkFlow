
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@services/users.service';
import {User, UserResponse} from '@models/user.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {
  form: FormGroup;
  showProfile: boolean = false;
  user: User;


  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    this.user = {
      uid: '',
      username: '',
      email: '',
      photo: '',
    })
  };

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.usersService.getMeProfile().subscribe((userData: UserResponse<User>) => {
      this.user = userData.user;
      console.log(this.user)
    });  }



  editProfile() {
    this.showProfile = false;
  }
}
