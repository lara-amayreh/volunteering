import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogedinGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let guardObsv = this.authService.userState$.pipe(
      map((value) => {
        if (!value) return true;
        else {
          if (value.role == 'company') this.router.navigate(['/']);
          if (value.role == 'person') this.router.navigate(['/']);
          return false;
        }
      })
    );
    return guardObsv;
  }
}
