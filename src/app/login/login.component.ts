import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserInput } from '../../gql/generated-types';
import { AuthService } from '../auth/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  isAuthenticataionFailed: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  constructor(
    private router: Router,
    private readonly authService: AuthService,
  ) {}

  getEmailErrorMsg() {
    if (this.email.hasError('required')) return '내용을 입력해주세요.';
    if (this.email.hasError('email')) return '이메일 형식 오류.';
    return '';
  }
  getPasswordErrorMsg(): string {
    if (this.password.hasError('required')) return '내용을 입력해주세요.';
    if (this.password.hasError('minlength')) return '2자 이상 입력해주세요.';
    return '';
  }
  login() {
    this.authService
      .login({ email: this.email.value!, password: this.password.value! })
      .subscribe((response) => {
        if (!response) {
          this.isAuthenticataionFailed = true;
        }
        this.router.navigate(['/']);
      });
  }
}
