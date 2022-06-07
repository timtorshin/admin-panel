import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, delay, EMPTY, Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.adminService.getUser(route.params?.['id']).pipe(
      delay(1000),
      catchError(() => {
        this.router.navigate(['admin/contacts']);
        return EMPTY;
      })
    );
  }
}
