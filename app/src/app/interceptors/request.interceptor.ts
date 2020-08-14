import { IUserToken } from '@core/models/IUserToken';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { KoudouService } from 'src/state/koudou.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    token: IUserToken = null;
    private refreshing$ = new BehaviorSubject<boolean>(false);

    constructor(
        private koudouSercice: KoudouService,
        private authService: AuthService,
    ) {
        this.koudouSercice.token$.subscribe((t) => (this.token = t));
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(req.clone({ setHeaders: this.setHeaders() })).pipe(
            catchError((err) => {
                if (req.url.includes('login') || req.url.includes('refresh')) {
                    if (req.url.includes('refresh')) {
                        this.koudouSercice.logout();
                    }
                    throw err;
                }
                switch (err.status) {
                    case 401:
                        return this.handle401Error(req, next);
                    default:
                        return throwError(err);
                }
            }),
        );
    }

    private handle401Error(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (!this.refreshing$.getValue()) {
            this.refreshing$.next(true);
            this.authService
                .refresh(this.token?.refresh_token)
                .subscribe(() => this.refreshing$.next(false));
        }
        return this.refreshing$.pipe(
            filter((refreshing) => refreshing === false),
            take(1),
            switchMap(() =>
                this.token
                    ? next.handle(req.clone({ setHeaders: this.setHeaders() }))
                    : throwError(new Error('Not Authorized')),
            ),
        );
    }

    private setHeaders() {
        let headers: any = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
        };
        if (this.token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${this.token.access_token}`,
            };
        }
        return headers;
    }
}
