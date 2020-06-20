import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from "../app.reducer";
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate,CanLoad{
    constructor(private authService:AuthServiceService,private router:Router,private store:Store){}
    canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1)) //as observable return many slices of data
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1))
    }

}