import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserInput } from '../../gql/generated-types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginInput: CreateUserInput) {
    return this.httpClient.post('api/auth/login', loginInput);
  }
}
