import { IUserToken } from '../models/IUserToken';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ILoginResponse } from './responses/ILoginResponse';
import { ILogin } from 'src/modules/auth/models/ILogin';
import { IRegister } from 'src/modules/auth/models/IRegister';
import { delay, mergeMap, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

const response = {
    user: { firstname: 'Jonh', lastname: 'Doe', email: 'john@doe.com' },
    token: {
        access_token: 'awesomeToken',
        refresh_token: '',
        scope: '',
        token_type: '',
        expires_in: 1,
        expiration: '',
    },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(loginRequest: ILogin): Observable<ILoginResponse> {
        return of({
            user: null,
            token: {
                access_token: null,
                refresh_token: null,
                scope: null,
                token_type: null,
                expires_in: 2,
                expiration: null,
            },
            currentProfil: null,
        });
        return this.httpClient
            .post<IUserToken>(
                environment.api + '/Authentication/Authenticate',
                loginRequest,
            )
            .pipe(
                map((res) => ({
                    user: null,
                    token: res,
                    currentProfil: this.decodeToken(res.access_token)
                        .currentProfil,
                })),
            );
    }
    logout(): Observable<boolean> {
        return of(true).pipe(delay(1000));
    }

    register(register: IRegister): Observable<ILoginResponse> {
        return of({
            user: null,
            token: {
                access_token: null,
                refresh_token: null,
                scope: null,
                token_type: null,
                expires_in: 2,
                expiration: null,
            },
            currentProfil: null,
        });
    }

    decodeToken(token: string): { currentProfil: string } {
        const decodedToken = jwt_decode(token);
        return {
            currentProfil: decodedToken.currentProfil
                ? decodedToken.currentProfil
                : null,
        };
    }
}
