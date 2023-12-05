import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './authentication/auth-services/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthServiceService) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let modifiedRequest = null;
        let token: any = localStorage.getItem('token');
        if (token) token = JSON.parse(token);
        if (token && token.accessToken) {
            let seconds = JSON.stringify(new Date().getTime());
            seconds = seconds.slice(0, 10)
            let tokenInfo: any = jwtDecode(JSON.stringify(token));
            //if the token is expired, we call the refrechToken service
            if (tokenInfo.exp < seconds) {
                this.authService.refreshToken().subscribe({
                    next: (newToken: any) => {
                        localStorage.setItem('token', JSON.stringify(newToken));
                        modifiedRequest = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken.accessToken}`,
                            }
                        })
                    },
                    error: (e) => {
                        console.log("error in interceptor refrech token")
                    }
                })
            } else {
                //we add a header to all requests that go from the client
                //the header contains the access token if its not expired
                modifiedRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
            }
        }
        if (modifiedRequest) { return next.handle(modifiedRequest) }
        return next.handle(request)
    }
}








// if (tokenInfo.exp < seconds) {
//     this.authService.refreshToken().subscribe({
//         next: (e: any) => {
//             localStorage.setItem("token", JSON.stringify(e));
//             const modifiedRequest = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${e.accessToken}`,
//                 },
//             })
//             return next.handle(modifiedRequest);
//         }
//         , error: (e) => {
//             console.error('Token refresh failed:', e);
//         }
//     })
// }
// else {
//     const modifiedRequest = request.clone({
//         setHeaders: {
//             Authorization: `Bearer ${token.accessToken}`,
//         },
//     });
//     return next.handle(modifiedRequest);
// }

