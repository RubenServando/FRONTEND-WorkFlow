
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent {
  form: FormGroup;
  showProfile: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getProfile() {
    // Add your registration logic here
    // Once registration is successful, toggle to view profile section
    this.showProfile = true;
    
  }

  editProfile() {
    // Toggle back to the registration section for editing profile
    this.showProfile = false;
  }
}
