import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (this.authService.token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.token}`
                }
            });
        }

        return next.handle(request);
    }
}