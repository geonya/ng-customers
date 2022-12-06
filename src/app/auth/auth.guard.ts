import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authSercie: AuthService,
    private readonly router: Router,
  ) {}
  canActivate() {
    return this.authSercie.isAuthenticated().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
