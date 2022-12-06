import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {}
  isAuthenticated() {
    return this.httpClient
      .get<boolean>('api/auth')
      .pipe(catchError(() => of(false)));
  }
  logout() {
    this.httpClient.post('api/auth/logout', {}).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
