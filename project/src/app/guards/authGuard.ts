import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        if (localStorage.getItem("token")) {
            let token: any = jwtDecode(JSON.stringify(localStorage.getItem("token")))
            if (token.role == expectedRole) {
                return true;
            } else {
                this.router.navigate(['/authentication']);
                return false;
            }
        } else {
            this.router.navigate(['/authentication']);
            return false;
        }
    }
}