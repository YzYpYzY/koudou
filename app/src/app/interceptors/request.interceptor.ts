import { IUserToken } from '@core/models/IUserToken';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KoudouService } from 'src/state/koudou.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    token: IUserToken = null;

    constructor(private koudouService: KoudouService) {
        this.koudouService.token$.subscribe(t => (this.token = t));
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let baseHeaders: any = {
            'Access-Control-Allow-Origin': '*',
        };
        if (this.token) {
            baseHeaders = {
                ...baseHeaders,
                Authorization: `Bearer ${this.token.access_token}`,
            };
        }
        req = req.clone({
            setHeaders: {
                ...baseHeaders,
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*',
            },
        });
        return next.handle(req);
    }
}
