import { IUserToken } from '../models/IUserToken';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginResponse } from './responses/ILoginResponse';
import { ILogin } from 'src/modules/auth/models/ILogin';
import { IRegister } from 'src/modules/auth/models/IRegister';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { IAccessTokenDTO } from '../models/IAccessTokenDTO';
import { IUser } from '../models/IUser';

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
                    user: this.decodeToken(res.access_token),
                    token: res,
                })),
            );
    }

    refresh(refreshToken: string) {
        return this.httpClient
            .post<IUserToken>(environment.api + '/Auth/RefreshToken', {
                refreshToken,
            })
            .pipe(
                map((res) => ({
                    user: this.decodeToken(res.access_token),
                    token: res,
                })),
            );
    }

    logout(refreshToken: string): Observable<boolean> {
        return this.httpClient
            .post(environment.api + '/Auth/RevokeToken', { refreshToken })
            .pipe(map(() => true));
    }

    register(register: IRegister): Observable<ILoginResponse> {
        return this.httpClient
            .post<IUserToken>(environment.api + '/Auth/Register', register)
            .pipe(
                map((res) => ({
                    user: this.decodeToken(res.access_token),
                    token: res,
                })),
            );
    }

    decodeToken(token: string): IUser {
        const decodedToken: IAccessTokenDTO = jwt_decode(token);
        const infos = {
            profil: decodedToken.currentProfil,
            claims: decodedToken.ressourcesAccess,
            pseudo: decodedToken.pseudo,
            email: decodedToken.email,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            pseudo: decodedToken.pseudo,
        };
        return infos;
    }
}
