import { IUserToken } from '@core/models/IUserToken';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { KoudouService } from 'src/state/koudou.service';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
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
                console.log(
                    'Request in error : ' + err.url,
                    'Token : ' + this.token.access_token,
                );

                if (req.url.includes('RefreshToken')) {
                    this.koudouSercice.logout();
                    return throwError(err);
                }
                if (
                    req.url.includes('Authenticate') ||
                    req.url.includes('ChangePassword')
                ) {
                    return throwError(err);
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
        console.log(
            'Handle 401',
            'Refreshing value : ' + this.refreshing$.getValue(),
        );

        if (!this.refreshing$.getValue()) {
            this.refreshing$.next(true);
            this.authService
                .refresh(this.token?.refresh_token)
                .subscribe((res) => {
                    this.token = res.token;
                    console.log('New Token : ' + this.token.access_token);
                    this.koudouSercice.setNewToken(res.token);
                    this.refreshing$.next(false);
                });
        }
        return this.refreshing$.pipe(
            filter((refreshing) => refreshing === false),
            take(1),
            tap(() => {
                console.log('Replay request : ' + req.url);
            }),
            switchMap(() =>
                this.token
                    ? next.handle(req.clone({ setHeaders: this.setHeaders() }))
                    : throwError(
                          new HttpErrorResponse({
                              status: 401,
                              statusText: 'Not Authorized',
                          }),
                      ),
            ),
        );
    }

    private setHeaders() {
        let headers: any = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            'Access-Control-Allow-Methods':
                'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept, Authorization',
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
