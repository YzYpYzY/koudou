import { KoudouService } from './koudou.service';
import { Injectable } from '@angular/core';
import { KoudouState, KoudouStateDefault } from './koudou.state';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { KoudouActions, Register } from './koudou.actions';
import { AuthService } from '@core/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { ILoginResponse } from '@core/services/responses/ILoginResponse';
import { of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { OptionModel } from 'yzy-ng';
import { MiscService } from '../core/services/misc.service';

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
    static currentProfil$(state: KoudouState) {
        return state.currentProfil;
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
    constructor(
        private authService: AuthService,
        private miscService: MiscService,
    ) {}

    @Action(KoudouActions.Login)
    login(
        { patchState, dispatch }: StateContext<KoudouState>,
        { login }: KoudouActions.Login,
    ) {
        return this.authService.login(login).pipe(
            map((res: ILoginResponse) => {
                patchState({
                    isLogged: true,
                    user: res.user,
                    token: res.token,
                    currentProfil: res.currentProfil,
                });
                return dispatch(new Navigate(['/']));
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
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
        return this.authService.register(register).pipe(
            map((res: ILoginResponse) => {
                patchState({
                    isLogged: true,
                    user: res.user,
                    token: res.token,
                    currentProfil: res.currentProfil,
                });
                return dispatch(new Navigate(['/']));
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                });
                return of(error);
            }),
        );
    }
    @Action(KoudouActions.Logout)
    logout({ patchState, dispatch }: StateContext<KoudouState>) {
        return this.authService.logout().pipe(
            map((res: boolean) => {
                patchState({
                    isLogged: false,
                    user: null,
                    token: null,
                    currentProfil: null,
                });
                return dispatch(new Navigate(['auth/login']));
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
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
                    error: error.message,
                });
                return of(error);
            }),
        );
    }
}
