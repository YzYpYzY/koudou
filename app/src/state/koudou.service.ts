import { IUserToken } from '../core/models/IUserToken';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { KoudouStore } from './koudou.store';
import { IUser } from '@core/models/IUser';
import { ILogin } from 'src/modules/auth/models/ILogin';
import { KoudouActions } from './koudou.actions';
import { Navigate } from '@ngxs/router-plugin';
import { OptionModel } from 'yzy-ng';
import { IRegister } from '../modules/auth/models/IRegister';

@Injectable({ providedIn: 'root' })
export class KoudouService {
    constructor(private store: Store) {}

    @Select(KoudouStore.isLogged$)
    isLogged$: Observable<boolean>;
    @Select(KoudouStore.user$)
    user$: Observable<IUser>;
    @Select(KoudouStore.token$)
    token$: Observable<IUserToken>;
    @Select(KoudouStore.currentProfil$)
    currentProfil$: Observable<string>;
    @Select(KoudouStore.error$)
    error$: Observable<string>;
    @Select(KoudouStore.isDarkMode$)
    isDarkMode$: Observable<boolean>;
    @Select(KoudouStore.sectionOptions$)
    sectionOptions$: Observable<OptionModel[]>;

    login(login: ILogin) {
        this.store.dispatch(new KoudouActions.Login(login));
    }
    register(register: IRegister) {
        this.store.dispatch(new KoudouActions.Register(register));
    }
    logout() {
        this.store.dispatch(new KoudouActions.Logout());
    }
    toggleDarkMode() {
        this.store.dispatch(new KoudouActions.ToggleDarkMode());
    }

    navigate(url: string[]) {
        this.store.dispatch(new Navigate(url));
    }

    loadSectionOptions() {
        this.store.dispatch(new KoudouActions.LoadSectionOptions());
    }
}
