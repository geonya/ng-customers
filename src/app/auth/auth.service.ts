import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';
import { CreateUserInput, MeGQL, User } from '../../gql/generated-types';

@Injectable()
export class AuthService {
  private isAuthenticatedFailedSubject: Subject<boolean>;
  invalidCredentialObservable$: Observable<boolean>;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly meGql: MeGQL,
  ) {
    this.isAuthenticatedFailedSubject = new Subject<boolean>();
    this.invalidCredentialObservable$ =
      this.isAuthenticatedFailedSubject.asObservable();
  }
  isAuthenticated() {
    return this.httpClient
      .get<boolean>('api/auth')
      .pipe(catchError(() => of(false)));
  }
  login(loginInput: CreateUserInput) {
    this.httpClient.post('api/auth/login', loginInput).subscribe({
      next: (res) => {
        if (!res) {
          this.isAuthenticatedFailedSubject.next(true);
        }
        this.me().subscribe((response) => {
          if (response.data.me) {
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        this.isAuthenticatedFailedSubject.next(true);
      },
    });
  }
  logout() {
    this.httpClient.post('api/auth/logout', {}).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
  me() {
    return this.meGql.watch().valueChanges;
  }
}
