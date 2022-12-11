import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { CreateUserInput, MeGQL, User } from '../../gql/generated-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly meGql: MeGQL,
  ) {}
  isAuthenticated() {
    return this.httpClient
      .get<boolean>('api/auth')
      .pipe(catchError(() => of(false)));
  }
  login(loginInput: CreateUserInput) {
    return this.httpClient.post('api/auth/login', loginInput);
  }
  logout() {
    this.httpClient.post('api/auth/logout', {}).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  me() {
    return this.meGql.watch().valueChanges;
  }
}
