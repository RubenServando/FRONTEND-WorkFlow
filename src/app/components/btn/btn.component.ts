import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent implements OnInit {

  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  @Input() color = 'primary';
=======
>>>>>>> 43d26d22d3ad95a4f2e19b13ad3c56a59f3d21d5
>>>>>>> Stashed changes

  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  get colors() {
    return {
      'bg-success-700': this.color === 'success',
      'hover:bg-success-800': this.color === 'success',
      'focus:ring-success-300': this.color === 'success',
      'bg-primary-700': this.color === 'primary',
      'hover:bg-primary-800': this.color === 'primary',
      'focus:ring-primary-300': this.color === 'primary',
      'bg-red-700': this.color === 'red',
      'hover:bg-red-800': this.color === 'red',
      'focus:ring-red-300': this.color === 'red',
    };
  }

=======
>>>>>>> 43d26d22d3ad95a4f2e19b13ad3c56a59f3d21d5
>>>>>>> Stashed changes
}
