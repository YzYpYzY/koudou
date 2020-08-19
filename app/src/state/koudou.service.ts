import { KoudouError } from './../core/models/KoudouError';
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
import { IChangePassword } from '../modules/auth/models/IChangePassword';
import { ProfilState } from '../modules/auth/enum/ProfilState';

@Injectable({ providedIn: 'root' })
export class KoudouService {
    @Select(KoudouStore.isLogged$)
    isLogged$: Observable<boolean>;
    @Select(KoudouStore.user$)
    user$: Observable<IUser>;
    user: IUser;
    @Select(KoudouStore.token$)
    token$: Observable<IUserToken>;
    @Select(KoudouStore.error$)
    error$: Observable<KoudouError>;
    @Select(KoudouStore.isDarkMode$)
    isDarkMode$: Observable<boolean>;
    @Select(KoudouStore.sectionOptions$)
    sectionOptions$: Observable<OptionModel[]>;
    @Select(KoudouStore.loading$)
    loading$: Observable<boolean>;
    @Select(KoudouStore.profilState$)
    profilState$: Observable<ProfilState>;

    constructor(private store: Store) {
        this.user$.subscribe((user) => (this.user = user));
    }

    login(login: ILogin) {
        this.store.dispatch(new KoudouActions.Login(login));
    }
    register(register: IRegister) {
        this.store.dispatch(new KoudouActions.Register(register));
    }
    changePassword(changePassword: IChangePassword) {
        this.store.dispatch(new KoudouActions.ChangePassword(changePassword));
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
    setProfilState(newState: ProfilState) {
        this.store.dispatch(new KoudouActions.SetProfilState(newState));
    }
    checkAccess(claims: string[]): boolean {
        for (const claim in claims) {
            if (!this.user.claims.includes(claim)) {
                return false;
            }
        }
        return true;
    }
}
