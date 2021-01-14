import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {

    if (this.authService.getAccounts().length === 0) {
      this.authService.login();
    }

    return true;
    // return this.authService.handleRedirect()
    //   .pipe(
    //     concatMap(() => {
    //       if (!this.authService.getAccounts().length) {
    //         return this.authService.login();
    //       }
    //       return of(false);
    //     })
    //   );
  }
}
