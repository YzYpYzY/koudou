import { Injectable } from '@angular/core';
import { KoudouState, KoudouStateDefault } from './koudou.state';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { KoudouActions } from './koudou.actions';
import { AuthService } from '@core/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { ILoginResponse } from '@core/services/responses/ILoginResponse';
import { of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { OptionModel } from 'yzy-ng';
import { MiscService } from '../core/services/misc.service';
import { KoudouError } from '../core/models/KoudouError';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
@State<KoudouState>({
    name: 'koudou',
    defaults: KoudouStateDefault,
})
export class KoudouStore {
    @Selector()
    static isLogged$(state: KoudouState) {
        return state.isLogged;
    }
    @Selector()
    static user$(state: KoudouState) {
        return state.user;
    }
    @Selector()
    static token$(state: KoudouState) {
        return state.token;
    }

    @Selector()
    static error$(state: KoudouState) {
        return state.error;
    }
    @Selector()
    static isDarkMode$(state: KoudouState) {
        return state.isDarkMode;
    }
    @Selector()
    static sectionOptions$(state: KoudouState) {
        return state.sectionOptions;
    }
    @Selector()
    static loading$(state: KoudouState) {
        return state.loading;
    }
    constructor(
        private authService: AuthService,
        private miscService: MiscService,
    ) {}

    @Action(KoudouActions.Login)
    login(
        { patchState, dispatch }: StateContext<KoudouState>,
        { login }: KoudouActions.Login,
    ) {
        patchState({ loading: true });
        return this.authService.login(login).pipe(
            map((res: ILoginResponse) => {
                patchState({
                    isLogged: true,
                    user: res.user,
                    token: res.token,
                    loading: false,
                });
                return dispatch(new Navigate(['/']));
            }),
            catchError((error: HttpErrorResponse) => {
                let message = 'La connexion a échoué';
                switch (error.status) {
                    case 401:
                        message = "Ce couple d'identifiant n'existe pas.";
                        break;
                }
                patchState({
                    error: new KoudouError(message),
                    loading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(KoudouActions.Register)
    register(
        { patchState, dispatch }: StateContext<KoudouState>,
        { register }: KoudouActions.Register,
    ) {
        patchState({ loading: true });
        return this.authService.register(register).pipe(
            map((res: ILoginResponse) => {
                patchState({
                    isLogged: true,
                    user: res.user,
                    token: res.token,
                    loading: false,
                });
                return dispatch(new Navigate(['/']));
            }),
            catchError((error: Error) => {
                patchState({
                    error: new KoudouError("L'inscription a échoué."),
                    loading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(KoudouActions.Logout)
    logout({ patchState, dispatch, getState }: StateContext<KoudouState>) {
        patchState({ loading: true });
        return this.authService.logout(getState().token.refresh_token).pipe(
            map(() => {
                patchState({
                    isLogged: false,
                    user: null,
                    token: null,
                    loading: false,
                });
                return dispatch(new Navigate(['auth/login']));
            }),
            catchError((error: Error) => {
                patchState({
                    error: new KoudouError('La déconnexion a échoué.'),
                    loading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(KoudouActions.ToggleDarkMode)
    toggleDarkMode(ctx: StateContext<KoudouState>) {
        ctx.patchState({ isDarkMode: !ctx.getState().isDarkMode });
    }

    @Action(KoudouActions.LoadSectionOptions)
    loadSectionOptions({ patchState }: StateContext<KoudouState>) {
        patchState({
            sectionOptions: null,
        });
        return this.miscService.loadSectionOptions().pipe(
            map((res: OptionModel[]) => {
                patchState({
                    sectionOptions: res,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: new KoudouError(
                        'Le chargement des sections a échoué.',
                    ),
                });
                return of(error);
            }),
        );
    }
}
