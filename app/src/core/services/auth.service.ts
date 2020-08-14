import { IUserToken } from '../models/IUserToken';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILoginResponse } from './responses/ILoginResponse';
import { ILogin } from 'src/modules/auth/models/ILogin';
import { IRegister } from 'src/modules/auth/models/IRegister';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { IAccessTokenDTO } from '../models/IAccessTokenDTO';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(loginRequest: ILogin): Observable<ILoginResponse> {
        return this.httpClient
            .post<IUserToken>(
                environment.api + '/Auth/Authenticate',
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
        return this.httpClient
            .post<IUserToken>(
                environment.api + '/Auth/Register',
                register,
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

    decodeToken(token: string): { currentProfil: string } {
        const decodedToken: IAccessTokenDTO = jwt_decode(token);
        return {
            currentProfil: decodedToken.currentProfil
                ? decodedToken.currentProfil
                : null,
        };
    }
}
