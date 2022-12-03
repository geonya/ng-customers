import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  constructor() {}

  getUsernameErrorMsg() {
    if (this.username.hasError('required')) return '내용을 입력해주세요.';
    if (this.username.hasError('minlength')) return '2자 이상 입력해주세요.';
    return '';
  }
  getPasswordErrorMsg() {
    if (this.password.hasError('required')) return '내용을 입력해주세요.';
    if (this.password.hasError('minlength')) return '2자 이상 입력해주세요.';

    return '';
  }
}
