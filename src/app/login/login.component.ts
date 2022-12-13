import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent {
  isAuthenticataionFailed$: Observable<boolean>;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(private readonly authService: AuthService) {
    this.isAuthenticataionFailed$ =
      this.authService.invalidCredentialObservable$;
  }

  getEmailErrorMsg() {
    if (this.loginForm.controls.email.hasError('required'))
      return '내용을 입력해주세요.';
    if (this.loginForm.controls.email.hasError('email'))
      return '이메일 형식 오류.';
    return '';
  }
  getPasswordErrorMsg(): string {
    if (this.loginForm.controls.password.hasError('required'))
      return '내용을 입력해주세요.';
    if (this.loginForm.controls.password.hasError('minlength'))
      return '2자 이상 입력해주세요.';
    return '';
  }
  login() {
    this.authService.login({
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!,
    });
  }
}
