import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StayInMainWhenLoggedGuard implements CanActivate {
  constructor(private _router:Router ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('accessToken'))
      {
        this._router.navigate(['main']);
        console.log(localStorage.getItem('accessToken'))
        return false;
      }
      return true;
  }
  
}
