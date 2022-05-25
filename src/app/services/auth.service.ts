import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: { email: string, password: string }): Observable<string | boolean> {
    if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin1234') {
      this.setToken('rdm18e78n9brv8t98sub');
      return of(true);
    }
    return throwError(() => new Error('Something went wrong, please try again!'));
  }

  logout() {
    this.router.navigate(['login']);
  }
}
